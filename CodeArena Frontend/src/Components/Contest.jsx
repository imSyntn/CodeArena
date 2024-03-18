import React, { useEffect, useState } from 'react'
import '../Styles/Contest.scss'
import { FaCrown } from "react-icons/fa";

const Contest = () => {
  const [data, setData] = useState([])

  useEffect(()=>{
    const getResults = async()=>{
      const req = await fetch('http://localhost:8000/contestResults')
      const res = await req.json()
      res.sort((a,b)=> Number(a.time) - Number(b.time))
      console.log(res)
      setData(res)
    }
    getResults()
  },[])
  return (
    <div className='Contest'>
      <h1>LeaderBoard</h1>
      <div className="results">
        {
          data.map((item, index) => (
            <div className="result" key={index}>
              <div className='nameCrown'>
                <h2>{index + 1} <span>{item.name}</span></h2>
                {
                  (index + 1 <= 3) && <FaCrown style={(index+1 == 1)? {fill: '#ffbd03'} : (index+1 == 2)? {fill: '#ff7e3e'} : {fill: 'silver'} } />
                }
              </div>
              <p>Time Taken: {item.time}ms</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Contest