import React from 'react';
import classNames from 'classnames';

import './TableRow.scss';

type Props = {
    isSelected?: boolean
    isChanged?: boolean
    isCursorPointer?: boolean
    children?: React.ReactNode
    onClick?(): void
};

export function TableRowTemplate({
    isSelected,
    isChanged,
    isCursorPointer,
    children,
    onClick,
}: Props): JSX.Element {
    const ROOT_CLASS = 'table-row';

    const rowClass = classNames(
        ROOT_CLASS,
        {
            [`${ROOT_CLASS}_selected`]: isSelected,
            [`${ROOT_CLASS}_changed`]: isChanged,
            [`${ROOT_CLASS}_cursor-pointer`]: isCursorPointer,
        }
    );

    return (
        <tr className={rowClass} onClick={onClick}>
            {children}
        </tr>
    );
}
