import React from 'react'
import '../Styles/ProblemCard.scss'
import { ImCross, ImCheckmark, ImArrowRight2 } from "react-icons/im";
import { Link } from 'react-router-dom'

const ProblemCard = () => {
    return (
        <Link to='/Problem/id' className='ProblemCard'>
            <div className="statusName">
                {
                    <ImCross className='not' /> || 
                    <ImCheckmark className='yes' />
                }
                <p className='id'>1.<span className="name">Two Sum</span></p>
            </div>
            <p className="difficulty">hard</p>
            <button>Solve <ImArrowRight2 /></button>
        </Link>
    )
}

export default ProblemCard