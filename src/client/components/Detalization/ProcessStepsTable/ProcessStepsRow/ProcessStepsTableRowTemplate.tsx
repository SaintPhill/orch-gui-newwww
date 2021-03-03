import React from 'react';
import classNames from 'classnames';

import { RequestById } from '../../../../../store/types/requestsTypes';
import { Checkbox } from '../../../../UI/Checkbox';
import { formatDate } from '../../../../common/formatDate';
import { CHILD_REQUEST_PADDING, ExecutionTableRowTemplate } from './ExecutionTableRowTemplate';
import { SvgIcon } from '../../../../UI/SvgIcon';
import { SpriteId } from '../../../../UI/SvgIcon/SvgIconTemplate';
import { ProcessStepsTableColumnsVisibility } from '../../DetalizationBehavior';
import { SelectedRequest } from '../../../../../store/StoreSlices/filtrationResult';
import { TableRow } from '../../../../UI/TableComponents/TableRow';
import './ProcessStepsTableRow.scss';

type Props = {
    request: RequestById
    selectedProcess: SelectedRequest
    childRequestLevel?: number
    isExecutionsShown: boolean
    isFiltersHidden: boolean
    isLastRequest?: boolean
    invisibleLinesIndexes?: number[]
    columnsVisibility: ProcessStepsTableColumnsVisibility
    onTableDataClick(): void
    onTdIconClick(): void
    selectProcess(id: number, alias: string): void
    isLastVerticalLine(lineIndex: number, lastLineIndex: number): boolean
};

// eslint-disable-next-line
export function ProcessStepsTableRowTemplate({
    request,
    onTableDataClick,
    onTdIconClick,
    selectedProcess,
    selectProcess,
    columnsVisibility,
    childRequestLevel = 0,
    isExecutionsShown,
    isFiltersHidden,
    isLastRequest,
    isLastVerticalLine,
    invisibleLinesIndexes,
}: Props): JSX.Element {
    const ROOT_CLASS = 'process-steps-table-row';
    const isSelected = request.id === selectedProcess.id;

    const rowDataClass = classNames(
        `${ROOT_CLASS}__data`,
        {
            [`${ROOT_CLASS}__data_large`]: isFiltersHidden,
        }
    );
    const iconClass = classNames(
        `${ROOT_CLASS}__td-icon`,
        {
            [`${ROOT_CLASS}__td-icon-minus`]: isExecutionsShown,
        }
    );
    const rowStatusClass = classNames(
        `${ROOT_CLASS}__data`,
        {
            [`${ROOT_CLASS}__data-status_error`]: request.status.toLocaleLowerCase() === 'manual' ||
            request.status.toLocaleLowerCase() === 'error',
        }
    );
    const lastVerticalLineClass = classNames(
        `${ROOT_CLASS}__vertical-line`,
        {
            [`${ROOT_CLASS}__vertical-line_close-line`]: isLastRequest,
        }
    );
    const iconWrapperClass = classNames(
        `${ROOT_CLASS}__icon-wrapper`,
        {
            [`${ROOT_CLASS}__icon-wrapper_last`]: isLastRequest,
            [`${ROOT_CLASS}__icon-wrapper_open`]: isExecutionsShown,
        }
    );

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const verticalLinesMarginList = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300];
    verticalLinesMarginList.length = childRequestLevel;

    let newListOfInvisibleLinesIndexes: number[] = [];
    if (isLastRequest) {
        newListOfInvisibleLinesIndexes.push(childRequestLevel - 1);
        if (invisibleLinesIndexes) {
            newListOfInvisibleLinesIndexes = newListOfInvisibleLinesIndexes.concat(invisibleLinesIndexes);
        }
    }

    return (
        <>
            <TableRow isSelected={isSelected} isCursorPointer>
                <th><Checkbox blockName={ROOT_CLASS} isChecked={isSelected} onClick={onTableDataClick}/></th>
                <td
                    className={`${rowDataClass} ${ROOT_CLASS}__data-request-id`}
                    style={{ paddingLeft: `${childRequestLevel * CHILD_REQUEST_PADDING}px` }}
                    onClick={onTdIconClick}
                >
                    {verticalLinesMarginList.map((lineMargin, index: number) => {
                        if (newListOfInvisibleLinesIndexes.find(lineIndex => lineIndex === index)) {
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
                    })}
                    <div className={iconWrapperClass}>
                        <SvgIcon
                            className={iconClass}
                            spriteId={isExecutionsShown ? SpriteId.minus : SpriteId.plus}
                        />
                    </div>
                    <span title={String(request.id)}>{request.id}</span>
                </td>
                <td className={rowDataClass} onClick={onTableDataClick}>
                    <span title={request.process_alias}>{request.process_alias}</span>
                </td>

                {columnsVisibility.registrationDate &&
                    <td className={rowDataClass} onClick={onTableDataClick}>
                        <span title={formatDate(request.register_date)}>{formatDate(request.register_date)}</span>
                    </td>
                }

                <td className={rowStatusClass} onClick={onTableDataClick}>
                    <span title={request.status}>{request.status}</span>
                </td>

                {columnsVisibility.stepNumber && <td onClick={onTableDataClick} className={rowDataClass}/>}
                {columnsVisibility.step && <td onClick={onTableDataClick} className={rowDataClass}/>}
                {columnsVisibility.stepAlias && <td onClick={onTableDataClick} className={rowDataClass}/>}

                <td className={rowDataClass} onClick={onTableDataClick}/>

                {columnsVisibility.error && <td className={rowDataClass} onClick={onTableDataClick}/>}
                {columnsVisibility.errorCode && <td className={rowDataClass} onClick={onTableDataClick}/>}
            </TableRow>

            {isExecutionsShown && request.executions && request.executions.map((execution, index) =>
                <ExecutionTableRowTemplate
                    key={index}
                    execution={execution}
                    isFiltersHidden={isFiltersHidden}
                    selectProcess={selectProcess}
                    selectedProcess={selectedProcess}
                    childRequestLevel={childRequestLevel}
                    isLastExecution={index === request.executions!.length - 1}
                    isLastVerticalLine={isLastVerticalLine}
                    invisibleLinesIndexes={newListOfInvisibleLinesIndexes}
                    columnsVisibility={columnsVisibility}
                />
            )}
        </>
    );
}
