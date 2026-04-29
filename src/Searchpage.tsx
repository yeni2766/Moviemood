import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorComponent from "./ErrorComponent";
import MovieCard from "./MovieCard";
type Movies = {
    id:number,
    title:string,
    original_title: string,
    release_date: string,
    overview:string,
    releaseDate:string,
    vote_average:number,
    poster_path:string | null
}

type MovieResponse = {
    results:Movies[];
}
export default function Searchpage(){
    const [movies,setMovies] = useState<Movies[]>([]);
    const [loading, isLoading] = useState<boolean>(false);
    const [error, setError] = useState<string|null>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const apiKey = import.meta.env.VITE_TMDB_API_KEY; //this is used to import the api key
    const cleanQuery = query?.trim();

    if (!cleanQuery) return <p>No query found</p>
    useEffect(() => {
    setActiveIndex(0);
    }, [query])

    useEffect(()=>{
        const fetchData = async () => {
            if(!cleanQuery) return;
            try{
                isLoading(true);
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&query=${encodeURIComponent(cleanQuery)}`);
                if(!response.ok){
                    throw new Error('Error fetching query');
                }
                const data:MovieResponse = await response.json();//each response needs a type to let typescript know what to expect
                const sorted = data.results.sort((a, b) => {
                    const aMatch = a.title.toLowerCase().includes(cleanQuery.toLowerCase());//we create our own conditions so that we base the title on how close it matches the query
                    const bMatch = b.title.toLowerCase().includes(cleanQuery.toLowerCase());
                    return Number(bMatch) - Number(aMatch); //we use number to turn the boolean result to a number
                })
                setMovies(sorted) //this is to sort out the search query 
            }catch(err){//this is based of the throw new error that i've used
                if(err instanceof Error){//instanceof Error checks that err is a real Error object so you can safely access err.message
                    setError(err.message)
                }
            }finally{
                isLoading(false);
            }
        }
        fetchData()

    },[cleanQuery])

    const activeMovie = movies[activeIndex];

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-black flex justify-center items-center">
        <div className="w-15 h-15 rounded-full border-4 border-red-500 border-t-white animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <ErrorComponent error={error}/>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="w-full min-h-screen bg-black flex justify-center items-center">
        <p className="text-white">No searches found</p>
      </div>
    )
  }

   return (
      <MovieCard
  activeMovie={activeMovie}
  onPrev={() =>
    setActiveIndex((prev) =>
      prev === 0 ? movies.length - 1 : prev - 1
    )
  }
  onNext={() =>
    setActiveIndex((prev) => (prev + 1) % movies.length)
  }
/>
    )


}