import React from 'react';
import { Spin } from 'antd';

import { ProcessStep } from '../../../store/types/filtersOptionsTypes';
import { MoveToStepPopupRow } from './MoveToStepPopupRow';
import { Button } from '../Button';
import { ButtonTheme } from '../Button/ButtonTemplate';
import { Popup } from '../Popup';
import { ConfirmPopup } from '../ConfirmPopup';
import './MoveToStepPopup.scss';

interface Props {
    selectedStep: string
    steps: ProcessStep[] | null
    isConfirmPopupVisible: boolean
    openConfirmPopup(): void
    closeConfirmPopup(): void
    selectStep(stepAlias: string): void
    confirmStepChange(): void
    closeItSelf(): void
}

export function MoveToStepPopupTemplate({
    selectedStep,
    steps,
    isConfirmPopupVisible,
    openConfirmPopup,
    closeConfirmPopup,
    selectStep,
    confirmStepChange,
    closeItSelf,
}: Props): JSX.Element {
    const ROOT_CLASS = 'move-to-step-popup';

    return (
        <Popup closeItSelf={closeItSelf}>
            <div className={ROOT_CLASS}>
                <h1 className={`${ROOT_CLASS}__title`}>Перевести на шаг</h1>
                <div className={`${ROOT_CLASS}__table-wrapper`}>
                    {steps ?
                        <table>
                            <tbody>
                                {steps && steps.map((step, index) =>
                                    <MoveToStepPopupRow
                                        key={index}
                                        selectStep={selectStep}
                                        selectedStep={selectedStep}
                                        step={step}
                                    />
                                )}
                            </tbody>
                        </table> : <Spin className={`${ROOT_CLASS}__spinner`} size={'large'} />
                    }
                </div>
                <div className={`${ROOT_CLASS}__dividing-line`} />
                <Button
                    onClick={openConfirmPopup}
                    isDisabled={!selectedStep}
                    theme={ButtonTheme.blue}
                    className={`${ROOT_CLASS}__confirm-button`}
                >
                    Применить
                </Button>
            </div>
            {isConfirmPopupVisible &&
                <ConfirmPopup
                    closeItSelf={closeConfirmPopup}
                    onOkButtonClick={confirmStepChange}
                />
            }
        </Popup>
    );
}
