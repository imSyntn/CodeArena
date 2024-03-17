import React from 'react'
import '../Styles/ProblemCard.scss'
import { ImCross, ImCheckmark, ImArrowRight2 } from "react-icons/im";
import { FaDotCircle } from "react-icons/fa";
import { Link } from 'react-router-dom'

const ProblemCard = ({id, question, difficulty}) => {
    return (
        <div className='ProblemCard'>
            <div className="statusName">
                <FaDotCircle />
                {/* {
                    <ImCross className='not' /> || 
                    <ImCheckmark className='yes' />
                } */}
                <p className='id'>{id}.<span className="name">{question}</span></p>
            </div>
            <p className="difficulty">{difficulty}</p>
            <Link to={`/Problems/${id}`}><button>Solve <ImArrowRight2 /></button></Link>
        </div>
    )
}

export default ProblemCard