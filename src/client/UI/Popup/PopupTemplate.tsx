import React from 'react';

import { SvgIcon } from '../SvgIcon';
import { SpriteId } from '../SvgIcon/SvgIconTemplate';
import './Popup.scss';

interface Props {
    popupContentRef: React.RefObject<HTMLDivElement>
    closeItSelf(): void
}

export function PopupTemplate({
    children,
    closeItSelf,
    popupContentRef,
}: React.PropsWithChildren<Props>): JSX.Element {
    const ROOT_CLASS = 'popup';

    return (
        <div className={ROOT_CLASS}>
            <div ref={popupContentRef} className={`${ROOT_CLASS}__content`}>
                <SvgIcon
                    onClick={closeItSelf}
                    spriteId={SpriteId.blackCruce}
                    className={`${ROOT_CLASS}__close-icon`}
                />
                {children}
            </div>
        </div>
    );
}
