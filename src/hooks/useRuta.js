import { useEffect, useState } from "react"

const TITULOS = {
  inicio: "Diagnóstico de PC",
  acerca: "Acerca de · Diagnóstico de PC",
  contacto: "Contacto · Diagnóstico de PC",
}

const leerRuta = () => {
  const ruta = window.location.hash.replace(/^#\/?/, "")
  return ruta in TITULOS ? ruta : "inicio"
}

export function useRuta() {
  const [ruta, setRuta] = useState(leerRuta)

  useEffect(() => {
    const handleHashChange = () => {
      setRuta(leerRuta())
      window.scrollTo(0, 0)
    }

    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  useEffect(() => {
    document.title = TITULOS[ruta]
  }, [ruta])

  return ruta
}
