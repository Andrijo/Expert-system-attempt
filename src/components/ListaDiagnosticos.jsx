import { useRef, useState } from "react"
import styles from "./ListaDiagnosticos.module.css"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { EXPLICACIONES } from "../data/explicaciones"
import { prefiereMenosMovimiento } from "../utils/movimiento"
import { BadgeUrgencia } from "./BadgeUrgencia"

const PESO_MAXIMO = 5
const VISIBLES_INICIAL = 5

export function ListaDiagnosticos({
  diagnosticos,
  totalSintomas,
  error,
  onSeleccionar,
}) {
  const listRef = useRef(null)
  const [verTodos, setVerTodos] = useState(false)

  useGSAP(
    () => {
      if (!listRef.current || prefiereMenosMovimiento()) return
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
    return (
      <p role="alert" className={styles.error}>
        {error}
      </p>
    )
  }

  if (!diagnosticos || diagnosticos.length === 0) {
    return (
      <p className={styles.empty}>
        No se encontraron componentes asociados a ese síntoma.
      </p>
    )
  }

  const visibles = verTodos
    ? diagnosticos
    : diagnosticos.slice(0, VISIBLES_INICIAL)
  const ocultos = diagnosticos.length - visibles.length

  return (
    <>
      <ul ref={listRef} className={styles.list}>
        {visibles.map((diagnostico) => {
          const { componente, coincidencias, puntaje } = diagnostico
          const detalle = EXPLICACIONES[componente]
          const nombre = detalle?.componente ?? componente.replaceAll("_", " ")
          const porcentaje = Math.round(
            (puntaje / (PESO_MAXIMO * totalSintomas)) * 100,
          )

          return (
            <li key={componente}>
              <button
                type="button"
                className={styles.item}
                onClick={() => onSeleccionar?.(diagnostico)}>
                <span className={styles.info}>
                  <span className={styles.header}>
                    <span className={styles.name}>{nombre}</span>
                    <BadgeUrgencia urgencia={detalle?.urgencia} />
                  </span>
                  <span className={styles.score}>
                    {coincidencias} de {totalSintomas}{" "}
                    {totalSintomas === 1 ? "síntoma" : "síntomas"}{" "}
                    {coincidencias === 1 ? "coincide" : "coinciden"} ·
                    relevancia {porcentaje}%
                  </span>
                  <span className={styles.bar} aria-hidden="true">
                    <span
                      className={styles.barFill}
                      style={{ width: `${porcentaje}%` }}
                    />
                  </span>
                </span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {ocultos > 0 && (
        <button
          type="button"
          className={styles.more}
          onClick={() => setVerTodos(true)}>
          Ver {ocultos} {ocultos === 1 ? "causa más" : "causas más"}
        </button>
      )}
    </>
  )
}
