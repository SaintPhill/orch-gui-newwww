import React from 'react'
import './button.scss'

import classNames from 'classnames'

type Props = {
    isPrimary: boolean,
    children: string,
    onClick(): void,
}

export function ButtonTemplate({ isPrimary, children, onClick }: Props) {
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