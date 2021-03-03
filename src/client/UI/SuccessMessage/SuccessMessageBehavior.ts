import React, { useEffect, useState } from 'react';

import { SuccessMessageTemplate } from './SuccessMessageTemplate';

type Props = {
    blockClass: string
    isShown: boolean
};

export function SuccessMessageBehavior({ blockClass, isShown }: Props): JSX.Element {
    const [isVisible, toggleVisibility] = useState(false);

    useEffect(() => {
        const secondsToHideMessage = 2000;

        if (isShown) {
            toggleVisibility(true);
            setTimeout(() => {
                toggleVisibility(false);
            }, secondsToHideMessage);
        }
    }, [isShown]);


    return React.createElement(SuccessMessageTemplate, {
        isVisible,
        blockClass,
    });
}
