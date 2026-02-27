import { useState } from 'react'
import styles from './SearchForm.module.css'

export default function SearchForm({ onSearch }) {
  const [term,    setTerm]    = useState('')
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const q = term.trim()
    if (q) onSearch(q)
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={`${styles.inputWrap} ${focused ? styles.focused : ''}`}>
          {/* Search icon */}
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>

          <input
            className={styles.input}
            type="text"
            placeholder="Artist, song, album…"
            value={term}
            onChange={e => setTerm(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoComplete="off"
            spellCheck="false"
          />

          {term && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => setTerm('')}
              tabIndex={-1}
              aria-label="Clear"
            >
              ✕
            </button>
          )}

          <button
            type="submit"
            className={styles.searchBtn}
            disabled={!term.trim()}
          >
            Search
          </button>
        </div>

        {/* Quick suggestions */}
        <div className={styles.suggestions}>
          {['Taylor Swift', 'The Weeknd', 'Dua Lipa', 'Drake', 'Billie Eilish'].map(s => (
            <button
              key={s}
              type="button"
              className={styles.suggestion}
              onClick={() => { setTerm(s); onSearch(s) }}
            >
              {s}
            </button>
          ))}
        </div>
      </form>
    </div>
  )
}
