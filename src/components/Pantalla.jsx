import { useEffect, useRef } from "react"
import styles from "./Pantalla.module.css"

export function Pantalla({ titulo, children }) {
  const titleRef = useRef(null)

  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  return (
    <div className={styles.container}>
      <a href="#/" className={styles.back}>
        ← Volver al diagnóstico
      </a>
      <h1 ref={titleRef} tabIndex={-1} className={styles.title}>
        {titulo}
      </h1>
      {children}
    </div>
  )
}
