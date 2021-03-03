import React from 'react';
import classNames from 'classnames';

import './ChangeStatusPopupItem.scss';

interface Props {
    status: string
    selectedStatus: string
    onClick(): void
}

export function ChangeStatusPopupItemTemplate({
    status,
    selectedStatus,
    onClick,
}: Props): JSX.Element {
    const ROOT_CLASS = 'change-status-popup-item';
    const checkboxClass = classNames(
        `${ROOT_CLASS}__checkbox`,
        {
            [`${ROOT_CLASS}__checkbox_selected`]: status === selectedStatus,
        }
    );

    return (
        <li className={ROOT_CLASS} onClick={onClick}>
            <div className={checkboxClass} />
            <p>{status}</p>
        </li>
    );
}
