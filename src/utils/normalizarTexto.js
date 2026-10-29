export const normalizarTexto = (texto) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim()

export const escaparRegex = (texto) =>
  texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
