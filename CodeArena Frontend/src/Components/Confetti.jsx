import React, { useEffect } from 'react'
import '../Styles/Confetti.scss'
import ConfettiGenerator from 'confetti-js'

const Confetti = () => {

    useEffect(() => {
        const confettiSettings = { target: 'my-canvas' };
        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();

        return () => confetti.clear();
    }, [])

    return (
        <canvas id='my-canvas' className='CorrectOrWrong'></canvas>
    )
}

export default Confetti