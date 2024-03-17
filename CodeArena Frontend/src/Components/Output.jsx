import React from 'react'
import '../Styles/Output.scss'

const Output = ({ io }) => {
    return (
        <textarea name="output" id="output" disabled value={io.output}></textarea>
    )
}

export default Output