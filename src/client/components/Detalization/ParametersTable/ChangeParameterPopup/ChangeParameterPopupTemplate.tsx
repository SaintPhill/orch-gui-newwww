import React from 'react';

import { Popup } from '../../../../UI/Popup';
import { RequestParameter } from '../../../../../store/types/requestsTypes';
import { Button } from '../../../../UI/Button';
import { ButtonTheme } from '../../../../UI/Button/ButtonTemplate';
import { ConfirmPopup } from '../../../../UI/ConfirmPopup';
import './ChangeParameterPopup.scss';

interface Props {
    parameter: RequestParameter
    parameterValue: string
    isConfirmPopupVisible: boolean
    closeItSelf(): void
    closeConfirmPopup(): void
    openConfirmPopup(): void
    confirmParameterChange(): void
    handleParameterValue(e: React.ChangeEvent<HTMLTextAreaElement>): void
}

export function ChangeParameterPopupTemplate({
    parameter,
    parameterValue,
    handleParameterValue,
    closeItSelf,
    confirmParameterChange,
    isConfirmPopupVisible,
    closeConfirmPopup,
    openConfirmPopup,
}: Props): JSX.Element {
    const ROOT_CLASS = 'change-parameter-popup';

    return (
        <Popup closeItSelf={closeItSelf}>
            <div className={ROOT_CLASS}>
                <div className={`${ROOT_CLASS}-content`}>
                    <h1 className={`${ROOT_CLASS}-content__title`}>Изменение параметров</h1>
                    <div className={`${ROOT_CLASS}-content__row`}>
                        <div className={`${ROOT_CLASS}-content__name`}>ID</div>
                        <div className={`${ROOT_CLASS}-content__value`}>{parameter.id}</div>
                    </div>
                    <div className={`${ROOT_CLASS}-content__row`}>
                        <div className={`${ROOT_CLASS}-content__name`}>Тип параметра</div>
                        <div className={`${ROOT_CLASS}-content__value`}>{parameter.name}</div>
                    </div>
                    <div className={`${ROOT_CLASS}-content__row`}>
                        <div className={`${ROOT_CLASS}-content__name`}>Значение</div>
                        <textarea
                            autoFocus={true}
                            className={`${ROOT_CLASS}-content__value ${ROOT_CLASS}-content__textarea`}
                            value={parameterValue}
                            onChange={handleParameterValue}
                        />
                    </div>
                    <div className={`${ROOT_CLASS}-content__row`}>
                        <div className={`${ROOT_CLASS}-content__name`}>Тип значения</div>
                        <div className={`${ROOT_CLASS}-content__value`}>{parameter.type}</div>
                    </div>
                </div>
                <div className={`${ROOT_CLASS}__dividing-line`} />
                <Button
                    onClick={openConfirmPopup}
                    className={`${ROOT_CLASS}__save-button`}
                    theme={ButtonTheme.blue}
                >
                    Сохранить
                </Button>
            </div>

            {isConfirmPopupVisible &&
                <ConfirmPopup
                    closeItSelf={closeConfirmPopup}
                    onOkButtonClick={confirmParameterChange}
                />
            }
        </Popup>
    );
}
