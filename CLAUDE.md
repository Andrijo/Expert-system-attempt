# Directivas del Proyecto

## Reglas de Commits y Autoría (IMPORTANTE)

- NO agregues firmas, coautorías ni tags de Claude en los mensajes de commit (ej. NUNCA uses `Co-authored-by: Claude <...>`).
- Los mensajes de commit deben ser breves, en presente imperativo y seguir la convención Conventional Commits (ej. `feat: add user login`, `fix: header alignment`).

## Estilo de Código y Buenas Prácticas

- Mantén el código modular, limpio y bien tipado.
- Respeta la arquitectura existente del proyecto antes de proponer cambios estructurales.
- No agregues comentarios innecesarios ni código muerto/comentado.
- Todos los nuevos cambios se tienen que implementar en una nueva rama, nunca en main.

## Comandos Frecuentes

- **Build:** `npm run build`
- **Dev:** `npm run dev`
- **Test:** `npm run test`
- **Linter:** `npm run lint`

## Estructura Esencial del Proyecto

- `src/components/`: Componentes UI reutilizables.
- `src/services/`: Lógica de integración e llamadas a API.
- `src/utils/`: Funciones auxiliares y helpers.
