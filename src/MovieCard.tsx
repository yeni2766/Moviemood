type Movie = {
  id: number
  original_title: string
  release_date: string
  title: string
  overview: string
  vote_average: number
  poster_path: string | null
}

type Props = {
  activeMovie: Movie
  onPrev: () => void //this basically means onPrev is a function and it does not return anything back, we are just updating state
  onNext: () => void
}

export default function MovieCard({ activeMovie, onPrev, onNext }: Props) {
  const formattedDate = activeMovie.release_date 
    ? new Date(activeMovie.release_date).toLocaleDateString()
    : null

  const movieOverview = activeMovie.overview?.trim() //we are using optional chaining to see if it's available to avoid crashing
    ? activeMovie.overview
    : "No description available"

  return (
    <div className="w-full min-h-dvh bg-black flex justify-center items-center font-main p-4">
      <div className="w-[300px] md:w-[340px] transition-opacity duration-500">
        
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
            <p className="text-sm text-white">{formattedDate}</p>
          )}

          <span>⭐ {Number(activeMovie.vote_average.toFixed(2))}</span>

          <p className="text-xs py-4 pr-4 line-clamp-4">
            {movieOverview}
          </p>

          <div className="w-full flex flex-row justify-between pr-2 pt-4 text-white">
            <button
              className="px-4 py-2 bg-black uppercase cursor-pointer"
              onClick={onPrev}
            >
              Prev
            </button>

            <button
              className="px-4 py-2 bg-black uppercase cursor-pointer transition-all duration-300 ease-in"
              onClick={onNext}
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}