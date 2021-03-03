import React, { useRef } from 'react';

import useOutsideClick from '../../../customHooks/useOutsideClick';
import { ProcessStepsColumnsControllerTemplate } from './ProcessStepsColumnsControllerTemplate';
import { ProcessStepsTableColumnsVisibility } from '../DetalizationBehavior';

export enum TableColumnsNames {
    error = 'error',
    step = 'step',
    type = 'type',
    stepNumber = 'stepNumber',
    stepAlias = 'stepAlias',
    errorCode = 'errorCode',
    registrationDate = 'registrationDate',
}

type Props = {
    setColumnsVisibility: (columnName: TableColumnsNames) => void
    columnsVisibility: ProcessStepsTableColumnsVisibility
    closeItSelf(): void
};

export function ProcessStepsColumnsControllerBehavior({
    setColumnsVisibility,
    columnsVisibility,
    closeItSelf,
}: Props): JSX.Element {
    const ulRef = useRef<HTMLUListElement>(null);
    useOutsideClick(ulRef, () => {
        closeItSelf();
    });

    function toggleErrorColumn(): void {
        setColumnsVisibility(TableColumnsNames.error);
    }
    function toggleStepColumn(): void {
        setColumnsVisibility(TableColumnsNames.step);
    }
    function toggleTypeColumn(): void {
        setColumnsVisibility(TableColumnsNames.type);
    }
    function toggleStepNumberColumn(): void {
        setColumnsVisibility(TableColumnsNames.stepNumber);
    }
    function toggleStepAliasColumn(): void {
        setColumnsVisibility(TableColumnsNames.stepAlias);
    }
    function toggleErrorCodeColumn(): void {
        setColumnsVisibility(TableColumnsNames.errorCode);
    }
    function toggleRegistrationDateColumn(): void {
        setColumnsVisibility(TableColumnsNames.registrationDate);
    }


    return React.createElement(ProcessStepsColumnsControllerTemplate, {
        ulRef,
        closeItSelf,
        columnsVisibility,
        toggleErrorColumn,
        toggleStepColumn,
        toggleTypeColumn,
        toggleStepNumberColumn,
        toggleStepAliasColumn,
        toggleErrorCodeColumn,
        toggleRegistrationDateColumn,
    });
}
