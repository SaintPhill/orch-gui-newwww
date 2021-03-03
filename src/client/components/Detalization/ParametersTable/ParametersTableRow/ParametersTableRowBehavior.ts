import React from 'react';

import { ParametersTableRowTemplate } from './ParametersTableRowTemplate';
import { RequestParameter } from '../../../../../store/types/requestsTypes';

interface Props {
    parameter: RequestParameter
    selectedParameter: RequestParameter
    selectParameter(parameter: RequestParameter): void
}

export function ParametersTableRowBehavior({
    parameter,
    selectedParameter,
    selectParameter,
}: Props): JSX.Element {
    function onClick(): void {
        selectParameter(parameter);
    }

    return React.createElement(ParametersTableRowTemplate, {
        parameter,
        selectedParameter,
        onClick,
    });
}
