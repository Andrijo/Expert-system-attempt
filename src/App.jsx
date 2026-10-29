import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { useDiagnosticoPC } from "./hooks/useDiagnosticoPC"
import { BuscadorSintoma } from "./components/BuscadorSintoma"
import { ListaDiagnosticos } from "./components/ListaDiagnosticos"
import { DetalleDiagnostico } from "./components/DetalleDiagnostico"
import { SelectorSintomas } from "./components/SelectorSintomas"
import { Footer } from "./components/Footer"
import { AcercaDe } from "./components/AcercaDe"
import { FormularioFeedback } from "./components/FormularioFeedback"
import { useRuta } from "./hooks/useRuta"
import { etiquetaSintoma } from "./utils/extraerSintoma"
import { prefiereMenosMovimiento } from "./utils/movimiento"
import styles from "./App.module.css"

gsap.registerPlugin(useGSAP)

const EJEMPLOS = [
  "se calienta mucho",
  "pantalla azul",
  "no enciende",
  "huele a quemado",
]

const describirEstado = ({ isLoading, mostrarResultados, sintomas, causas, error }) => {
  if (isLoading) return "Analizando síntomas…"
  if (!mostrarResultados || error) return ""
  if (sintomas === 0) return "No se reconoció ningún síntoma."
  return causas === 1
    ? "Se encontró 1 posible causa."
    : `Se encontraron ${causas} posibles causas.`
}

const ALERTAS_SEGURIDAD = {
  olor_a_quemado:
    "el olor a quemado puede indicar un riesgo de incendio. Apaga y desconecta el equipo ahora y no lo vuelvas a encender hasta que lo revise un técnico.",
  bateria_hinchada:
    "una batería hinchada puede incendiarse. Desconecta el cargador, apaga el equipo y no lo cargues ni presiones la batería hasta que lo revise un técnico.",
}

