import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ProcessStepsTableRowTemplate } from './ProcessStepsTableRowTemplate';
import { RequestById } from '../../../../../store/types/requestsTypes';
import { RootState } from '../../../../../store/StoreSlices';
import { ProcessStepsTableColumnsVisibility } from '../../DetalizationBehavior';
import { SelectedRequest } from '../../../../../store/StoreSlices/filtrationResult';

type Props = {
    request: RequestById
    selectedProcess: SelectedRequest
    childRequestLevel?: number
    isLastRequest?: boolean
    invisibleLinesIndexes?: number[]
    columnsVisibility: ProcessStepsTableColumnsVisibility
    selectProcess(id: number, alias: string): void
};

export function ProcessStepsTableRowBehavior({
    request,
    selectedProcess,
    selectProcess,
    childRequestLevel,
    isLastRequest,
    invisibleLinesIndexes,
    columnsVisibility,
}: Props): JSX.Element {
    const [isExecutionsShown, toggleExecutions] = useState(false);
    const isFiltersHidden = useSelector((state: RootState) => state.visibility.isFiltersHidden);

    useEffect(() => {
        const veryFirstProcess = !childRequestLevel;
        if (veryFirstProcess) {
            toggleExecutions(true);
        }
    }, [childRequestLevel]);

    function onTableDataClick(): void {
        selectProcess(request.id, request.process_alias);
    }

    function onTdIconClick(): void {
        toggleExecutions(!isExecutionsShown);
    }

    function isLastVerticalLine(lineIndex: number, lastLineIndex: number): boolean {
        return lineIndex === lastLineIndex;
    }

    return React.createElement(ProcessStepsTableRowTemplate, {
        request,
        selectedProcess,
        selectProcess,
        childRequestLevel,
        isExecutionsShown,
        isFiltersHidden,
        isLastRequest,
        invisibleLinesIndexes,
        columnsVisibility,
        onTableDataClick,
        onTdIconClick,
        isLastVerticalLine,
    });
}
