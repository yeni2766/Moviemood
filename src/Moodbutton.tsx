import { useNavigate } from "react-router-dom"
type Props = {
    mood: string
}
export default function Moodbuttons({mood}:Props){
    const Navigate = useNavigate();
    return(
        <button type = 'button' aria-label="Click to select movie category" className="py-2 px-6 rounded-sm bg-red-600 text-white text-bold text-md cursor-pointer hover:bg-red-700 transition-all duration-300 ease-in" onClick={()=>Navigate(`/movies/${mood.toLowerCase()}`)}>{mood}</button>
    )
}