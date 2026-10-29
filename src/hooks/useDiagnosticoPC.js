import { useState, useCallback, useRef } from "react"
import { BASE_CONOCIMIENTO } from "../data/baseConocimiento"
import { SINTOMAS, extraerSintomas } from "../utils/extraerSintoma"
import { contieneLenguajeProhibido } from "../utils/contienePalabrasProhibidas"

// Los síntomas se interpolan en la consulta Prolog, así que solo se aceptan ids conocidos
const SINTOMAS_VALIDOS = new Set(SINTOMAS.map(({ id }) => id))

// La base de conocimiento se carga una sola vez y la sesión se reutiliza.
let sesionPromesa = null

const obtenerSesion = () => {
  if (!sesionPromesa) {
    // Tau Prolog es pesado: se descarga solo cuando se hace la primera búsqueda
    sesionPromesa = import("../utils/tauProlog").then(
      ({ default: pl }) =>
        new Promise((resolve, reject) => {
          const session = pl.create()
          session.consult(BASE_CONOCIMIENTO, {
            success: () => resolve(session),
            error: (err) => reject(err),
          })
        }),
    )
    // Si falla, se permite reintentar en la siguiente búsqueda
    sesionPromesa.catch(() => {
      sesionPromesa = null
    })
  }
  return sesionPromesa
}

// Una sesión de Tau Prolog solo atiende una consulta a la vez,
// así que las consultas se encolan.
let cola = Promise.resolve()

const consultarCoincidencias = (session, sintomas) => {
  const consulta = () =>
    new Promise((resolve, reject) => {
      const query = `diagnostico_mayoria(Componente, [${sintomas.join(", ")}], Coincidencias, Coincidentes, Puntaje).`

      session.query(query, {
        success: () => {
          const resultados = []

          const recolectar = () => {
            session.answer({
              success: (answer) => {
                resultados.push({
                  componente: answer.lookup("Componente").id,
                  coincidencias: answer.lookup("Coincidencias").value,
                  puntaje: answer.lookup("Puntaje").value,
                  sintomasCoincidentes: answer
                    .lookup("Coincidentes")
                    .toJavaScript(),
                })
                recolectar()
              },
              fail: () => resolve(resultados),
              error: reject,
              limit: () => reject(new Error("Límite de inferencia alcanzado")),
            })
          }

          recolectar()
        },
        error: reject,
      })
    })

  const resultado = cola.then(consulta)
  cola = resultado.catch(() => {})
  return resultado
}

export function useDiagnosticoPC() {
  const [diagnosticos, setDiagnosticos] = useState([])
  const [sintomasDetectados, setSintomasDetectados] = useState([])
  const [error, setError] = useState(null)
  const [lenguajeProhibido, setLenguajeProhibido] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  // Permite descartar respuestas de búsquedas que ya no están vigentes
  const busquedaActual = useRef(0)

  const limpiarDiagnosticos = useCallback(() => {
    busquedaActual.current++
    setDiagnosticos([])
    setSintomasDetectados([])
    setError(null)
    setLenguajeProhibido(false)
    setIsLoading(false)
    setHasSearched(false)
  }, [])

  const analizarSintoma = useCallback(
    async (texto, sintomasElegidos = []) => {
      if (
        typeof texto !== "string" ||
        (!texto.trim() && sintomasElegidos.length === 0)
      ) {
        limpiarDiagnosticos()
        return
      }

      if (contieneLenguajeProhibido(texto)) {
        limpiarDiagnosticos()
        setLenguajeProhibido(true)
        return
      }

      const id = ++busquedaActual.current
      const sintomas = [
        ...new Set([...extraerSintomas(texto), ...sintomasElegidos]),
      ].filter((s) => SINTOMAS_VALIDOS.has(s))

      setLenguajeProhibido(false)
      setHasSearched(true)
      setSintomasDetectados(sintomas)
      setDiagnosticos([])
      setError(null)

      if (sintomas.length === 0) return

      setIsLoading(true)

      try {
        const session = await obtenerSesion()
        const resultados = await consultarCoincidencias(session, sintomas)

        if (id !== busquedaActual.current) return

        // Orden estable: a igual puntaje se mantiene el orden
        // alfabético que devuelve Prolog.
        resultados.sort(
          (a, b) => b.puntaje - a.puntaje || b.coincidencias - a.coincidencias,
        )
        setDiagnosticos(resultados)
      } catch (err) {
        console.error(err)
        if (id !== busquedaActual.current) return
        setError(
          "No se pudo consultar la base de conocimiento. Inténtalo de nuevo.",
        )
      } finally {
        if (id === busquedaActual.current) setIsLoading(false)
      }
    },
    [limpiarDiagnosticos],
  )

  // Descarga el motor en segundo plano para que la primera búsqueda no espere
  const precargarMotor = useCallback(() => {
    obtenerSesion().catch(() => {})
  }, [])

  return {
    diagnosticos,
    sintomasDetectados,
    error,
    lenguajeProhibido,
    isLoading,
    hasSearched,
    analizarSintoma,
    limpiarDiagnosticos,
    precargarMotor,
  }
}
