import './card.css'
import { useState } from 'react'

interface CardProps {
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

function Card({
  url,
  status,
  episodes,
  title,
  score,
  scored_by,
  rank,
  genres,
  synopsis
}: CardProps): React.JSX.Element {
  const [flipped, setFlipped] = useState(false)
  const MAX_GENRES = 2
  const visibleGenres = genres.slice(0, MAX_GENRES)
  const hiddenCount = genres.length - MAX_GENRES

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleFlip = () => setFlipped((f) => !f)

  return (
    <div
      className={`cardAnime card-flip${flipped ? ' is-flipped' : ''}`}
      onClick={handleFlip}
      tabIndex={0}
    >
      <div className="card-flip-inner">
        {/* FRONT */}
        <div className="card-flip-face card-flip-front">
          <div className="cardCover">
            <img className="coverImg" src={url} alt={title} />
          </div>
          <div className="cardContent">
            <div className="chip-animeStatus">
              <span>{status}</span>
            </div>
            <div className="cardEpisodes">
              <small>{episodes} episodes</small>
            </div>
            <p className="cardTitle">{title}</p>
            <div className="card-score-ranking">
              <div className="card-score">
                <div className="cardScore">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="tabler-icon tabler-icon-star "
                  >
                    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
                  </svg>
                  {score}
                </div>
                <small className="smallUsers"> {scored_by} users</small>
              </div>
              <div className="card-ranking">
                <div className="cardRanking">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="tabler-icon tabler-icon-hash "
                  >
                    <path d="M5 9l14 0"></path>
                    <path d="M5 15l14 0"></path>
                    <path d="M11 4l-4 16"></path>
                    <path d="M17 4l-4 16"></path>
                  </svg>
                  {rank}
                </div>
                <small className="smallRanking">ranking</small>
              </div>
            </div>
            <div className="cardGenre">
              {visibleGenres.map((genre, idx) => (
                <div className="chip-genre" key={idx}>
                  <span>{genre.name}</span>
                </div>
              ))}
              {hiddenCount > 0 && (
                <div className="chip-genre chip-genre-more" tabIndex={0}>
                  <span>+{hiddenCount}</span>
                  <div className="chip-genre-tooltip">
                    {genres.slice(MAX_GENRES).map((genre, idx) => (
                      <div className="chip-genre-tooltip-item" key={idx}>
                        {genre.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* BACK */}
        <div className="card-flip-face card-flip-back">
          <div className="cardSynopsis">
            <h4>Sinopsis</h4>
            <p>{synopsis}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Card
