import React, { useContext, useEffect, useState } from 'react'
import '../Styles/ProblemContainer.scss'
import { topicContext } from '../App'
import ProblemCard from './ProblemCard'

const ProblemContainer = () => {

    const { selectedTopic, setSelectedTopic } = useContext(topicContext)
    const [topics, setTopics] = useState(false)
    const [questions, setQuestions] = useState(false)
    const [topicQuestions, setTopicQuestions] = useState(false)

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const req = await fetch('http://localhost:8000/topics')
                const res = await req.json()
                setTopics(res)
            } catch (error) {
                console.log(error)
            }
        }
        const fetchQuestions = async () => {
            try {
                const req = await fetch('http://localhost:8000/Questions')
                const res = await req.json()
                setQuestions(res)
                // console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
        fetchTopics()
        fetchQuestions()
    }, [])

    useEffect(() => {
        if (selectedTopic === 'All') {
            setTopicQuestions(false)
        } 
        else {
            const ques = questions.filter(item=> item.topic.find((item)=> item == selectedTopic))
            setTopicQuestions(ques)
        }
    },[selectedTopic])

    return (
        <div className='ProblemContainer'>
            <div className="problemTopics">
                <button onClick={() => setSelectedTopic('All')}>All</button>
                {
                    topics && topics.map((item, index) => (
                        <button key={index} onClick={() => setSelectedTopic(item)}>{item}</button>
                    ))
                }
            </div>
            <h1>Topic: <span>{selectedTopic}</span></h1>
            <div className="problemListContainer">
                {
                    questions && (
                        (!topicQuestions) ? (
                            questions.map((item) => (
                                <ProblemCard key={item.id} id={item.id} question={item.question} difficulty={item.difficulty} />
                            ))
                        ) : (
                            (topicQuestions.length>0) ? (
                                topicQuestions.map((item) => (
                                    <ProblemCard key={item.id} id={item.id} question={item.question} difficulty={item.difficulty} />
                                ))
                            ) : <p>Questions will be added Soon...</p>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default ProblemContainer