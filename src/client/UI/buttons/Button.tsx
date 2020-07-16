import React from 'react'
import './button.scss'

type ButtonProps = {
    trait: string,
    children: string
}

export const Button: React.FC<ButtonProps> = ({ trait, children, ...props }) => {
  return (
    <button
      {...props}
      className={`button 
        ${trait === 'primary' && 'button--primary'}`
    }
    >
      {children}
    </button>
  )
}


