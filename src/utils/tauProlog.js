// Tau Prolog asigna variables globales implícitas (p. ej. `tau_file_system`),
// lo que falla en modo estricto cuando el bundler lo trata como módulo ESM.
// Por eso su código se evalúa como script clásico, igual que desde un CDN.
import coreSrc from "tau-prolog/modules/core.js?raw"
import listsSrc from "tau-prolog/modules/lists.js?raw"

const evaluarCommonJS = (src) => {
  const module = {}
  new Function("module", src)(module)
  return module.exports
}

const pl = evaluarCommonJS(coreSrc)
evaluarCommonJS(listsSrc)(pl)

export default pl
