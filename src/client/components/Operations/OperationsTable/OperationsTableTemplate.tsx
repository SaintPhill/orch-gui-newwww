import React from 'react';
import { Spin } from 'antd';

import { MassOperation } from '../../../../store/types/requestsTypes';
import { StatusFetching } from '../../../../store/StoreSlices/filtersOptions';
import { TableWrapper } from '../../../UI/TableComponents/TableWrapper';
import { OperationsTableRow } from './OperationsTableRow';
import { TableStickyHeader } from '../../../UI/TableComponents/TableStickyHeader';
import { TableRow } from '../../../UI/TableComponents/TableRow';
import './OperationsTable.scss';

interface Props {
    massOperations: MassOperation[] | null
    selectedOperationsIds: number[]
    statusFetching: StatusFetching
}


export function OperationsTableTemplate({
    massOperations,
    selectedOperationsIds,
    statusFetching,
}: Props): JSX.Element {
    const ROOT_CLASS = 'operations-table';

    return (
        <TableWrapper isOperationsTasksTable>
            <table className={ROOT_CLASS}>
                <thead>
                    <TableRow>
                        <TableStickyHeader/>
                        <TableStickyHeader>ID операции</TableStickyHeader>
                        <TableStickyHeader>Массовая операция</TableStickyHeader>
                        <TableStickyHeader>Дата создания</TableStickyHeader>
                        <TableStickyHeader>Дата окончания</TableStickyHeader>
                        <TableStickyHeader>Статус</TableStickyHeader>
                        <TableStickyHeader>Логин</TableStickyHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {statusFetching === StatusFetching.pending &&
                        <tr className={`${ROOT_CLASS}__loading-spinner`}><td><Spin size={'large'} /></td></tr>
                    }

                    {statusFetching === StatusFetching.fulfilled &&
                        massOperations && massOperations.map((massOperation, key) =>
                        <OperationsTableRow
                            selectedOperationsIds={selectedOperationsIds}
                            massOperation={massOperation}
                            key={key}
                        />
                    )}
                </tbody>
            </table>
        </TableWrapper>
    );
}
