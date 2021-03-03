import React from 'react';
import classNames from 'classnames';

import './TableStickyHeader.scss';

type Props = {
    children?: React.ReactNode
    isNarrow?: boolean
};

export function TableStickyHeaderTemplate({
    children,
    isNarrow,
}: Props): JSX.Element {
    const ROOT_CLASS = 'table-sticky-header';

    const tableHeadClass = classNames(
        ROOT_CLASS,
        {
            [`${ROOT_CLASS}_narrow`]: isNarrow,
        }
    );

    return (
        <th className={tableHeadClass}>
            {children}
        </th>
    );
}
