import React, { useEffect, useState } from 'react'
import '../Styles/SolveIt.scss'
import { useParams } from 'react-router-dom'
import CodeEditor from './CodeEditor'
import Output from './Output'
import { Buffer } from 'buffer'
import Confetti from './Confetti'

import { IoMdChatboxes } from "react-icons/io";
import ChatBox from './ChatBox'

const SolveIt = () => {

  const { id } = useParams()
  const [correct, setCorrect] = useState(false)
  const [name, setName] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [timeTaken, setTimeTaken] = useState('_')
  const [token, setToken] = useState(false)
  const [quesDetails, setQuesDetails] = useState(false)
  const [io, setIo] = useState({
    input: 'console.log("Hello World!")',
    output: 'Run the code to see the output.'
  })

  const [openChat, setOpenChat] = useState(false)

  const encode = (str) => {
    return Buffer.from(str, "binary").toString("base64")
  }

  const decode = (str) => {
    return Buffer.from(str, 'base64').toString()
  }

  useEffect(() => {
    const getQues = async () => {
      try {
        const req = await fetch(`http://localhost:8000/Questions/${id}`)
        const res = await req.json()
        setQuesDetails(res)
      } catch (error) {
        console.log(error)
      }
    }
    getQues()
  }, [])

  const postCode = async () => {
    setTimeTaken('_')
    setIo(prev => ({
      ...prev,
      output: 'Testing your code...'
    }))
    try {
      // console.log('ok')
      const req = await fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': 'b2029a726fmsh2e57036bb524346p154c33jsn57fdbeb8163c',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        body: JSON.stringify({
          language_id: 93,
          source_code: encode(io.input),
          stdin: encode('')
        })
      })
      const res = await req.json()
      const token = await res.token
      setToken(token)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    token && setTimeout(() => {
      getOutput(token)
    }, 2000)
  }, [token])

  const getOutput = async (token) => {
    try {
      const req = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true&fields=*`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'b2029a726fmsh2e57036bb524346p154c33jsn57fdbeb8163c',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      })
      const res = await req.json()
      console.log(res)
      const time = new Date(res.finished_at) - new Date(res.created_at)
      setTimeTaken(time)
      // const output = decode(res.stdout ? res.stdout : '');
      const output = decode(res.stdout ? res.stdout : '').replace('\n', '')
      const compile_output = decode(res.compile_output ? res.compile_output : '');
      const error = decode(res.stderr ? res.stderr : '');

      let final_output = '';
      if (res.status_id !== 3) {
        if (compile_output === "") {
          final_output = error;
          setIo(prev => ({
            ...prev,
            output: final_output
          }))
        } else {
          final_output = compile_output;
          setIo(prev => ({
            ...prev,
            output: final_output
          }))
        }
      } else {
        final_output = output;
        setIo(prev => ({
          ...prev,
          output: final_output
        }))
        // if(final_output !== quesDetails.Example.FinalOutputOutput) {
        //   console.log(quesDetails.Example.FinalOutput, final_output, 'Wrong')
        // } else {
        //   console.log('Right')
        // }
      }

    } catch (error) {
      console.log(error)
    }
  }

  const showConfettie = () => {
    setCorrect(true)
    setTimeout(() => {
      setCorrect(false)
    }, 3000)
  }

  const postSubmitResuest = async () => {
    console.log('postSubmitResuest')
    try {
      const req = await fetch('http://localhost:8000/contestAdd', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          time: timeTaken
        })
      })
      const res = await req.json()
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      {
        correct && <Confetti />
      }
      {
        showModal && (
          <div className='nameReq'>
            <input type="text" value={name} placeholder='Enter your name' onChange={(e) => setName(e.target.value)} />
            <button onClick={() => {
              setShowModal(false)
              postSubmitResuest()
            }}>Close</button>
          </div>
        )
      }
      {
        quesDetails ? (
          <div className='SolveIt'>
            <div className="left">
              <h2>{quesDetails.id}.{quesDetails.question}</h2>
              <div className="type">
                <p>{quesDetails.difficulty}</p>
                {
                  quesDetails.topic.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))
                }
              </div>
              <p className="descriptiion">{quesDetails.description}</p>
              <h3 className='example'>Example:</h3>
              <div className="exampleDiv">
                <h4>Input: <span>{quesDetails.Example.Input}</span></h4>
                <h4>Output: <span>{quesDetails.Example.FinalOutput}</span></h4>
                <h4>Explanation: <span>{quesDetails.Example.Explanation}</span></h4>
              </div>
              <p className='oktxt'>If Your output is same then click on Correct.</p>
              <button onClick={showConfettie}>Correct</button>
              {
                <p className='timeTaken'>Time Taken: {timeTaken}ms</p>
              }
              {
                (timeTaken !== '_') && <button onClick={() => {
                  (name == '') ? (setShowModal(true)) : (
                    postSubmitResuest()
                  )
                }}>Submit</button>
              }
            </div>
            <div className="right">
              <CodeEditor io={io} setIo={setIo} />
              <button onClick={() => postCode()}>Run</button>
              <Output io={io} />
            </div>
          </div>
        ) : <h1 className='Loading'>Loading...</h1>
      }
      {
        openChat ? (
          <ChatBox setOpenChat={setOpenChat} />
        ) : (
          <button className='openChatBtn' onClick={()=> setOpenChat(true)}><IoMdChatboxes /></button>
        )
      }
    </>
  )
}

export default SolveIt