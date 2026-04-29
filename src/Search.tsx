import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Search(){
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>('');
    const searchMovie = (e: React.FormEvent<HTMLFormElement>) => { //you have to say the type of event e is
        e.preventDefault();
        navigate(`/movies/search?query=${encodeURIComponent(search)}`)
    }
    return(
            <form onSubmit={searchMovie} className="flex flex-row justify-center">
                <input type = 'text' className="flex-1 bg-white px-4 font-main sm:max-w-[300px] md:max-w-[80%] lg:max-w-[90%]" placeholder="Search for a movie" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setSearch(e.target.value)}/>
                <button type = 'submit' aria-label="click to search for movie" className="py-4 px-2 rounded-r-sm bg-red-600 text-white text-bold text-sm cursor-pointer uppercase cursor-pointer">Search</button>
            </form>
    )
}