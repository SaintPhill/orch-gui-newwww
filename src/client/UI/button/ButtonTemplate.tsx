import React from 'react'
import './button.scss'

import classNames from 'classnames'

type Props = {
    isPrimary: boolean,
    children: string,
}

export function ButtonTemplate({ isPrimary, children }: Props) {
    const btnClass = classNames(
        'button',
        {
            'button_primary': isPrimary
        }
    )

    return (
        <button
            type='submit'
            className={btnClass}
        >
            {children}
        </button>
    )
}