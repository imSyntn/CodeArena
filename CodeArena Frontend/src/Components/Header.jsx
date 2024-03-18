import React, { useLayoutEffect, useState } from 'react'
import '../Styles/Header.scss'
import { Link } from 'react-router-dom'

const Header = () => {
    const [selected, setSelected] = useState({
      home: true,
      problems: false,
      contest: false,
    })
    useLayoutEffect(()=>{
      let path = window.location.pathname.split('/')[1]
      if(path === 'Problems') setSelected({
          home: false,
          problems: true,
          contest: false,
        })
      if(path === 'Contest') setSelected({
          home: false,
          problems: false,
          contest: true,
        })
    },[])
  return (
    <header>
        <div className="left">
            <Link to='/'><h2 onClick={()=> setSelected({
              home: true,
              problems: false,
              contest: false,
            })}>CodeArena</h2></Link>
            <Link to='/Problems'><p className={selected.problems ? 'selected' : ''} onClick={()=> setSelected({
              home: false,
              problems: true,
              contest: false,
            })}>Problems</p></Link>
            <Link to='/Contest'><p className={selected.contest ? 'selected' : ''} onClick={()=> setSelected({
              home: false,
              problems: false,
              contest: true,
            })}>Contest</p></Link>
        </div>
        <div className="right">
          <button onClick={()=> alert('Only Submit if your output is same as the example.')}>Alert</button>
            {/* <button>Sign Up</button>
            <p>or</p>
            <button>Login</button> */}
        </div>
    </header>
  )
}

export default Header