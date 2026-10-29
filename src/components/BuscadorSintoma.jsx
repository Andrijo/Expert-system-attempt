import styles from "./BuscadorSintoma.module.css"

const MAX_LONGITUD = 300

export function BuscadorSintoma({
  value,
  onChange,
  onAnalizar,
  onFocus,
  isLoading,
  puedeAnalizar,
}) {
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!puedeAnalizar || isLoading) return
    onAnalizar()
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        type="text"
        maxLength={MAX_LONGITUD}
        enterKeyHint="search"
        autoComplete="off"
        onFocus={onFocus}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe el síntoma..."
        aria-label="Síntoma a diagnosticar"
        className={styles.input}
      />

      <button
        type="submit"
        disabled={isLoading || !puedeAnalizar}
        className={styles.button}>
        {isLoading ? "Analizando…" : "Analizar"}
      </button>
    </form>
  )
}
