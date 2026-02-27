import styles from './Home.module.css'

const GENRES = [
  { label: 'Pop',        emoji: '🎤' },
  { label: 'Rock',       emoji: '🎸' },
  { label: 'Hip-Hop',    emoji: '🎧' },
  { label: 'Electronic', emoji: '🎛️' },
  { label: 'Jazz',       emoji: '🎷' },
  { label: 'Classical',  emoji: '🎻' },
  { label: 'R&B',        emoji: '🎶' },
  { label: 'Country',    emoji: '🤠' },
  { label: 'K-Pop',      emoji: '⭐' },
  { label: 'Indie',      emoji: '🌿' },
]

const FEATURES = [
  { icon: '🎵', title: '30-Second Previews',  desc: 'Listen before you commit' },
  { icon: '🎨', title: 'Album Artwork',        desc: 'Beautiful high-res covers' },
  { icon: '⚡', title: 'Instant Results',      desc: 'Powered by iTunes API' },
  { icon: '🌍', title: '20M+ Tracks',          desc: 'Global music catalog' },
]

export default function Home({ onSearch }) {
  return (
    <section className={styles.section}>
      {/* Hero */}
      <div className={styles.hero}>
        <p className={styles.eyebrow}>30 MILLION SONGS — ALL IN ONE PLACE</p>
        <h2 className={styles.heading}>
          Discover the music<br />
          <span className={styles.gradient}>you&rsquo;ll love.</span>
        </h2>
        <p className={styles.lead}>
          Search the full iTunes catalog. Preview tracks, explore artists,
          and find your next favourite song — instantly.
        </p>
      </div>

      {/* Genre chips */}
      <div className={styles.genreBlock}>
        <p className={styles.genreLabel}>Browse by genre</p>
        <div className={styles.chips}>
          {GENRES.map(({ label, emoji }) => (
            <button
              key={label}
              className={styles.chip}
              onClick={() => onSearch(label)}
            >
              <span>{emoji}</span> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Feature cards */}
      <div className={styles.features}>
        {FEATURES.map(f => (
          <div key={f.title} className={styles.featureCard}>
            <span className={styles.featureIcon}>{f.icon}</span>
            <p className={styles.featureTitle}>{f.title}</p>
            <p className={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
