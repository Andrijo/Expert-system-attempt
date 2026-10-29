import { SINTOMAS } from "../utils/extraerSintoma"
import styles from "./SelectorSintomas.module.css"

export function SelectorSintomas({ seleccionados, onToggle }) {
  return (
    <details className={styles.details}>
      <summary className={styles.summary}>
        <span className={styles.pregunta}>¿No sabes cómo describirlo?</span>
        <span className={styles.accion}>Elige síntomas de la lista</span>
        {seleccionados.length > 0 && (
          <span className={styles.count}>{seleccionados.length}</span>
        )}
      </summary>

      <ul className={styles.list}>
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
