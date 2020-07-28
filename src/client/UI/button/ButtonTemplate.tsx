import React from 'react';

import classNames from 'classnames';

import './button.scss';

type Props = {
    isPrimary: boolean
    children: string
    onClick: (event: any) => void
};

export function ButtonTemplate({ isPrimary, children, onClick }: Props): JSX.Element {
    const btnClass = classNames(
        'button',
        {
            'button_primary': isPrimary,
        }
    );

    return (
        <button
            className={btnClass}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
