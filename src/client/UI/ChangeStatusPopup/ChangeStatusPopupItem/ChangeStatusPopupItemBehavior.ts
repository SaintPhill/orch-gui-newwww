import React from 'react';

import { ChangeStatusPopupItemTemplate } from './ChangeStatusPopupItemTemplate';

interface Props {
    status: string
    selectedStatus: string
    selectStatus(status: string): void
}

export function ChangeStatusPopupItemBehavior({
    status,
    selectedStatus,
    selectStatus,
}: Props): JSX.Element {
    function onClick(): void {
        selectStatus(status);
    }

    return React.createElement(ChangeStatusPopupItemTemplate, {
        status,
        selectedStatus,
        onClick,
    });
}
