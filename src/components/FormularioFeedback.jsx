import { useState } from "react"
import { Pantalla } from "./Pantalla"
import { enviarFeedback } from "../services/feedback"
import styles from "./FormularioFeedback.module.css"

const TIPOS = [
  { valor: "sugerencia", etiqueta: "Sugerencia" },
  { valor: "diagnostico_incorrecto", etiqueta: "Diagnóstico incorrecto" },
  { valor: "error", etiqueta: "Error en la aplicación" },
  { valor: "otro", etiqueta: "Otro" },
]

const MAX_MENSAJE = 1000
const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const FORMULARIO_VACIO = {
  nombre: "",
  correo: "",
  tipo: TIPOS[0].valor,
  mensaje: "",
  sitio: "",
}

const validar = ({ correo, mensaje }) => {
  const errores = {}
  if (correo.trim() && !CORREO_VALIDO.test(correo.trim())) {
    errores.correo = "Revisa el formato del correo."
  }
  if (!mensaje.trim()) {
    errores.mensaje = "Escribe tu comentario."
  }
  return errores
}

export function FormularioFeedback() {
  const [datos, setDatos] = useState(FORMULARIO_VACIO)
  const [errores, setErrores] = useState({})
  const [estado, setEstado] = useState("inactivo")

  const handleChange = (e) => {
    const { name, value } = e.target
    setDatos((actuales) => ({ ...actuales, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const nuevosErrores = validar(datos)
    setErrores(nuevosErrores)

    const primerError = Object.keys(nuevosErrores)[0]
    if (primerError) {
      form.elements[primerError].focus()
      return
    }

    // Campo trampa: solo lo rellenan los bots
    if (datos.sitio) {
      setEstado("enviado")
      return
    }

    setEstado("enviando")

    try {
      await enviarFeedback({
        nombre: datos.nombre.trim(),
        correo: datos.correo.trim(),
        tipo: datos.tipo,
        mensaje: datos.mensaje.trim(),
      })
      setDatos(FORMULARIO_VACIO)
      setEstado("enviado")
    } catch (err) {
      console.error(err)
      setEstado("error")
    }
  }

  if (estado === "enviado") {
    return (
      <Pantalla titulo="Contacto">
        <div role="status" className={styles.exito}>
          <strong>¡Gracias por tu comentario!</strong> Lo revisaremos para
          mejorar el sistema.
        </div>
        <button
          type="button"
          className={styles.secundario}
          onClick={() => setEstado("inactivo")}>
          Enviar otro comentario
        </button>
      </Pantalla>
    )
  }

  const enviando = estado === "enviando"

  return (
    <Pantalla titulo="Contacto">
      <p className={styles.intro}>
        ¿Encontraste un error, un diagnóstico que no encaja o tienes una idea
        para mejorar la aplicación? Cuéntanoslo.
      </p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.fila}>
          <div className={styles.campo}>
            <label htmlFor="feedback-nombre" className={styles.label}>
              Nombre <span className={styles.opcional}>(opcional)</span>
            </label>
            <input
              id="feedback-nombre"
              name="nombre"
              type="text"
              autoComplete="name"
              maxLength={80}
              value={datos.nombre}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.campo}>
            <label htmlFor="feedback-correo" className={styles.label}>
              Correo <span className={styles.opcional}>(opcional)</span>
            </label>
            <input
              id="feedback-correo"
              name="correo"
              type="email"
              autoComplete="email"
              maxLength={120}
              value={datos.correo}
              onChange={handleChange}
              aria-invalid={!!errores.correo}
              aria-describedby={
                errores.correo ? "feedback-correo-error" : "feedback-correo-ayuda"
              }
              className={styles.input}
            />
            {errores.correo ? (
              <p id="feedback-correo-error" className={styles.error}>
                {errores.correo}
              </p>
            ) : (
              <p id="feedback-correo-ayuda" className={styles.ayuda}>
                Solo lo usaremos para responderte.
              </p>
            )}
          </div>
        </div>

        <div className={styles.campo}>
          <label htmlFor="feedback-tipo" className={styles.label}>
            Tipo de comentario
          </label>
          <select
            id="feedback-tipo"
            name="tipo"
            value={datos.tipo}
            onChange={handleChange}
            className={styles.input}>
            {TIPOS.map(({ valor, etiqueta }) => (
              <option key={valor} value={valor}>
                {etiqueta}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.campo}>
          <label htmlFor="feedback-mensaje" className={styles.label}>
            Comentario
          </label>
          <textarea
            id="feedback-mensaje"
            name="mensaje"
            rows={6}
            required
            maxLength={MAX_MENSAJE}
            value={datos.mensaje}
            onChange={handleChange}
            aria-invalid={!!errores.mensaje}
            aria-describedby={`feedback-mensaje-contador${
              errores.mensaje ? " feedback-mensaje-error" : ""
            }`}
            className={`${styles.input} ${styles.textarea}`}
          />
          <div className={styles.pie}>
            {errores.mensaje && (
              <p id="feedback-mensaje-error" className={styles.error}>
                {errores.mensaje}
              </p>
            )}
            <p id="feedback-mensaje-contador" className={styles.contador}>
              {datos.mensaje.length}/{MAX_MENSAJE} caracteres
            </p>
          </div>
        </div>

        <div className={styles.trampa} aria-hidden="true">
          <label htmlFor="feedback-sitio">No rellenes este campo</label>
          <input
            id="feedback-sitio"
            name="sitio"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={datos.sitio}
            onChange={handleChange}
          />
        </div>

        {estado === "error" && (
          <p role="alert" className={styles.errorEnvio}>
            No se pudo enviar tu comentario. Inténtalo de nuevo más tarde.
          </p>
        )}

        <button type="submit" disabled={enviando} className={styles.boton}>
          {enviando ? "Enviando…" : "Enviar comentario"}
        </button>
      </form>
    </Pantalla>
  )
}
