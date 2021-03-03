import React from 'react';

import { RequestParameter } from '../../../../../store/types/requestsTypes';
import { Checkbox } from '../../../../UI/Checkbox';
import { TableRow } from '../../../../UI/TableComponents/TableRow';
import './ParametersTableRow.scss';

interface Props {
    parameter: RequestParameter
    selectedParameter: RequestParameter
    onClick(): void
}

export function ParametersTableRowTemplate({
    parameter,
    onClick,
    selectedParameter,
}: Props): JSX.Element {
    const ROOT_CLASS = 'parameters-table-row';
    const isSelected = parameter.id === selectedParameter.id;

    return (
        <TableRow isCursorPointer onClick={onClick} isSelected={isSelected}>
            <th><Checkbox isChecked={isSelected} /></th>
            <td className={`${ROOT_CLASS}__data`}>{parameter.id}</td>
            <td className={`${ROOT_CLASS}__data`}>{parameter.name}</td>
            <td className={`${ROOT_CLASS}__data`}>{parameter.type}</td>
            <td className={`${ROOT_CLASS}__data`}>{parameter.value}</td>
        </TableRow>
    );
}
