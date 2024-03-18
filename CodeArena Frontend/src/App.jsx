import { useState, createContext, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Components/Home'
import ProblemContainer from './Components/ProblemContainer'
import SolveIt from './Components/SolveIt'
import Contest from './Components/Contest'
import PageNotExist from './Components/PageNotExist'

export const topicContext = createContext()

function App() {
  const [selectedTopic, setSelectedTopic] = useState('All')

  useEffect(()=>{
    window.addEventListener('resize',()=> {
      if(window.innerWidth<800) {
        alert('Use a Laptop...')
      }
    })
  },[])

  return (
    <BrowserRouter>
      <topicContext.Provider value={{selectedTopic, setSelectedTopic}}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Problems' element={<ProblemContainer />} />
          <Route path='/Problems/:id' element={<SolveIt />} />
          <Route path='/Contest' element={<Contest />} />
          <Route path='*' element={<PageNotExist />} />
        </Routes>
      </topicContext.Provider>
    </BrowserRouter>
  )
}

export default App
