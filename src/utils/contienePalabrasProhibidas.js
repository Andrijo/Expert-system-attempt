import { PALABRAS_PROHIBIDAS } from "../data/palabrasProhibidas"
import { escaparRegex, normalizarTexto } from "./normalizarTexto"

const PATRONES_PROHIBIDOS = [...new Set(PALABRAS_PROHIBIDAS)].map(
  (palabra) => ({
    palabra,
    regex: new RegExp(`\\b${escaparRegex(normalizarTexto(palabra))}\\b`),
  }),
)

export const obtenerPalabraProhibida = (texto) => {
  const normalizado = normalizarTexto(texto)

  return (
    PATRONES_PROHIBIDOS.find(({ regex }) => regex.test(normalizado))?.palabra ??
    null
  )
}
