import { describe, expect, it } from "vitest"
import { extraerSintomas } from "./extraerSintoma"

describe("extraerSintomas", () => {
  it.each([
    ["mi pc se calienta mucho", ["calentamiento"]],
    ["sale pantalla azul y se reinicia solo", ["pantallazo_azul", "reinicios_constantes"]],
    ["la compu no arranca", ["pc_no_enciende"]],
    ["no arranca windows", ["error_no_bootable_device"]],
    ["no carga el sistema operativo", ["error_no_bootable_device"]],
    ["se calentó y se apagó de golpe", ["apagado_repentino", "calentamiento"]],
    ["el ventilador hace ruido", ["ruido_excesivo"]],
    ["la batería está hinchada", ["bateria_hinchada"]],
    ["se apaga la pantalla", ["pantalla_negra"]],
    ["la pc no responde", ["congelamientos"]],
  ])("detecta síntomas en %j", (texto, esperados) => {
    expect(extraerSintomas(texto).sort()).toEqual([...esperados].sort())
  })

  it.each([
    ["no se calienta pero va lenta", ["sistema_lento"]],
    ["la pantalla no parpadea", []],
    ["nunca hace ruido", []],
    ["no se calienta, se reinicia solo", ["reinicios_constantes"]],
    ["no prende y huele a quemado", ["pc_no_enciende", "olor_a_quemado"]],
    ["no hace nada al encender pero hace pitidos", ["pitidos_al_arrancar", "pc_no_enciende"]],
    ["ya no se reinicia sola", []],
  ])("respeta las negaciones en %j", (texto, esperados) => {
    expect(extraerSintomas(texto)).toEqual(esperados)
  })

  it.each([
    "el led parpadea",
    "el teclado no responde",
    "se me fue la luz",
  ])("no interpreta frases ambiguas: %j", (texto) => {
    expect(extraerSintomas(texto)).toEqual([])
  })
})
