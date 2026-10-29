import { useRef, useState } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { SINTOMAS } from "../utils/extraerSintoma"
import { prefiereMenosMovimiento } from "../utils/movimiento"
import styles from "./SelectorSintomas.module.css"

export function SelectorSintomas({ seleccionados, onToggle }) {
  const listRef = useRef(null)
  const [abierto, setAbierto] = useState(false)

  useGSAP(
    () => {
      if (!abierto || prefiereMenosMovimiento()) return

      gsap.set(listRef.current, { overflow: "hidden" })
      gsap.from(listRef.current, {
        height: 0,
        marginTop: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        clearProps: "all",
      })
      gsap.from(listRef.current.children, {
        y: -6,
        opacity: 0,
        duration: 0.25,
        stagger: 0.015,
        delay: 0.05,
        ease: "power2.out",
        clearProps: "all",
      })
    },
    { dependencies: [abierto], scope: listRef },
  )

  return (
    <details className={styles.details} onToggle={(e) => setAbierto(e.currentTarget.open)}>
      <summary className={styles.summary}>
        <span className={styles.pregunta}>¿No sabes cómo describirlo?</span>
        <span className={styles.accion}>Elige síntomas de la lista</span>
        {seleccionados.length > 0 && (
          <span className={styles.count}>{seleccionados.length}</span>
        )}
      </summary>

      <ul ref={listRef} className={styles.list}>
        {SINTOMAS.map(({ id, etiqueta }) => {
          const activo = seleccionados.includes(id)
          return (
            <li key={id}>
              <button
                type="button"
                aria-pressed={activo}
                className={`${styles.chip} ${activo ? styles.activo : ""}`}
                onClick={() => onToggle(id)}>
                {etiqueta}
              </button>
            </li>
          )
        })}
      </ul>
    </details>
  )
}
