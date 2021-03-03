import React, { useRef } from 'react';
import { PopupTemplate } from './PopupTemplate';
import useOutsideClick from '../../customHooks/useOutsideClick';

interface Props {
    closeItSelf(): void
}

export function PopupBehavior({
    children,
    closeItSelf,
}: React.PropsWithChildren<Props>): JSX.Element {
    const popupContentRef = useRef<HTMLDivElement>(null);
    useOutsideClick(popupContentRef, () => {
        closeItSelf();
    });

    return React.createElement(PopupTemplate, {
        popupContentRef,
        closeItSelf,
    }, children);
}
