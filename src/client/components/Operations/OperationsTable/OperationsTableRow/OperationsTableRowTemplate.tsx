import React from 'react';

import { MassOperation } from '../../../../../store/types/requestsTypes';
import { formatDate } from '../../../../common/formatDate';
import { Checkbox } from '../../../../UI/Checkbox';
import { TableRow } from '../../../../UI/TableComponents/TableRow';
import './OperationsTableTableRow.scss';

interface Props {
    massOperation: MassOperation
    selectedOperationsIds: number[]
    selectedRowId: number | null
    onRowClick(): void
    setSelectedOperations(): void
}

export function OperationsTableRowTemplate({
    massOperation,
    selectedRowId,
    selectedOperationsIds,
    setSelectedOperations,
    onRowClick,
}: Props): JSX.Element {
    const ROOT_CLASS = 'operations-table-row';
    const isRowSelected = selectedRowId === massOperation.mass_id;
    const isChecked = !!selectedOperationsIds.find(operationId => operationId === massOperation.mass_id);

    return (
        <TableRow isSelected={isRowSelected}>
            <th onClick={setSelectedOperations}>
                <Checkbox isChecked={isChecked}/>
            </th>
            <td onClick={onRowClick} className={`${ROOT_CLASS}__data`}>
                {massOperation.mass_id}
            </td>
            <td onClick={onRowClick} className={`${ROOT_CLASS}__data`}>
                {'ChangeStatus' === massOperation.type ? 'Изменение статуса' : 'Изменение шага' }
            </td>
            <td onClick={onRowClick} className={`${ROOT_CLASS}__data`}>{formatDate(massOperation.dt_create)}</td>
            <td onClick={onRowClick} className={`${ROOT_CLASS}__data`}>
                {massOperation.dt_finish && formatDate(massOperation.dt_finish)}
            </td>
            <td onClick={onRowClick} className={`${ROOT_CLASS}__data`}>{massOperation.complete}</td>
            <td onClick={onRowClick} className={`${ROOT_CLASS}__data`}>{massOperation.owner || ''}</td>
        </TableRow>
    );
}
