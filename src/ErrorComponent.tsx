type Props = {
    error:string
}
export default function Error({error}: Props){
    return(
        <div className="w-full min-h-screen bg-black flex justify-center items-center">
            <p className="text-white">{error}</p>
        </div>
    )
}