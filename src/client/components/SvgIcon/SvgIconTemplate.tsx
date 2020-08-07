import React from 'react';
import classnames from 'classnames';

import sprite from '../../images/sprite.svg';
import './SvgIcon.scss';

interface Props {
    spriteId: string
    className?: string
}


export function SvgIconTemplate({ spriteId, className }: Props): JSX.Element {
    const ROOT_CLASS = 'svg-icon';
    const iconClassName = classnames(
        ROOT_CLASS,
        {
            [`${className}`]: !!className,
        }
    );

    return (
        <svg className={iconClassName}>
            <use
                xlinkHref={`${sprite}#${spriteId}`}
            />
        </svg>
    );
}
