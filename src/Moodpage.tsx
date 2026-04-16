import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

type MoodParams = {
  mood: string
}

type Movie = {
  id: number
  original_title: string
  release_date: string
  title: string
  overview: string
  vote_average: number
  poster_path: string | null
}

type MovieResponse = {
  results: Movie[]
}

export default function MoodPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const apiKey = import.meta.env.VITE_TMDB_API_KEY

const moodToGenre: Record<string, number> = {
  funny: 35,
  romantic: 10749,
  thrilling: 53,
  dramatic: 18,
  inspiring: 99,
  entertaining: 28,
  action: 28,
  adventure: 12,
  chill: 16,
  dark: 27,
  emotional: 18,
  "feel good": 35,
  heartwarming: 10751,
  scary: 27,
  mystery: 9648,
  fantasy: 14,
  epic: 12,
  motivational: 99,
  sad: 18,
  happy: 35,
  suspenseful: 53,
  "mind-blowing": 878,
  classic: 18,
  family: 10751,
  animated: 16,
}

  const { mood } = useParams<MoodParams>()

  if (!mood) return <p>No mood found</p>

  const genreId = moodToGenre[mood.toLowerCase()]

  useEffect(() => {
    setActiveIndex(0)
  }, [genreId])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!genreId) {
          setError("Invalid mood")
          setMovies([])
          return
        }

        setLoading(true)
        setError(null)

        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
        )

        if (!response.ok) {
          throw new Error("Error fetching movies")
        }

        const data: MovieResponse = await response.json()
        setMovies(data.results)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("Something went wrong while fetching movies")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [genreId, apiKey])

  const activeMovie = movies[activeIndex]

  const formattedDate = activeMovie?.release_date
    ? new Date(activeMovie.release_date).toLocaleDateString()
    : null

  const movieOverview = activeMovie?.overview?.trim()
    ? activeMovie.overview
    : "No description available"

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-black flex justify-center items-center">
        <div className="w-15 h-15 rounded-full border-4 border-red-500 border-t-white animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-black flex justify-center items-center">
        <p className="text-white">{error}</p>
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="w-full min-h-screen bg-black flex justify-center items-center">
        <p className="text-white">No movies found</p>
      </div>
    )
  }

  return (
    <div className="w-full min-h-dvh bg-black flex justify-center items-center font-main p-4">
      <div
        className={`w-[300px] md:w-[340px] transition-opacity duration-500
      `}
      >
        {activeMovie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original${activeMovie.poster_path}`}
            alt={activeMovie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full aspect-[2/3] bg-gray-800 flex justify-center items-center text-white">
            No poster available
          </div>
        )}

        <div className="w-full bg-red-700 text-white pl-2 py-4 font-main">
          <h1>{activeMovie.title}</h1>

          {formattedDate && (
            <p className="text-sm text-white">
              {formattedDate}
            </p>
          )}

          <span>⭐ {Number(activeMovie.vote_average.toFixed(2))}</span>

          <p className="text-xs py-4 pr-4 line-clamp-4">
            {movieOverview}
          </p>

          <div className="w-full flex flex-row justify-between pr-2 pt-4 text-white">
            <button
              className="px-4 py-2 bg-black uppercase cursor-pointer"
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === 0 ? movies.length - 1 : prev - 1
                )
              }
            >
              Prev
            </button>

            <button
              className="px-4 py-2 bg-black uppercase cursor-pointer transition-all duration-300 ease-in"
              onClick={() =>
                setActiveIndex((prev) => (prev + 1) % movies.length)
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}