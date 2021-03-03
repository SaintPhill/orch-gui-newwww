import React from 'react';

import { Button } from '../Button';
import { ButtonTheme } from '../Button/ButtonTemplate';
import { Popup } from '../Popup';
import './ConfirmPopup.scss';

interface Props {
    onClick(): void
    closeItSelf(): void
}

export function ConfirmPopupTemplate({
    onClick,
    closeItSelf,
}: Props): JSX.Element {
    const ROOT_CLASS = 'confirm-popup';

    return (
        <Popup closeItSelf={closeItSelf}>
            <div className={ROOT_CLASS}>
                <div>Вы уверены, что хотите сохранить изменения?</div>
                <Button
                    className={`${ROOT_CLASS}__ok-button`}
                    theme={ButtonTheme.blue}
                    onClick={onClick}
                >
                    Ок
                </Button>
            </div>
        </Popup>
    );
}
