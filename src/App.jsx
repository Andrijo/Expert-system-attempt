import { useRef, useState } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { useDiagnosticoPC } from "./hooks/useDiagnosticoPC"
import { BuscadorSintoma } from "./components/BuscadorSintoma"
import { ListaDiagnosticos } from "./components/ListaDiagnosticos"
import { DetalleDiagnostico } from "./components/DetalleDiagnostico"
import styles from "./App.module.css"

gsap.registerPlugin(useGSAP)

const EJEMPLOS = [
  "se calienta mucho",
  "pantalla azul",
  "no enciende",
  "huele a quemado",
]

export default function DiagnosticoPC() {
  const [draftSintoma, setDraftSintoma] = useState("")
  const [causaSeleccionada, setCausaSeleccionada] = useState(null)

  const cardRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const resultsRef = useRef(null)
  const detailRef = useRef(null)

  const {
    diagnosticos,
    sintomasDetectados,
    error,
    palabraProhibida,
    isLoading,
    hasSearched,
    analizarSintoma,
    limpiarDiagnosticos,
  } = useDiagnosticoPC()

  const handleChangeSintoma = (nuevoValor) => {
    setDraftSintoma(nuevoValor)
    if (!nuevoValor.trim()) {
      setCausaSeleccionada(null)
      limpiarDiagnosticos()
    }
  }

  const handlerAnalizar = () => {
    setCausaSeleccionada(null)
    analizarSintoma(draftSintoma.trim())
  }

  const handleSeleccionarCausa = (causa) => {
    gsap.to(resultsRef.current, {
      y: -10,
      opacity: 0,
      ease: "power2.in",
      onComplete: () => setCausaSeleccionada(causa),
    })
  }

  const handleVolver = () => {
    setCausaSeleccionada(null)
  }

  const mostrarResultados = hasSearched && !causaSeleccionada && !isLoading
  const mostrarDetalle = !!causaSeleccionada

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.from(cardRef.current, {
      y: 32,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        titleRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.45",
      )
      .from(
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
    <div className={styles.wrapper}>
      <div ref={cardRef} className={styles.card}>
        <h1 ref={titleRef} className={styles.title}>
          Diagnóstica
          <span className={styles.subtitle}>tu PC</span>
        </h1>

        <p ref={descriptionRef} className={styles.description}>
          Describe el problema que estás experimentando con tu computadora y
          nuestro sistema experto tratará de ayudarte.
        </p>

        <BuscadorSintoma
          value={draftSintoma}
          onChange={handleChangeSintoma}
          onAnalizar={handlerAnalizar}
          isLoading={isLoading}
        />

        {palabraProhibida && (
          <p role="alert" className={styles.errorMessage}>
            La palabra <strong>{palabraProhibida}</strong> no está permitida.
          </p>
        )}

        <div aria-live="polite">
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
                      onClick={() => setDraftSintoma(ejemplo)}>
                      {ejemplo}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {mostrarResultados && sintomasDetectados.length > 0 && (
            <div ref={resultsRef} className={styles.results}>
              <div className={styles.chips}>
                Síntomas detectados:
                {sintomasDetectados.map((s) => (
                  <span key={s} className={styles.chip}>
                    {s.replaceAll("_", " ")}
                  </span>
                ))}
              </div>

              <h2 className={styles.resultsTitle}>Posibles causas:</h2>
              <ListaDiagnosticos
                diagnosticos={diagnosticos}
                totalSintomas={sintomasDetectados.length}
                error={error}
                onSeleccionar={handleSeleccionarCausa}
              />
            </div>
          )}

          {mostrarDetalle && (
            <div ref={detailRef} className={styles.results}>
              <DetalleDiagnostico
                causa={causaSeleccionada.componente}
                sintomasCoincidentes={causaSeleccionada.sintomasCoincidentes}
                totalSintomas={sintomasDetectados.length}
                onVolver={handleVolver}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
