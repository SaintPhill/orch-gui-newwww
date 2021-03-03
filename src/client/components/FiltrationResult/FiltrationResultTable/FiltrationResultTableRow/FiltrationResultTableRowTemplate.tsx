import React from 'react';

import { Checkbox } from '../../../../UI/Checkbox';
import { Request } from '../../../../../store/types/requestsTypes';
import { formatDate } from '../../../../common/formatDate';
import { SvgIcon } from '../../../../UI/SvgIcon';
import { SpriteId } from '../../../../UI/SvgIcon/SvgIconTemplate';
import { SelectedRequest } from '../../../../../store/StoreSlices/filtrationResult';
import { TableRow } from '../../../../UI/TableComponents/TableRow';
import './FiltrationResultTableRow.scss';

interface Props {
    request: Request
    requestIdToShowDetalization: number | null
    isRequestChanged: boolean
    selectedRequests: SelectedRequest[]
    selectRow(): void
    onCheckboxClick(): void
}

export function FiltrationResultTableTemplateRow({
    request,
    selectedRequests,
    isRequestChanged,
    requestIdToShowDetalization,
    onCheckboxClick,
    selectRow,
}: Props): JSX.Element {
    const ROOT_CLASS = 'filtration-result-table-row';
    const isChecked = !!selectedRequests.find(selectedRequest => selectedRequest.id === request.id);
    const isSelected = requestIdToShowDetalization === request.id;

    return (
        <TableRow isSelected={isSelected} isChanged={isRequestChanged} isCursorPointer>
            <th onClick={onCheckboxClick}><Checkbox isChecked={isChecked} /></th>
            <td onClick={selectRow} className={`${ROOT_CLASS}__data`}>
                <span title={isRequestChanged ? 'Состояние заявки изменено' : ''}>
                    {request.id}
                    {isRequestChanged &&
                        <SvgIcon className={`${ROOT_CLASS}__alert-icon`} spriteId={SpriteId.alert}/>
                    }
                </span>
            </td>
            <td onClick={selectRow} className={`${ROOT_CLASS}__data`}>{formatDate(request.register_date)}</td>
            <td onClick={selectRow} className={`${ROOT_CLASS}__data`}>{request.status}</td>
            <td onClick={selectRow} className={`${ROOT_CLASS}__data`}>
                <span title={request.process_alias}>{request.process_alias}</span>
            </td>
            <td onClick={selectRow} className={`${ROOT_CLASS}__data`}>
                <span title={request.step_alias}>{request.step_alias || '-'}</span>
            </td>
            <td onClick={selectRow} className={`${ROOT_CLASS}__data`}>
                <span title={request.error_description}>{request.error_description || '-'}</span>
            </td>
        </TableRow>
    );
}
