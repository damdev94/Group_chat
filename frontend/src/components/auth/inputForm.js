import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../css/components/auth/inputForm.scss'

function InputForm({type, placeholder, value, onChange, icon}) {
  return (
    <div>
      <div className='input'>
      {icon && <FontAwesomeIcon icon={icon} />}
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </div>
    </div>
  )
}

export default InputForm
