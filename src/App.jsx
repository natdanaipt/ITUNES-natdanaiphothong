import { useState, useRef } from 'react'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import SearchForm from './components/SearchForm'
import Song from './components/Song'

/* ─── Mini Player ─── */
const MiniPlayer = ({ track, onClose }) => {
  const audioRef = useRef(null)
  return (
    <div className="mini-player">
      <img className="mini-player__art" src={track.artworkUrl100} alt={track.trackName} />
      <div className="mini-player__info">
        <p className="mini-player__title">{track.trackName}</p>
        <p className="mini-player__artist">{track.artistName}</p>
      </div>
      <div className="mini-player__bars">
        <div className="mini-player__bar" />
        <div className="mini-player__bar" />
        <div className="mini-player__bar" />
        <div className="mini-player__bar" />
      </div>
      <audio ref={audioRef} src={track.previewUrl} autoPlay />
      <button className="mini-player__close" onClick={onClose} title="Close">✕</button>
    </div>
  )
}

const Loading = () => (
  <div className="loading-wrap">
    <div className="spinner" />
    <p>Searching iTunes...</p>
  </div>
)

const NoResults = ({ term }) => (
  <div className="no-results">
    <div className="no-results-icon">🎵</div>
    <h3>No results for &ldquo;{term}&rdquo;</h3>
    <p>Try a different artist, song, or album name.</p>
  </div>
)

/* ─── App ─── */
export default function App() {
  const [songs, setSongs]           = useState([])
  const [query, setQuery]           = useState('')
  const [searched, setSearched]     = useState(false)
  const [loading, setLoading]       = useState(false)
  const [nowPlaying, setNowPlaying] = useState(null)
  const [activePage, setActivePage] = useState(null)

  // label คือชื่อ nav ที่กด เช่น "Music", "Podcasts"
  const handleSearch = async (term, label = null) => {
    setQuery(term)
    setSearched(true)
    setLoading(true)
    setNowPlaying(null)
    setActivePage(label)
    try {
      const res  = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=24`
      )
      const data = await res.json()
      setSongs(data.results ?? [])
    } catch {
      setSongs([])
    } finally {
      setLoading(false)
    }
  }

  // กดโลโก้ → กลับหน้าแรก
  const handleHome = () => {
    setSearched(false)
    setSongs([])
    setQuery('')
    setActivePage(null)
    setNowPlaying(null)
  }

  const handlePreview = (song) => {
    if (!song.previewUrl) return
    setNowPlaying(prev => prev?.trackId === song.trackId ? null : song)
  }

  return (
    <div className="app">
      <Header
        onSearch={handleSearch}
        onHome={handleHome}
        activePage={activePage}
      />

      <main className="main-content">
        <SearchForm onSearch={handleSearch} />

        {!searched ? (
          <Home onSearch={handleSearch} />
        ) : loading ? (
          <Loading />
        ) : songs.length === 0 ? (
          <NoResults term={query} />
        ) : (
          <>
            <div className="results-header">
              <p className="results-title">
                <strong>{songs.length} results</strong> for &ldquo;{query}&rdquo;
              </p>
            </div>
            <div className="results-grid">
              {songs.map(song => (
                <Song
                  key={song.trackId}
                  song={song}
                  isPlaying={nowPlaying?.trackId === song.trackId}
                  onPreview={handlePreview}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {nowPlaying && (
        <MiniPlayer track={nowPlaying} onClose={() => setNowPlaying(null)} />
      )}
    </div>
  )
}
