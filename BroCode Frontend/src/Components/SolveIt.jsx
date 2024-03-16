import React, { useEffect, useState } from 'react'
import '../Styles/SolveIt.scss'
import { useParams } from 'react-router-dom'
import CodeEditor from './CodeEditor'
import Output from './Output'
import { Buffer } from 'buffer'


const SolveIt = () => {

  const { id } = useParams()
  const [token, setToken] = useState(false)
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
      const output = decode(res.stdout ? res.stdout :'').replace('\n', '')
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
      }
      else {
        final_output = output;
        console.log(final_output)
        setIo(prev => ({
          ...prev,
          output: final_output
        }))
      }

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='SolveIt'>
      <div className="left">
        Solve
      </div>
      <div className="right">
        <CodeEditor io={io} setIo={setIo} />
        <button onClick={() => postCode()}>Run</button>
        <Output io={io}/>
      </div>
    </div>
  )
}

export default SolveIt