import { useCallback, useEffect, useState } from "react"

const CLAVE = "tema"
const COLOR_META = { light: "#f6f4f1", dark: "#15130f" }

const temaInicial = () => {
  try {
    const guardado = localStorage.getItem(CLAVE)
    if (guardado === "light" || guardado === "dark") return guardado
  } catch {
    /* almacenamiento no disponible */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export function useTema() {
  const [tema, setTema] = useState(temaInicial)

  useEffect(() => {
    document.documentElement.dataset.theme = tema
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", COLOR_META[tema])
  }, [tema])

  const alternar = useCallback(() => {
    setTema((actual) => {
      const nuevo = actual === "dark" ? "light" : "dark"
      try {
        localStorage.setItem(CLAVE, nuevo)
      } catch {
        /* almacenamiento no disponible */
      }
      return nuevo
    })
  }, [])

  return { tema, alternar }
}
