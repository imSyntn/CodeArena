import React, {useContext} from 'react'
import '../Styles/ProblemContainer.scss'
import { topicContext } from '../App'
import ProblemCard from './ProblemCard'

const ProblemContainer = () => {

const {selectedTopic, setSelectedTopic} = useContext(topicContext)

  return (
    <div className='ProblemContainer'>
        <div className="problemTopics">
            {
                new Array(20).fill('String').map((item,index)=>(
                    <button key={index} onClick={()=> setSelectedTopic(item)}>String</button>
                ))
            }
        </div>
        <h1>Topic: <span>{selectedTopic}</span></h1>
        <div className="problemListContainer">
            {
                new Array(20).fill(' ').map((item,index)=> (
                    <ProblemCard key={index} />
                ))
            }
        </div>
    </div>
  )
}

export default ProblemContainer