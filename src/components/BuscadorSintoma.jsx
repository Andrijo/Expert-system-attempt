import styles from "./BuscadorSintoma.module.css"

export function BuscadorSintoma({
  value,
  onChange,
  onAnalizar,
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
