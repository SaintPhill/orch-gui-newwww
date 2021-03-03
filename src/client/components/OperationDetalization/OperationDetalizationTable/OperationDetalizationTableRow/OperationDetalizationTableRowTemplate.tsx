import React from 'react';

import { MassOperationTask } from '../../../../../store/types/requestsTypes';
import { formatDate } from '../../../../common/formatDate';
import './OperationDetalizationTableRow.scss';

interface Props {
    operationTask: MassOperationTask
}

export function OperationDetalizationTableRowTemplate({
    operationTask,
}: Props): JSX.Element {
    const ROOT_CLASS = 'operation-detalization-table-row';
    const requestStatus = operationTask.request_status;

    return (
        <tr className={ROOT_CLASS}>
            <th/>
            <td className={`${ROOT_CLASS}__data`}>
                {requestStatus.request_id}
            </td>
            <td className={`${ROOT_CLASS}__data`}>{formatDate(requestStatus.register_date)}</td>
            <td className={`${ROOT_CLASS}__data`}>{requestStatus.status}</td>
            <td className={`${ROOT_CLASS}__data`} title={requestStatus.process_alias}>{requestStatus.process_alias}</td>
            <td className={`${ROOT_CLASS}__data`}>Шаг {requestStatus.step_id}</td>
            <td className={`${ROOT_CLASS}__data`} title={requestStatus.step_name}>{requestStatus.step_name}</td>
            <td className={`${ROOT_CLASS}__data`} title={requestStatus.error_message}>{requestStatus.error_message}</td>
            <td className={`${ROOT_CLASS}__data`}>{requestStatus.error_code}</td>
        </tr>
    );
}
