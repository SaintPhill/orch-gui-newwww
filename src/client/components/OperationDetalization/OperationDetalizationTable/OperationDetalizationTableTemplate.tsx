import React from 'react';
import { Spin } from 'antd';

import { MassOperationDetalization } from '../../../../store/types/requestsTypes';
import { StatusFetching } from '../../../../store/StoreSlices/filtersOptions';
import { TableWrapper } from '../../../UI/TableComponents/TableWrapper';
import { OperationDetalizationTableRow } from './OperationDetalizationTableRow';
import { TableStickyHeader } from '../../../UI/TableComponents/TableStickyHeader';
import './OperationDetalizationTable.scss';

interface Props {
    operationDetalization: MassOperationDetalization | null
    statusFetching: StatusFetching
}


export function OperationDetalizationTableTemplate({
    operationDetalization,
    statusFetching,
}: Props): JSX.Element {
    const ROOT_CLASS = 'operation-detalization-table';
    const massOperationTasks = operationDetalization?.job.tasks;

    return (
        <TableWrapper isOperationDetalizationTable>
            <table className={ROOT_CLASS}>
                <thead>
                    <tr
                        className={`${ROOT_CLASS}__row`}
                    >
                        <TableStickyHeader/>
                        <TableStickyHeader isNarrow>id заявки</TableStickyHeader>
                        <TableStickyHeader isNarrow>Дата регистрации</TableStickyHeader>
                        <TableStickyHeader isNarrow>Статус заявки</TableStickyHeader>
                        <TableStickyHeader>Процесса</TableStickyHeader>
                        <TableStickyHeader isNarrow>№</TableStickyHeader>
                        <TableStickyHeader>Шаг</TableStickyHeader>
                        <TableStickyHeader>Ошибка</TableStickyHeader>
                        <TableStickyHeader isNarrow>Код ошибки</TableStickyHeader>
                    </tr>
                </thead>
                <tbody>
                    {statusFetching === StatusFetching.pending &&
                        <tr className={`${ROOT_CLASS}__loading-spinner`}><td><Spin size={'large'} /></td></tr>
                    }
                    {statusFetching === StatusFetching.fulfilled &&
                        massOperationTasks && massOperationTasks.map((operationTask, index) =>
                        <OperationDetalizationTableRow
                            operationTask={operationTask}
                            key={index}
                        />
                    )}
                </tbody>
            </table>
        </TableWrapper>
    );
}
