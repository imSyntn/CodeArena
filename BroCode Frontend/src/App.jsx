import { useState, createContext } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Components/Home'
import ProblemContainer from './Components/ProblemContainer'
import SolveIt from './Components/SolveIt'

export const topicContext = createContext()

function App() {
  const [selectedTopic, setSelectedTopic] = useState('All')

  return (
    <BrowserRouter>
      <topicContext.Provider value={{selectedTopic, setSelectedTopic}}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Problems' element={<ProblemContainer />} />
          <Route path='/Problem/:id' element={<SolveIt />} />
        </Routes>
      </topicContext.Provider>
    </BrowserRouter>
  )
}

export default App
