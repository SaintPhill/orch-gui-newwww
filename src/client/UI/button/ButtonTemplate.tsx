import React from 'react';
import classNames from 'classnames';

import './button.scss';
import { SvgIcon } from '../../components/SvgIcon';

interface Props {
    svgId?: string
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
}: Props): JSX.Element {
    const btnClass = classNames(
        'button',
        {
            'button_primary': isPrimary,
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
