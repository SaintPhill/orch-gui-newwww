import React from 'react';
import classnames from 'classnames';

import sprite from '../../images/sprite.svg';
import './SvgIcon.scss';

export enum SpriteId {
    tricolor = 'tricolor',
    iflex = 'iflex',
    logout = 'logout',
    arrowLeft = 'arrow-left',
    burger = 'burger',
    clearIndicator = 'clear-indicator',
    blackCruce = 'black-cruce',
    update = 'update',
    checkbox = 'checkbox',
    plus = 'plus',
    minus = 'minus',
    alert = 'alert',
    menu = 'menu',
    success = 'success',
    empty = '',
}

interface Props {
    spriteId: SpriteId
    className?: string
    onClick?(): void
    onMouseEnter?(): void
}

export function SvgIconTemplate({ spriteId, className, onClick, onMouseEnter }: Props): JSX.Element {
    const ROOT_CLASS = 'svg-icon';
    const iconClassName = classnames(
        ROOT_CLASS,
        {
            [`${className}`]: Boolean(className),
        }
    );

    return (
        <svg onMouseEnter={onMouseEnter} className={iconClassName} onClick={onClick}>
            <use
                xlinkHref={`${sprite}#${spriteId}`}
            />
        </svg>
    );
}
