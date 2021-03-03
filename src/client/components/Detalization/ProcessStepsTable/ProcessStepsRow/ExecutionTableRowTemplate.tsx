import React from 'react';
import classNames from 'classnames';

import { Execution } from '../../../../../store/types/requestsTypes';
import { formatDate } from '../../../../common/formatDate';
import { ProcessStepsTableColumnsVisibility } from '../../DetalizationBehavior';
import { SelectedRequest } from '../../../../../store/StoreSlices/filtrationResult';
import { ProcessStepsTableRow } from '.';
import { TableRow } from '../../../../UI/TableComponents/TableRow';

type Props = {
    execution: Execution
    selectedProcess: SelectedRequest
    childRequestLevel: number
    isFiltersHidden: boolean
    isLastExecution: boolean
    invisibleLinesIndexes: number[]
    columnsVisibility: ProcessStepsTableColumnsVisibility
    selectProcess(id: number, alias: string): void
    isLastVerticalLine(lineIndex: number, lastLineIndex: number): boolean
};

export const CHILD_REQUEST_PADDING = 20;

export function ExecutionTableRowTemplate({
    execution,
    selectProcess,
    selectedProcess,
    childRequestLevel,
    isFiltersHidden,
    isLastExecution,
    isLastVerticalLine,
    invisibleLinesIndexes,
    columnsVisibility,
}: Props): JSX.Element {
    const ROOT_CLASS = 'process-steps-table-row';
    const rowDataClass = classNames(
        `${ROOT_CLASS}__data`,
        {
            [`${ROOT_CLASS}__data_large`]: isFiltersHidden,
        }
    );
    const lastVerticalLineClass = classNames(
        `${ROOT_CLASS}__vertical-line`,
        {
            [`${ROOT_CLASS}__vertical-line_close-line`]: isLastExecution && !execution.children?.length,
        }
    );

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const verticalLinesMarginList = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300];
    verticalLinesMarginList.length = childRequestLevel + 1;

    return (
        <>
            <TableRow>
                <th/>
                <td
                    className={rowDataClass}
                    style={{ paddingLeft: `${childRequestLevel * CHILD_REQUEST_PADDING}px` }}
                >
                    {verticalLinesMarginList.map((lineMargin, index: number) => {
                        if (invisibleLinesIndexes.findIndex(id => id === index) >= 0) {
                            return null;
                        }
                        return (
                            <div
                                key={index}
                                style={{ marginLeft: `${lineMargin}px` }}
                                className={isLastVerticalLine(index, verticalLinesMarginList.length - 1) ?
                                    lastVerticalLineClass : `${ROOT_CLASS}__vertical-line`}
                            />
                        );
                    }
                    )}
                </td>
                <td className={rowDataClass} />

                {columnsVisibility.registrationDate &&
                    <td className={rowDataClass}>
                        <span title={formatDate(execution.execution_date)}>{formatDate(execution.execution_date)}</span>
                    </td>
                }

                <td className={rowDataClass}><span title={execution.status}>{execution.status}</span></td>

                {columnsVisibility.stepNumber &&
                    <td className={rowDataClass}>Шаг {execution.step_index}</td>
                }
                {columnsVisibility.step &&
                    <td className={rowDataClass}><span title={execution.step_name}>{execution.step_name}</span></td>
                }
                {columnsVisibility.stepAlias &&
                    <td className={rowDataClass}><span title={execution.step_alias}>{execution.step_alias}</span></td>
                }

                <td className={rowDataClass}>{execution.duration}</td>

                {columnsVisibility.error &&
                    <td className={rowDataClass}>
                        <span title={execution.error_description}>{execution.error_description}</span>
                    </td>
                }
                {columnsVisibility.errorCode &&
                    <td className={rowDataClass}>{execution.error_code}</td>
                }
            </TableRow>

            {execution.children && execution.children.map((request, index) =>
                <ProcessStepsTableRow
                    key={index}
                    selectedProcess={selectedProcess}
                    selectProcess={selectProcess}
                    request={request}
                    childRequestLevel={childRequestLevel + 1}
                    isLastRequest={isLastExecution}
                    invisibleLinesIndexes={invisibleLinesIndexes}
                    columnsVisibility={columnsVisibility}
                />
            )}
        </>
    );
}
