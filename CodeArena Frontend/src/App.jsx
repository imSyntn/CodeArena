import { useState, createContext, useEffect, lazy, Suspense } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Components/Home'
const ProblemContainer = lazy(()=> import('./Components/ProblemContainer'))
const SolveIt = lazy(()=> import('./Components/SolveIt'))
const Contest = lazy(()=> import('./Components/Contest'))
const PageNotExist = lazy(()=> import('./Components/PageNotExist'))

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
          <Route path='/Problems' element={<Suspense><ProblemContainer /></Suspense>} />
          <Route path='/Problems/:id' element={<Suspense><SolveIt /></Suspense>} />
          <Route path='/Contest' element={<Suspense><Contest /></Suspense>} />
          <Route path='*' element={<Suspense><PageNotExist /></Suspense>} />
        </Routes>
      </topicContext.Provider>
    </BrowserRouter>
  )
}

export default App
