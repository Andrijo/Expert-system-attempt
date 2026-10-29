import { createRequire } from "node:module"
import { describe, expect, it } from "vitest"
import { BASE_CONOCIMIENTO } from "./baseConocimiento"
import { EXPLICACIONES } from "./explicaciones"
import { SINTOMAS } from "../utils/extraerSintoma"

// En Node, Tau Prolog se carga como paquete CommonJS normal
const require = createRequire(import.meta.url)
const pl = require("tau-prolog")
require("tau-prolog/modules/lists")(pl)

const HECHOS = [...BASE_CONOCIMIENTO.matchAll(/causa\((\w+), (\w+), \d\)\./g)]
const COMPONENTES = new Set(HECHOS.map(([, componente]) => componente))
const SINTOMAS_BASE = new Set(HECHOS.map(([, , sintoma]) => sintoma))
const URGENCIAS = ["critica", "moderada", "preventiva"]

describe("consistencia de la base de conocimiento", () => {
  it("Tau Prolog carga la base y diagnostica", async () => {
    const session = pl.create()
    await new Promise((resolve, reject) => {
      session.consult(BASE_CONOCIMIENTO, { success: resolve, error: reject })
    })

    const componentes = await new Promise((resolve, reject) => {
      session.query("findall(C, diagnostico_mayoria(C, [no_carga], _, _, _), Cs).", {
        success: () =>
          session.answer({
            success: (answer) => resolve(answer.lookup("Cs").toJavaScript()),
            fail: () => resolve([]),
            error: reject,
          }),
        error: reject,
      })
    })

    expect(componentes.sort()).toEqual(["bateria", "cargador"])
  })

  it("cada componente tiene su explicación", () => {
    for (const componente of COMPONENTES) {
      expect(EXPLICACIONES, componente).toHaveProperty(componente)
    }
  })

  it("cada explicación corresponde a un componente con hechos", () => {
    expect(Object.keys(EXPLICACIONES).sort()).toEqual([...COMPONENTES].sort())
  })

  it("los síntomas reconocidos y los de la base coinciden", () => {
    expect(SINTOMAS.map(({ id }) => id).sort()).toEqual([...SINTOMAS_BASE].sort())
  })

  it("cada explicación tiene una urgencia válida", () => {
    for (const [id, { urgencia }] of Object.entries(EXPLICACIONES)) {
      expect(URGENCIAS, id).toContain(urgencia)
    }
  })
})
