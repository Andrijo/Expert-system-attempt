import styles from "./BuscadorSintoma.module.css"

export function BuscadorSintoma({ value, onChange, onAnalizar, isLoading }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const valorLimpio = value.trim()
    if (!valorLimpio || isLoading) return
    onAnalizar(valorLimpio)
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
        disabled={isLoading || !value.trim()}
        className={styles.button}>
        {isLoading ? "Analizando…" : "Analizar"}
      </button>
    </form>
  )
}
