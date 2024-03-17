import React, { useEffect, useState } from 'react'
import '../Styles/SolveIt.scss'
import { useParams } from 'react-router-dom'
import CodeEditor from './CodeEditor'
import Output from './Output'
import { Buffer } from 'buffer'
import Confetti from './Confetti'


const SolveIt = () => {

  const { id } = useParams()
  const [correct, setCorrect] = useState(false)
  const [token, setToken] = useState(false)
  const [quesDetails, setQuesDetails] = useState(false)
  const [io, setIo] = useState({
    input: 'console.log("Hello World!")',
    output: 'Run the code to see the output.'
  })

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
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
    getQues()
  }, [])

  const postCode = async () => {
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
    // console.log(token)
    token && setTimeout(() => {
      getOutput(token)
    }, 2000)
  }, [token])

  // setTimeout(()=> {
  //   // getOutput(token)
  //   console.log(decode('SGVsbG8gV29ybGQhCg==\n'))
  // }, 2000)

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
      // console.log(res)
      // const output = decode(res.stdout ? res.stdout : '');
      const output = decode(res.stdout ? res.stdout : '').replace('\n', '')
      // console.log(res, output)
      const compile_output = decode(res.compile_output ? res.compile_output : '');
      const error = decode(res.stderr ? res.stderr : '');

      let final_output = '';
      if (res.status_id !== 3) {
        // our code have some error
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
        console.log(final_output)
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


  return (
    <>
      {
        correct && <Confetti />
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
            </div>
            <div className="right">
              <CodeEditor io={io} setIo={setIo} />
              <button onClick={() => postCode()}>Run</button>
              <Output io={io} />
            </div>
          </div>
        ) : <h1 className='Loading'>Loading...</h1>
      }
    </>
  )
}

export default SolveIt