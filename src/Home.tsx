import { useState } from "react"
import Moodbutton from "./Moodbutton"
import Logo from "./assets/MOVIEMOOD.png"
import Footer from "./Footer"

export default function Home() {
  const [moods] = useState<string[]>([
    "Funny",
    "Romantic",
    "Thrilling",
    "Dramatic",
    "Entertaining",
    "Inspiring",
    "Action",
    "Adventure",
    "Chill",
    "Dark",
    "Emotional",
    "Feel Good",
    "Heartwarming",
    "Scary",
    "Mystery",
    "Fantasy",
    "Epic",
    "Motivational",
    "Sad",
    "Happy",
    "Suspenseful",
    "Mind-blowing",
    "Classic",
    "Family",
    "Animated",
  ])

  return (
    <div className="w-full min-h-screen bg-black flex flex-col p-2">
      <header className="w-full bg-black p-6">
        <img src={Logo} className="w-[100px]" />
      </header>

      <main className="flex-1">
        <section className="w-full flex flex-col justify-center items-center p-4">
          <h1 className="font-main text-white text-5xl text-center py-2 font-sans font-bold pb-4">
            Find something to match your mood
          </h1>
          <p className="text-white text-center font-main">
            I feel like watching…
          </p>
        </section>

        <section className="font-main w-full max-w-6xl mx-auto flex flex-wrap flex-row justify-center items-center p-4 gap-4">
          {moods.map((mood) => (
            <Moodbutton key={mood} mood={mood} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}