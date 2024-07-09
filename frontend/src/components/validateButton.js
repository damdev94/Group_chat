import React from 'react'
import { Link } from 'react-router-dom'
import '../css/components/validateButton.scss'

function ValidateButton({text}) {
  return (
    <div className='validate-button'>
      <div > {text} </div>
    </div>
  )
}

export default ValidateButton
