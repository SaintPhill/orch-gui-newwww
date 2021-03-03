import React from 'react';

import { Checkbox } from '../../../UI/Checkbox';
import { ProcessStepsTableColumnsVisibility } from '../DetalizationBehavior';
import './ProcessStepsColumnsController.scss';

type Props = {
    ulRef: React.RefObject<HTMLUListElement>
    columnsVisibility: ProcessStepsTableColumnsVisibility
    closeItSelf(): void
    toggleErrorColumn(): void
    toggleStepColumn(): void
    toggleTypeColumn(): void
    toggleStepNumberColumn(): void
    toggleStepAliasColumn(): void
    toggleErrorCodeColumn(): void
    toggleRegistrationDateColumn(): void
};

export function ProcessStepsColumnsControllerTemplate({
    ulRef,
    columnsVisibility,
    toggleErrorColumn,
    toggleStepColumn,
    toggleTypeColumn,
    toggleStepNumberColumn,
    toggleStepAliasColumn,
    toggleErrorCodeColumn,
    toggleRegistrationDateColumn,
    closeItSelf,
}: Props): JSX.Element {
    const ROOT_CLASS = 'process-steps-columns-controller';

    return (
        <ul ref={ulRef} onMouseLeave={closeItSelf} className={ROOT_CLASS}>
            <li onClick={toggleRegistrationDateColumn} className={`${ROOT_CLASS}__item`}>
                <Checkbox isChecked={columnsVisibility.registrationDate} />
                <span className={`${ROOT_CLASS}__column-name`}>Дата регистрации</span>
            </li>
            <li onClick={toggleStepNumberColumn} className={`${ROOT_CLASS}__item`}>
                <Checkbox isChecked={columnsVisibility.stepNumber} />
                <span className={`${ROOT_CLASS}__column-name`}>№ Шага</span>
            </li>
            <li onClick={toggleStepColumn} className={`${ROOT_CLASS}__item`}>
                <Checkbox isChecked={columnsVisibility.step} />
                <span className={`${ROOT_CLASS}__column-name`}>Шаг</span>
            </li>
            <li onClick={toggleStepAliasColumn} className={`${ROOT_CLASS}__item`}>
                <Checkbox isChecked={columnsVisibility.stepAlias} />
                <span className={`${ROOT_CLASS}__column-name`}>Step</span>
            </li>
            <li onClick={toggleTypeColumn} className={`${ROOT_CLASS}__item`}>
                <Checkbox isChecked={columnsVisibility.type} />
                <span className={`${ROOT_CLASS}__column-name`}>Тип</span>
            </li>
            <li onClick={toggleErrorColumn} className={`${ROOT_CLASS}__item`}>
                <Checkbox isChecked={columnsVisibility.error} />
                <span className={`${ROOT_CLASS}__column-name`}>Ошибка</span>
            </li>
            <li onClick={toggleErrorCodeColumn} className={`${ROOT_CLASS}__item`}>
                <Checkbox isChecked={columnsVisibility.errorCode} />
                <span className={`${ROOT_CLASS}__column-name`}>Код ошибки</span>
            </li>
        </ul>
    );
}
