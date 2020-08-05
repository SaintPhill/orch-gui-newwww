import React from 'react';
import classNames from 'classnames';

import { SvgIcon } from '../SvgIcon';
import './Button.scss';

interface Props {
    svgId?: string
    theme?: string
    isPrimary?: boolean
    className?: string
    children?: React.ReactNode
    onClick?: (
        event?: React.MouseEvent<HTMLElement>
        | React.FormEvent<HTMLFormElement>,
    ) => void
}

export function ButtonTemplate({
    isPrimary,
    children,
    onClick,
    svgId,
    className,
    theme,
}: Props): JSX.Element {
    const ROOT_CLASS = 'button';
    const btnClass = classNames(
        ROOT_CLASS,
        {
            [`${ROOT_CLASS}_theme_${theme}`]: !!theme,
            [`${ROOT_CLASS}_theme_${theme}-primary`]: !!theme && isPrimary,
            [String(className)]: !!className,
        }
    );

    return (
        <button className={btnClass} onClick={onClick}>
            {children}
            {svgId &&
                <SvgIcon
                    spriteId={svgId}
                    className={`${className}-icon`}
                />
            }
        </button>
    );
}
