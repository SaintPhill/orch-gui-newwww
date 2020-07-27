import React from 'react';
import classnames from 'classnames';

import sprite from '../../images/logos/sprite.svg';
import './SvgIcon.scss';

interface Props {
    spriteId: string
    className?: string
}


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function SvgIconTemplate({ spriteId, className }: Props) {
    const ROOT_CLASS = 'svg-icon';
    const iconClassName = classnames(
        ROOT_CLASS,
        {
            [`${className}`]: Boolean(className),
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
