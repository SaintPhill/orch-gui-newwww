import React from 'react'
import sprite from '../../images/logos/sprite.svg'
import './SvgIcon.scss'

import classnames from 'classnames'

interface Props {
    spriteId: string,
    className: string
}


export function SvgIconTemplate({ spriteId, className }: Props) {
    const ROOT_CLASS = 'svg-icon'
    const iconClassName = classnames(
        ROOT_CLASS,
        {
            [`${className}`]: !!className,
        }
    )

    return (
        <svg className={iconClassName}>
            <use
                xlinkHref={`${sprite}#${spriteId}`}
            />
        </svg>
    )
}