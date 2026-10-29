export const normalizarTexto = (texto, { conservarEnie = false } = {}) => {
  let normalizado = texto.toLowerCase().normalize("NFD")
  if (conservarEnie) normalizado = normalizado.replace(/ñ/g, "ñ")

  return normalizado
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

export const escaparRegex = (texto) =>
  texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
