import React from 'react';
import classnames from 'classnames';

import { Button } from '../Button';
import { ButtonTheme } from '../Button/ButtonTemplate';
import { Popup } from '../Popup';
import { ChangeStatusPopupItem } from './ChangeStatusPopupItem';
import { ConfirmPopup } from '../ConfirmPopup';
import './ChangeStatusPopup.scss';

interface Props {
    selectedStatus: string
    isConfirmPopupVisible: boolean
    statuses: string[]
    closeItSelf(): void
    selectStatus(status: string): void
    openConfirmPopup(): void
    closeConfirmPopup(): void
    confirmStatusChange(): void
}

export function ChangeStatusPopupTemplate({
    selectedStatus,
    statuses,
    closeConfirmPopup,
    isConfirmPopupVisible,
    selectStatus,
    openConfirmPopup,
    confirmStatusChange,
    closeItSelf,
}: Props): JSX.Element {
    const ROOT_CLASS = 'change-status-popup';

    const popupClass = classnames(
        ROOT_CLASS,
        {
            [`${ROOT_CLASS}_stretched`]: isConfirmPopupVisible,
        }
    );

    return (
        <Popup closeItSelf={closeItSelf}>
            <div className={popupClass}>
                <h1 className={`${ROOT_CLASS}__title`}>Изменить статус</h1>
                <ul className={`${ROOT_CLASS}__status-list`}>
                    {statuses && statuses.map((status, index) =>
                        <ChangeStatusPopupItem
                            key={index}
                            selectStatus={selectStatus}
                            selectedStatus={selectedStatus}
                            status={status}
                        />
                    )}
                </ul>
                <div className={`${ROOT_CLASS}__dividing-line`} />
                <Button
                    onClick={openConfirmPopup}
                    isDisabled={!selectedStatus}
                    theme={ButtonTheme.blue}
                    className={`${ROOT_CLASS}__confirm-button`}
                >
                    Применить
                </Button>
            </div>

            {isConfirmPopupVisible &&
                <ConfirmPopup
                    closeItSelf={closeConfirmPopup}
                    onOkButtonClick={confirmStatusChange}
                />
            }
        </Popup>
    );
}
