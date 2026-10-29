import { PALABRAS_PROHIBIDAS } from "../data/palabrasProhibidas"
import { escaparRegex, normalizarTexto } from "./normalizarTexto"

// La ñ se conserva para no confundir palabras como "cono" y "coño",
// y los límites usan letras Unicode porque \b no reconoce la ñ.
const normalizar = (texto) => normalizarTexto(texto, { conservarEnie: true })

const PATRONES_PROHIBIDOS = [...new Set(PALABRAS_PROHIBIDAS.map(normalizar))].map(
  (palabra) =>
    new RegExp(`(?<![\\p{L}\\p{N}])${escaparRegex(palabra)}(?![\\p{L}\\p{N}])`, "u"),
)

export const contieneLenguajeProhibido = (texto) => {
  const normalizado = normalizar(texto)
  return PATRONES_PROHIBIDOS.some((regex) => regex.test(normalizado))
}
