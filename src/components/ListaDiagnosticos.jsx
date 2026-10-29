import { useRef } from "react"
import styles from "./ListaDiagnosticos.module.css"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { EXPLICACIONES } from "../data/explicaciones"

gsap.registerPlugin(useGSAP)

export function ListaDiagnosticos({
  diagnosticos,
  totalSintomas,
  error,
  onSeleccionar,
}) {
  const listRef = useRef(null)

  useGSAP(
    () => {
      if (!listRef.current) return
      gsap.from(listRef.current.children, {
        y: 12,
        opacity: 0,
        duration: 0.35,
        stagger: 0.07,
        ease: "power2.out",
        clearProps: "all",
      })
    },
    { dependencies: [diagnosticos], scope: listRef },
  )

  if (error) {
    return <p className={styles.error}>{error}</p>
  }

  if (!diagnosticos || diagnosticos.length === 0) {
    return (
      <p className={styles.empty}>
        No se encontraron componentes asociados a ese síntoma.
      </p>
    )
  }

  return (
    <ul ref={listRef} className={styles.list}>
      {diagnosticos.map((diagnostico) => {
        const { componente, coincidencias } = diagnostico
        const nombre =
          EXPLICACIONES[componente]?.componente ??
          componente.replaceAll("_", " ")
        const porcentaje = Math.round((coincidencias / totalSintomas) * 100)

        return (
          <li key={componente}>
            <button
              type="button"
              className={styles.item}
              onClick={() => onSeleccionar?.(diagnostico)}>
              <div className={styles.info}>
                <span className={styles.name}>{nombre}</span>
                <span className={styles.score}>
                  {coincidencias} de {totalSintomas}{" "}
                  {totalSintomas === 1 ? "síntoma" : "síntomas"}{" "}
                  {coincidencias === 1 ? "coincide" : "coinciden"}
                </span>
                <span
                  className={styles.bar}
                  role="meter"
                  aria-label={`Coincidencia con ${nombre}`}
                  aria-valuemin={0}
                  aria-valuemax={totalSintomas}
                  aria-valuenow={coincidencias}>
                  <span
                    className={styles.barFill}
                    style={{ width: `${porcentaje}%` }}
                  />
                </span>
              </div>
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
