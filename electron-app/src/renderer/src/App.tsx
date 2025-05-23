import Card from './components/Card'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

interface AnimeData {
  url: string
  status: string
  episodes: number
  title: string
  score: number
  scored_by: number
  rank: number
  genres: { name: string }[]
  synopsis: string
}

function App(): React.JSX.Element {
  const [animes, setAnimes] = useState<AnimeData[]>([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    axios
      .get(`https://api.jikan.moe/v4/anime?page=${page}&limit=9`)
      .then((res) => {
        setAnimes(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          res.data.data.map((anime: any) => ({
            ...anime,
            url: anime.images.jpg.image_url,
            synopsis: anime.synopsis
          }))
        )
      })
      .catch(() => setAnimes([]))
  }, [page])

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handlePrev = () => setPage((p) => Math.max(1, p - 1))
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleNext = () => setPage((p) => p + 1)

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', margin: '24px 0' }}>
        <button onClick={handlePrev} disabled={page === 1}>
          Anterior
        </button>
        <span style={{ color: '#A1C4F7', fontWeight: 600 }}>Página {page}</span>
        <button onClick={handleNext}>Siguiente</button>
      </div>
      <div className="cards">
        {animes.map((anime, idx) => (
          <Card key={idx} {...anime} />
        ))}
      </div>
    </>
  )
}

export default App
