import React from 'react';

import { ConfirmPopupTemplate } from './ConfirmPopupTemplate';

interface Props {
    onOkButtonClick(): void
    closeItSelf(): void
}

export function ConfirmPopupBehavior({
    closeItSelf,
    onOkButtonClick,
}: Props): JSX.Element {
    function onClick(): void {
        onOkButtonClick();
    }

    return React.createElement(ConfirmPopupTemplate, {
        closeItSelf,
        onClick,
    });
}
