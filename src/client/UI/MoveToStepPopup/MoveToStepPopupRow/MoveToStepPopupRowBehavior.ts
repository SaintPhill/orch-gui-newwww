import React from 'react';

import { MoveToStepPopupRowTemplate } from './MoveToStepPopupRowTemplate';
import { ProcessStep } from '../../../../store/types/filtersOptionsTypes';

interface Props {
    step: ProcessStep
    selectedStep: string
    selectStep(stepAlias: string): void
}

export function MoveToStepPopupRowBehavior({
    step,
    selectedStep,
    selectStep,
}: Props): JSX.Element {
    function onClick(): void {
        selectStep(step.alias);
    }

    return React.createElement(MoveToStepPopupRowTemplate, {
        step,
        selectedStep,
        onClick,
    });
}
