import { describe, expect, it } from "vitest"
import { contieneLenguajeProhibido } from "./contienePalabrasProhibidas"

describe("contieneLenguajeProhibido", () => {
  it.each([
    "el cono del ventilador hace ruido",
    "hace un pito al prender",
    "la maldita pc no enciende",
    "wey, se calienta mucho",
    "la pc está inútil",
    "pitidos al arrancar",
  ])("permite descripciones legítimas: %j", (texto) => {
    expect(contieneLenguajeProhibido(texto)).toBe(false)
  })

  it.each(["eres un idiota", "qué coño le pasa", "ÑEMA", "Pendejo"])(
    "detecta lenguaje no permitido: %j",
    (texto) => {
      expect(contieneLenguajeProhibido(texto)).toBe(true)
    },
  )
})
