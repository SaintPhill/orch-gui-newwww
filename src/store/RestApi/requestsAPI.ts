import axios from 'axios';

import {
    RequestById,
    FindRequestResult,
    RequestsParams,
    MassOperationLaunch,
    GetMassOperationsList,
    MassOperationDetalization,
    GetMassOperationsListParams,
} from '../types/requestsTypes';
import { API } from './filtersOptionsAPI';

const orchRest = 'orch/rest';

export const requestsAPI = {
    findRequestById: (id: number) =>
        axios.get<RequestById>(`${API.BASE_URL}/${orchRest}/requests/${id}/?show_executions=true&show_parameters=true`),
    findRequests: (params: RequestsParams) =>
        axios.post<FindRequestResult>(`${API.BASE_URL}/${orchRest}/requests/search`, {
            ...params,
            reverse_order: true,
        }),
    singleChangeProcessStatus: (id: number, status: string) =>
        axios.put(`${API.BASE_URL}/${orchRest}/requests/${id}/status/${status}`),
    massChangeProcessStatus: (ids: number[], status: string, owner: { first_name: string; last_name: string }) =>
        axios.post<MassOperationLaunch>(`${API.BASE_URL}/${orchRest}/mass-change/status`, {
            request_id: ids,
            status,
            owner: `${owner.first_name} ${owner.last_name}`,
        }),
    singleChangeProcessStep: (id: number, stepAlias: string) => axios.put(`${API.BASE_URL}/${orchRest}/requests/${id}/step/${stepAlias}`),
    massChangeProcessStep: (ids: number[], stepAlias: string, owner: { first_name: string; last_name: string }) =>
        axios.post<MassOperationLaunch>(`${API.BASE_URL}/${orchRest}/mass-change/step`, {
            request_id: ids,
            step_alias: stepAlias,
            owner: `${owner.first_name} ${owner.last_name}`,
        }),
    changeRequestParameter: (parameterId: number, requestId: number, parameter: string) =>
        axios.put(`${API.BASE_URL}/${orchRest}/parameter/${parameterId}/request/${requestId}`, parameter),
    downloadExcelFiltrationResult: (requestIds: number[]) =>
        axios.post<Blob>(`${API.BASE_URL}/${orchRest}/report/requests`, { request_id: requestIds }, {
            responseType: 'blob',
        }),
    downloadExcelMassOperationsList: (operationsIds: number[]) =>
        axios.post<Blob>(`${API.BASE_URL}/${orchRest}/report/mass`, { request_id: operationsIds }, {
            responseType: 'blob',
        }),
    getMassOperationsList: (params: GetMassOperationsListParams) =>
        axios.post<GetMassOperationsList>(`${API.BASE_URL}/${orchRest}/mass-change/search`, {
            ...params,
            reverse_order: true,
        }),
    getMassOperationDetalization: (operationId: number) =>
        axios.get<MassOperationDetalization>(`${API.BASE_URL}/${orchRest}/mass-change/status/${operationId}`),
};

