import styles from './SongPreview.module.css'

/**
 * SongPreview — the hover/active overlay on a Song card.
 * Purely visual: actual audio is handled by App via MiniPlayer.
 */
export default function SongPreview({ visible, isPlaying, hasPreview }) {
  if (!visible) return null

  return (
    <div className={`${styles.overlay} ${isPlaying ? styles.overlayPlaying : ''}`}>
      {hasPreview ? (
        isPlaying ? (
          /* Animated bars — now playing */
          <div className={styles.bars}>
            <span className={styles.bar} style={{ '--d': '0s'   }} />
            <span className={styles.bar} style={{ '--d': '0.1s' }} />
            <span className={styles.bar} style={{ '--d': '0.2s' }} />
            <span className={styles.bar} style={{ '--d': '0.05s'}} />
            <span className={styles.bar} style={{ '--d': '0.15s'}} />
          </div>
        ) : (
          /* Play button */
          <div className={styles.playBtn} aria-label="Preview">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )
      ) : (
        <p className={styles.noPreview}>No preview available</p>
      )}
    </div>
  )
}
