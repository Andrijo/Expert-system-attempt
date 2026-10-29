import { Pantalla } from "./Pantalla"
import styles from "./AcercaDe.module.css"

const PASOS = [
  {
    titulo: "Describes el problema",
    texto:
      "Escribes lo que le pasa a tu equipo con tus propias palabras o eliges síntomas de una lista.",
  },
  {
    titulo: "Se identifican los síntomas",
    texto:
      "El texto se compara con cientos de expresiones habituales para reconocer síntomas concretos, como “pantallazo azul” o “se calienta”.",
  },
  {
    titulo: "El motor de inferencia razona",
    texto:
      "Una base de conocimiento en Prolog relaciona cada componente con los síntomas que puede provocar, con un peso del 1 al 5 según lo característico que sea.",
  },
  {
    titulo: "Recibes las posibles causas",
    texto:
      "Los componentes se ordenan por la suma de pesos de los síntomas que coinciden, y cada uno incluye pasos, herramientas y videos para revisarlo.",
  },
]

export function AcercaDe() {
  return (
    <Pantalla titulo="Acerca de">
      <p className={styles.lead}>
        <strong>Diagnostica tu PC</strong> es un sistema experto que ayuda a
        identificar qué componente de una computadora podría estar fallando a
        partir de los síntomas que describes.
      </p>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>¿Cómo funciona?</h2>
        <ol className={styles.pasos}>
          {PASOS.map(({ titulo, texto }) => (
            <li key={titulo} className={styles.paso}>
              <strong className={styles.pasoTitulo}>{titulo}</strong>
              <span>{texto}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Limitaciones</h2>
        <p className={styles.text}>
          El diagnóstico es orientativo: se basa en reglas generales y no puede
          examinar tu equipo. Varios componentes comparten síntomas, así que
          cuantos más detalles aportes, más preciso será el resultado. Ante olor
          a quemado, humo o una batería hinchada, desconecta el equipo y acude a
          un técnico.
        </p>
      </section>
    </Pantalla>
  )
}
