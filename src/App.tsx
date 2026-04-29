import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Moodpage from './Moodpage'
import Searchpage from './Searchpage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='movies/:mood' element={<Moodpage/>}/>
      <Route path='movies/search' element={<Searchpage/>}/>
    </Routes>
  )
}

export default App
