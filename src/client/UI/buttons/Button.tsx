 import React from 'react'
 import classNames from 'classnames'

import './button.scss'

type ButtonProps = {
    isPrimary: boolean,
    children: string,
    onClick(): void,
}

export const Button: React.FC<ButtonProps> = ({ isPrimary, children, onClick }) => {
    const btnClass = classNames(
        'button',
        {
            'button_primary': isPrimary
        }
    )

    return (
        <button
            onClick={onClick}
            className={btnClass}
        >
            {children}
        </button>
    )
}


