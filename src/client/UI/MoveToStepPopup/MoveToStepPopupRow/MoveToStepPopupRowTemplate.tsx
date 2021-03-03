import React from 'react';
import classNames from 'classnames';

import { ProcessStep } from '../../../../store/types/filtersOptionsTypes';
import './MoveToStepPopupRow.scss';

interface Props {
    step: ProcessStep
    selectedStep: string
    onClick(): void
}

export function MoveToStepPopupRowTemplate({
    step,
    selectedStep,
    onClick,
}: Props): JSX.Element {
    const ROOT_CLASS = 'move-to-step-popup-row';
    const isSelected = step.alias === selectedStep;
    const checkboxClass = classNames(
        `${ROOT_CLASS}__checkbox`,
        {
            [`${ROOT_CLASS}__checkbox_selected`]: isSelected,
        }
    );
    return (
        <tr className={ROOT_CLASS} onClick={onClick}>
            <th className={checkboxClass} />
            <td className={`${ROOT_CLASS}__data`}>Шаг {step.stepIndex}</td>
            <td className={`${ROOT_CLASS}__data`}>{step.name}</td>
            <td className={`${ROOT_CLASS}__data`}>{step.alias}</td>
        </tr>
    );
}