export default function DiagnosticoPC() {
  const [draftSintoma, setDraftSintoma] = useState("")
  const [causaSeleccionada, setCausaSeleccionada] = useState(null)
  const [sintomasElegidos, setSintomasElegidos] = useState([])
  const [verTodasCausas, setVerTodasCausas] = useState(false)
  const [causaPrevia, setCausaPrevia] = useState(null)

  const cardRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const resultsRef = useRef(null)
  const detailRef = useRef(null)

  const ruta = useRuta()
  const rutaAnterior = useRef(ruta)

  const {
    diagnosticos,
    sintomasDetectados,
    error,
    lenguajeProhibido,
    isLoading,
    hasSearched,
    analizarSintoma,
    limpiarDiagnosticos,
    precargarMotor,
  } = useDiagnosticoPC()

  const reiniciarSiVacio = (texto, elegidos) => {
    if (texto.trim() || elegidos.length > 0) return
    setCausaSeleccionada(null)
    limpiarDiagnosticos()
  }

  const handleChangeSintoma = (nuevoValor) => {
    setDraftSintoma(nuevoValor)
    reiniciarSiVacio(nuevoValor, sintomasElegidos)
  }

  const handleToggleSintoma = (id) => {
    const nuevos = sintomasElegidos.includes(id)
      ? sintomasElegidos.filter((s) => s !== id)
      : [...sintomasElegidos, id]
    setSintomasElegidos(nuevos)
    reiniciarSiVacio(draftSintoma, nuevos)
  }

  const analizar = (texto) => {
    setCausaSeleccionada(null)
    setCausaPrevia(null)
    setVerTodasCausas(false)
    analizarSintoma(texto.trim(), sintomasElegidos)
  }

  const handleAnalizar = () => analizar(draftSintoma)

  const handleEjemplo = (ejemplo) => {
    setDraftSintoma(ejemplo)
    analizar(ejemplo)
  }

  const handleLimpiar = () => {
    setDraftSintoma("")
    setSintomasElegidos([])
    setCausaSeleccionada(null)
    setCausaPrevia(null)
    setVerTodasCausas(false)
    limpiarDiagnosticos()
  }

  const handleSeleccionarCausa = (causa) => {
    if (prefiereMenosMovimiento()) {
      setCausaSeleccionada(causa)
      return
    }
    gsap.to(resultsRef.current, {
      y: -10,
      opacity: 0,
      ease: "power2.in",
      onComplete: () => setCausaSeleccionada(causa),
    })
  }

  const handleVolver = () => {
    setCausaPrevia(causaSeleccionada.componente)
    setCausaSeleccionada(null)
  }

  const mostrarResultados = hasSearched && !causaSeleccionada && !isLoading
  const mostrarDetalle = !!causaSeleccionada
  const alertasSeguridad = sintomasDetectados.filter(
    (s) => ALERTAS_SEGURIDAD[s],
  )
  const mensajeEstado = describirEstado({
    isLoading,
    mostrarResultados,
    sintomas: sintomasDetectados.length,
    causas: diagnosticos.length,
    error,
  })
  const puedeAnalizar =
    draftSintoma.trim() !== "" || sintomasElegidos.length > 0

  useEffect(() => {
    if (rutaAnterior.current !== ruta && ruta === "inicio") {
      titleRef.current?.focus()
    }
    rutaAnterior.current = ruta
  }, [ruta])

  useGSAP(() => {
    if (prefiereMenosMovimiento()) return
    const tl = gsap.timeline()

    tl.from(cardRef.current, {
      y: 32,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    if (!titleRef.current) return

    tl.from(
      titleRef.current,
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.45",
    ).from(
      descriptionRef.current,
      {
        y: 12,
        opacity: 0,
        duration: 0.45,
        ease: "power2.out",
      },
      "-=0.35",
    )
  }, [])

  useGSAP(() => {
    if (!resultsRef.current || !mostrarResultados) return
    if (prefiereMenosMovimiento()) return

    gsap.fromTo(
      resultsRef.current,
      {
        y: 16,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
        clearProps: "all",
      },
    )
  }, [mostrarResultados, diagnosticos, sintomasDetectados, error])

  useGSAP(() => {
    if (!detailRef.current || !mostrarDetalle) return
    if (prefiereMenosMovimiento()) return

    gsap.fromTo(
      detailRef.current,
      {
        y: 20,
        opacity: 0,
        scale: 0.98,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.4)",
        clearProps: "all",
      },
    )
  }, [mostrarDetalle, causaSeleccionada])

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div ref={cardRef} className={styles.card}>
          {ruta === "acerca" && <AcercaDe />}
          {ruta === "contacto" && <FormularioFeedback />}
          {ruta === "inicio" && (
            <>
              <h1 ref={titleRef} tabIndex={-1} className={styles.title}>
                Diagnostica
                <span className={styles.subtitle}>tu PC</span>
              </h1>

              <p ref={descriptionRef} className={styles.description}>
                Describe el problema que estás experimentando con tu computadora
                y nuestro sistema experto tratará de ayudarte.
              </p>

              <BuscadorSintoma
                value={draftSintoma}
                onChange={handleChangeSintoma}
                onAnalizar={handleAnalizar}
                onLimpiar={handleLimpiar}
                onFocus={precargarMotor}
                isLoading={isLoading}
                puedeAnalizar={puedeAnalizar}
              />

              <SelectorSintomas
                seleccionados={sintomasElegidos}
                onToggle={handleToggleSintoma}
              />

              {lenguajeProhibido && (
                <p role="alert" className={styles.errorMessage}>
                  Tu descripción contiene lenguaje no permitido. Reformúlala
                  para poder analizarla.
                </p>
              )}

              <p role="status" className={styles.srOnly}>
                {mensajeEstado}
              </p>

              <div>
                {isLoading && (
                  <div className={styles.skeleton} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                )}

                {mostrarResultados && sintomasDetectados.length === 0 && (
                  <div ref={resultsRef} className={styles.results}>
                    <h2 className={styles.resultsTitle}>
                      No reconocí ningún síntoma.
                    </h2>
                    <p className={styles.help}>
                      Intenta describirlo con otras palabras. Por ejemplo:
                    </p>
                    <ul className={styles.examples}>
                      {EJEMPLOS.map((ejemplo) => (
                        <li key={ejemplo}>
                          <button
                            type="button"
                            className={styles.example}
                            onClick={() => handleEjemplo(ejemplo)}>
                            {ejemplo}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {mostrarResultados && sintomasDetectados.length > 0 && (
                  <div ref={resultsRef} className={styles.results}>
                    {alertasSeguridad.map((s) => (
                      <p key={s} role="alert" className={styles.safetyAlert}>
                        <strong>Atención:</strong> {ALERTAS_SEGURIDAD[s]}
                      </p>
                    ))}

                    <div className={styles.chips}>
                      <span id="sintomas-detectados">Síntomas detectados:</span>
                      <ul
                        aria-labelledby="sintomas-detectados"
                        className={styles.chipList}>
                        {sintomasDetectados.map((s) => (
                          <li key={s} className={styles.chip}>
                            {etiquetaSintoma(s)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {sintomasDetectados.length === 1 && (
                      <p className={styles.hint}>
                        Con un solo síntoma hay muchas causas posibles. Añade
                        más detalles para afinar el resultado.
                      </p>
                    )}

                    <h2 className={styles.resultsTitle}>Posibles causas:</h2>
                    <ListaDiagnosticos
                      diagnosticos={diagnosticos}
                      totalSintomas={sintomasDetectados.length}
                      error={error}
                      verTodos={verTodasCausas}
                      onVerTodos={() => setVerTodasCausas(true)}
                      componenteEnfocado={causaPrevia}
                      onSeleccionar={handleSeleccionarCausa}
                    />
                  </div>
                )}

                {mostrarDetalle && (
                  <div ref={detailRef} className={styles.results}>
                    <DetalleDiagnostico
                      causa={causaSeleccionada.componente}
                      sintomasCoincidentes={
                        causaSeleccionada.sintomasCoincidentes
                      }
                      totalSintomas={sintomasDetectados.length}
                      onVolver={handleVolver}
                    />
                  </div>
                )}
              </div>

              <p className={styles.disclaimer}>
                Este diagnóstico es orientativo y no sustituye la revisión de un
                técnico. Si dudas, no abras ni manipules componentes internos.
              </p>
            </>
          )}
        </div>
      </div>
      <Footer ruta={ruta} />
    </div>
  )
}
