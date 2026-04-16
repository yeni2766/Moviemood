import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Moodpage from './Moodpage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='movies/:mood' element={<Moodpage/>}/>
    </Routes>
    
  )
}

export default App
