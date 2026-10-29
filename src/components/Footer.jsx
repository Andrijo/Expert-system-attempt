import styles from "./Footer.module.css"

const ENLACES = [
  { ruta: "inicio", href: "#/", etiqueta: "Diagnóstico" },
  { ruta: "acerca", href: "#/acerca", etiqueta: "Acerca de" },
  { ruta: "contacto", href: "#/contacto", etiqueta: "Contacto" },
]

export function Footer({ ruta }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <nav aria-label="Pie de página">
          <ul className={styles.links}>
            {ENLACES.map(({ ruta: destino, href, etiqueta }) => (
              <li key={destino}>
                <a
                  href={href}
                  className={styles.link}
                  aria-current={ruta === destino ? "page" : undefined}>
                  {etiqueta}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className={styles.text}>
          Los resultados son orientativos y no sustituyen la revisión de un
          técnico.
        </p>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} Diagnostica tu PC
          </p>
          <p className={styles.copy}>
            Desarrollado por{" "}
            <a
              href="https://github.com/Andrijo"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}>
              Andie
              <span className={styles.srOnly}>
                {" "}
                (GitHub, se abre en una pestaña nueva)
              </span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
