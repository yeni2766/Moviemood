import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import MovieCard from "./MovieCard";

type MoodParams = {
  mood: string;
};

type Movie = {
  id: number;
  original_title: string;
  release_date: string;
  title: string;
  overview: string;
  vote_average: number;
  poster_path: string | null;
};

type MovieResponse = {
  results: Movie[];
};

export default function MoodPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

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
  };

  const { mood } = useParams<MoodParams>();

  if (!mood) return <p>No mood found</p>;

  const genreId = moodToGenre[mood.toLowerCase()];

  useEffect(() => {
    setActiveIndex(0);
  }, [genreId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!genreId) {
          setError("Invalid mood");
          setMovies([]);
          return;
        }

        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
        );

        if (!response.ok) {
          throw new Error("Error fetching movies");
        }

        const data: MovieResponse = await response.json();
        setMovies(data.results);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong while fetching movies");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [genreId, apiKey]);

  const activeMovie = movies[activeIndex];

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  if (movies.length === 0) {
    return (
      <div className="w-full min-h-screen bg-black flex justify-center items-center">
        <p className="text-white">No movies found</p>
      </div>
    );
  }

  return (
    <MovieCard
      activeMovie={activeMovie}
      onPrev={() =>
        setActiveIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1))
      }
      onNext={() => setActiveIndex((prev) => (prev + 1) % movies.length)}
    />
  );
}
