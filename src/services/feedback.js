const ENDPOINT = import.meta.env.VITE_FEEDBACK_ENDPOINT

export const enviarFeedback = async (feedback) => {
  if (!ENDPOINT) {
    throw new Error("VITE_FEEDBACK_ENDPOINT no está configurado")
  }

  const respuesta = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(feedback),
  })

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al enviar el feedback`)
  }
}
