import React from 'react';
import classNames from 'classnames';

import { SvgIcon } from '../SvgIcon';
import { SpriteId } from '../SvgIcon/SvgIconTemplate';
import './Button.scss';

export enum ButtonTheme {
    blue = 'blue',
    white = 'white',
}

interface Props {
    svgId?: SpriteId
    theme?: ButtonTheme
    className?: string
    children?: React.ReactNode
    isDisabled?: boolean
    onClick?(
        event?: React.MouseEvent<HTMLElement>
        | React.FormEvent<HTMLFormElement>,
    ): void
}

export function ButtonTemplate({
    children,
    onClick,
    svgId,
    className,
    theme,
    isDisabled,
}: Props): JSX.Element {
    const ROOT_CLASS = 'button';
    const btnClass = classNames(
        ROOT_CLASS,
        {
            [`${className}`]: !!className,
            [`${className}_disabled`]: !!className && isDisabled,
            [`${ROOT_CLASS}_theme-${theme}`]: !!theme,
            [`${ROOT_CLASS}_theme-${theme}_disabled`]: isDisabled && theme,
        }
    );

    return (
        <button disabled={isDisabled} className={btnClass} onClick={onClick}>
            {children}
            {svgId &&
                <SvgIcon
                    spriteId={svgId}
                    className={`${className?.split(' ')[0]}-icon`}
                />
            }
        </button>
    );
}
