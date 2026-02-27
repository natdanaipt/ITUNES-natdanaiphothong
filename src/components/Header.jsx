import styles from './Header.module.css'

const NAV = [
  { label: 'Music',      query: 'top hits music' },
  { label: 'Podcasts',   query: 'podcast' },
  { label: 'Audiobooks', query: 'audiobook' },
  { label: 'TV & Movies',query: 'movie soundtrack' },
]

export default function Header({ onSearch, activePage, onHome }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Logo — คลิกกลับหน้าแรก */}
        <button className={styles.logo} onClick={onHome} aria-label="Home">
          <div className={styles.logoIcon}>♫</div>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>iTUNES</span>
            <span className={styles.logoSub}>MUSIC SEARCH</span>
          </div>
        </button>

        {/* Nav links */}
        <nav className={styles.nav}>
          {NAV.map(({ label, query }) => (
            <button
              key={label}
              className={`${styles.navLink} ${activePage === label ? styles.active : ''}`}
              onClick={() => onSearch(query, label)}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
