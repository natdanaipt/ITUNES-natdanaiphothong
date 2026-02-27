import { useState } from 'react'
import SongPreview from './SongPreview'
import styles from './Song.module.css'

const fmt = {
  duration: (ms) => {
    if (!ms) return '--:--'
    const m = Math.floor(ms / 60000)
    const s = Math.floor((ms % 60000) / 1000)
    return `${m}:${s.toString().padStart(2, '0')}`
  },
  price: (p) => (p > 0 ? `$${p.toFixed(2)}` : 'Free'),
}

export default function Song({ song, isPlaying, onPreview }) {
  const [hovered, setHovered] = useState(false)

  const art = song.artworkUrl100?.replace('100x100', '300x300') ?? song.artworkUrl100

  return (
    <article
      className={`${styles.card} ${isPlaying ? styles.playing : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onPreview(song)}
    >
      {/* Artwork + overlay */}
      <div className={styles.artWrap}>
        <img
          className={styles.art}
          src={art}
          alt={`${song.trackName} artwork`}
          loading="lazy"
        />
        <SongPreview
          visible={hovered || isPlaying}
          isPlaying={isPlaying}
          hasPreview={!!song.previewUrl}
        />
        {isPlaying && <div className={styles.playingBadge}>▶ Playing</div>}
      </div>

      {/* Info */}
      <div className={styles.info}>
        <p className={styles.track}>{song.trackName}</p>
        <p className={styles.artist}>{song.artistName}</p>
        <p className={styles.album}>{song.collectionName}</p>

        <div className={styles.meta}>
          <span className={styles.genre}>{song.primaryGenreName}</span>
          <span className={styles.dur}>{fmt.duration(song.trackTimeMillis)}</span>
          {song.trackPrice > 0 && (
            <span className={styles.price}>{fmt.price(song.trackPrice)}</span>
          )}
        </div>
      </div>
    </article>
  )
}
