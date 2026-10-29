import styles from "./DetalleDiagnostico.module.css"
import { EXPLICACIONES } from "../data/explicaciones"
import { getYoutubeSearchUrl } from "../utils/youtube"

export function DetalleDiagnostico({
  causa,
  sintomasCoincidentes,
  totalSintomas,
  onVolver,
}) {
  const detalle = EXPLICACIONES[causa]

  if (!detalle) {
    return (
      <div className={styles.container}>
        <button className={styles.backButton} onClick={onVolver}>
          Regresar
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
        Regresar
      </button>

      <h2 className={styles.title}>{detalle.componente}</h2>

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
          {sintomasCoincidentes.map((s, i) => (
            <span key={i} className={styles.chip}>
              {s.replaceAll("_", " ")}
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
          <h3 className={styles.subtitle}>Videos relacionados</h3>
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
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
