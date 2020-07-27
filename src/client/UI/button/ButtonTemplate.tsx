import React from 'react';
import './button.scss';

import classNames from 'classnames';

type Props = {
    isPrimary: boolean
    children: string
    onClick: (e: any) => void
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
            type="submit"
            className={btnClass}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
