import React from 'react';

import { OperationDetalizationTableRowTemplate } from './OperationDetalizationTableRowTemplate';
import { MassOperationTask } from '../../../../../store/types/requestsTypes';

interface Props {
    operationTask: MassOperationTask
}

export function OperationDetalizationTableRowBehavior({
    operationTask,
}: Props): JSX.Element {

    return React.createElement(OperationDetalizationTableRowTemplate, {
        operationTask,
    });
}
