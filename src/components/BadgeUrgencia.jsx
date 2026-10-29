import styles from "./BadgeUrgencia.module.css"

const ETIQUETAS = {
  critica: "Urgencia alta",
  moderada: "Urgencia media",
  preventiva: "Preventivo",
}

export function BadgeUrgencia({ urgencia }) {
  if (!ETIQUETAS[urgencia]) return null

  return (
    <span className={`${styles.badge} ${styles[urgencia]}`}>
      {ETIQUETAS[urgencia]}
    </span>
  )
}
