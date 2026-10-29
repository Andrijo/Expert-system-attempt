import { useEffect, useRef } from "react"
import styles from "./DetalleDiagnostico.module.css"
import { EXPLICACIONES } from "../data/explicaciones"
import { etiquetaSintoma } from "../utils/extraerSintoma"
import { getYoutubeSearchUrl } from "../utils/youtube"
import { BadgeUrgencia } from "./BadgeUrgencia"

export function DetalleDiagnostico({
  causa,
  sintomasCoincidentes,
  totalSintomas,
  onVolver,
}) {
  const detalle = EXPLICACIONES[causa]
  const titleRef = useRef(null)

  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  if (!detalle) {
    return (
      <div className={styles.container}>
        <button className={styles.backButton} onClick={onVolver}>
          ← Volver a los resultados
        </button>
        <p className={styles.text}>
          Actualmente, no hay información disponible para este problema.
        </p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={onVolver}>
        ← Volver a los resultados
      </button>

      <h2 ref={titleRef} tabIndex={-1} className={styles.title}>
        {detalle.componente}
      </h2>
      <BadgeUrgencia urgencia={detalle.urgencia} />

      {detalle.alerta && (
        <p role="alert" className={styles.alerta}>
          <strong>Atención:</strong> {detalle.alerta}
        </p>
      )}

      <section className={styles.section}>
        <h3 className={styles.subtitle}>¿Por qué podría ser esta causa?</h3>
        <p className={styles.text}>{detalle.descripcion}</p>
      </section>

      <section className={styles.section}>
        <h3 className={styles.subtitle}>¿Cómo se llegó a esta conclusión?</h3>
        <p className={styles.text}>
          Se llegó a esta conclusión porque {sintomasCoincidentes.length} de{" "}
          {totalSintomas} {totalSintomas === 1 ? "síntoma" : "síntomas"}{" "}
          {totalSintomas === 1 ? "reportado" : "reportados"}{" "}
          {sintomasCoincidentes.length === 1 ? "coincide" : "coinciden"} con los
          síntomas asociados a este componente en la base de conocimiento.
        </p>

        <div className={styles.chips}>
          {sintomasCoincidentes.map((s) => (
            <span key={s} className={styles.chip}>
              {etiquetaSintoma(s)}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.subtitle}>Pasos sugeridos</h3>
        <ul className={styles.list}>
          {detalle.pasos.map((paso, i) => (
            <li key={i} className={styles.listItem}>
              {paso}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h3 className={styles.subtitle}>Herramientas sugeridas</h3>
        <ul className={styles.list}>
          {detalle.herramientas.map((herramienta, i) => (
            <li key={i} className={styles.listItem}>
              {herramienta}
            </li>
          ))}
        </ul>
      </section>

      {detalle.videos?.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.subtitle}>Buscar en YouTube</h3>
          <ul className={styles.videosList}>
            {detalle.videos.map((video, i) => (
              <li key={i} className={styles.videoItem}>
                <a
                  href={getYoutubeSearchUrl(video.query)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.videoLink}>
                  <span className={styles.videoIcon} aria-hidden="true">
                    ▶
                  </span>
                  {video.titulo}
                  <span className={styles.externo} aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
