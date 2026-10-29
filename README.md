# Diagnostica tu PC

Aplicación de ejemplo en React + Vite que actúa como un pequeño sistema experto para diagnosticar posibles fallos de hardware en una PC a partir de la descripción de síntomas.

Resumen rápido
- El usuario escribe un síntoma en la UI y/o elige síntomas de una lista.
- extraerSintomas convierte el texto en uno o varios 'síntomas' canónicos.
- Se valida que el texto no contenga palabras prohibidas (lista en `src/data/palabrasProhibidas.js`).
- Si es válido, se carga la base de conocimiento Prolog (`src/data/baseConocimiento.js`) en Tau Prolog (paquete npm, cargado bajo demanda en la primera búsqueda) y se consulta la regla `diagnostico_mayoria` para inferir posibles componentes fallidos. Cada relación componente–síntoma tiene un peso de 1 a 5 (5 = síntoma característico) y los resultados se ordenan por la suma de pesos.
- Los resultados se muestran ordenados por puntaje, con su nivel de urgencia; al seleccionar una causa se muestra información detallada (explicaciones, pasos y videos).

Estructura principal
- `src/App.jsx` — Componente raíz y orquestador de la UI.
- `src/hooks/useDiagnosticoPC.js` — Lógica principal: extracción de síntomas, comprobación de palabras prohibidas y consulta a Tau Prolog.
- `src/data/baseConocimiento.js` — Base de conocimiento y reglas Prolog usadas por el motor de inferencia.
- `src/data/explicaciones.js` — Información detallada (pasos, herramientas, videos) para cada componente.
- `src/utils/extraerSintoma.js` — Mapea texto libre a síntomas canónicos.
- `src/utils/contienePalabrasProhibidas.js` — Detección de palabras no permitidas.
- `src/utils/tauProlog.js` — Carga de Tau Prolog y su módulo `lists`.
- `src/styles/global.css` — Tokens de color y estilos globales.
- `src/components/*` — Componentes visuales (BuscadorSintoma, SelectorSintomas, ListaDiagnosticos, DetalleDiagnostico, BadgeUrgencia).
- `index.html` — Punto de entrada de la app.

Dependencias
- Dependencias de producción (definidas en `package.json`):
  - react ^19
  - react-dom ^19
  - gsap ^3 y @gsap/react ^2 (para animaciones)
  - tau-prolog ^0.3.4 (motor de inferencia)
- Dependencias de desarrollo:
  - vite ^8 (dev server / build)
  - @vitejs/plugin-react
  - eslint y plugins relacionados

Requisitos
- Node.js 20.19 o superior (requisito de Vite 8).

Instalación y ejecución
1. Instalar dependencias:

   npm install

2. Ejecutar en desarrollo (con HMR):

   npm run dev

   Esto levanta Vite y abre la app en http://localhost:5173 (u otro puerto que muestre Vite).

3. Generar build para producción:

   npm run build

4. Previsualizar la build:

   npm run preview

5. Ejecutar los tests (Vitest):

   npm run test

   Cubren la extracción de síntomas (incluidas las negaciones), el filtro de lenguaje y la coherencia entre la base de conocimiento, las explicaciones y los síntomas reconocidos.

Notas de uso
- Tau Prolog se empaqueta con la app, así que funciona sin conexión. Su código asigna variables globales implícitas, que fallan en modo estricto (ESM); por eso `src/utils/tauProlog.js` lo evalúa como script clásico en lugar de importarlo directamente.
- La sesión de Prolog se crea una sola vez y las consultas se encolan, porque una sesión de Tau solo atiende una consulta a la vez.

Dónde modificar la lógica o el conocimiento
- Añadir o ajustar hechos y reglas: editar `src/data/baseConocimiento.js`. Los hechos tienen la forma `causa(Componente, Sintoma, Peso)`.
- Añadir/editar explicaciones y pasos: `src/data/explicaciones.js`.
- Ajustar patrones de extracción de lenguaje natural: `src/utils/extraerSintoma.js`.
- Editar lista de palabras prohibidas: `src/data/palabrasProhibidas.js`.

Problemas y solución rápida
- No aparecen resultados después de buscar: compruebe la consola del navegador por errores (por ejemplo, fallos al cargar o parsear la base de conocimiento en Tau Prolog).
- Mensaje de lenguaje no permitido: la búsqueda quedará bloqueada hasta reformular el texto (no se repite la palabra detectada).
- Si necesita ejecutar las consultas Prolog desde un entorno sin `window` (p. ej. SSR), la integración actual no funcionará sin adaptar el motor Prolog a un paquete compatible con Node.

Licencia
Este repositorio no incluye una licencia explícita (compruebe con el autor si necesita una).

Contacto / próximos pasos
- Para mejorar la extracción de lenguaje natural puede integrar librerías de NLP o añadir más patrones en `extraerSintoma.js`.
