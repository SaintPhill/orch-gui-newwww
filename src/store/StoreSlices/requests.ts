import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { requestsAPI } from '../RestApi/requestsAPI';
import {
    MassOperation,
    Request,
    RequestById,
    RequestsParams,
    MassOperationDetalization,
    GetMassOperationsListParams,
} from '../types/requestsTypes';
import { StatusFetching } from './filtersOptions';
import { RootState } from './index';

export interface RequestsState {
    filtrationResult: Request[] | null
    requestDetalization: RequestById | null
    massOperationsList: MassOperation[] | null
    massOperationDetalization: MassOperationDetalization | null
    errorMessage?: string
    massOperationNumber: string
    statusFetchingFiltrationResult: StatusFetching
    statusFetchingRequestDetalization: StatusFetching
    statusFetchingSingleOperation: StatusFetching
    statusFetchingMassOperation: StatusFetching
    statusFetchingAllRequests: StatusFetching
    statusFetchingDownloadExcel: StatusFetching
    statusFetchingDownloadExcelMassOperations: StatusFetching
    statusFetchingMassOperationsList: StatusFetching
    statusFetchingMassOperationDetalization: StatusFetching
}

const initialState: RequestsState = {
    filtrationResult: null,
    requestDetalization: null,
    massOperationsList: null,
    massOperationDetalization: null,
    massOperationNumber: '',
    statusFetchingSingleOperation: StatusFetching.idle,
    statusFetchingMassOperation: StatusFetching.idle,
    statusFetchingFiltrationResult: StatusFetching.idle,
    statusFetchingRequestDetalization: StatusFetching.idle,
    statusFetchingAllRequests: StatusFetching.idle,
    statusFetchingDownloadExcel: StatusFetching.idle,
    statusFetchingDownloadExcelMassOperations: StatusFetching.idle,
    statusFetchingMassOperationsList: StatusFetching.idle,
    statusFetchingMassOperationDetalization: StatusFetching.idle,
};

export const defaultPageSize = 40;
function serializeSelectedFiltersValues({
    filtersOptions,
    selectedFilters,
}: RootState,
paginationPage: number,
limit = defaultPageSize): RequestsParams {
    const {
        sapId,
        stepTime,
        requestId,
        smartCardId,
        stepDuration,
        stepStatuses,
        flexibleSearch,
        processStatuses,
        registrationDate,
    } = selectedFilters.workWithRequestsFilters;
    const stepErrorCodes = selectedFilters.workWithRequestsFilters.stepErrorCodes.map(errorCode =>
        parseInt(errorCode, 10));
    const process = filtersOptions.processes.find(process =>
        process.name === selectedFilters.workWithRequestsFilters.process)?.alias;
    const processSteps: string[] = [];
    selectedFilters.workWithRequestsFilters.processSteps.forEach(selectedStep => {
        const stepAlias = filtersOptions.processSteps.find(step =>
            step.name.toLocaleLowerCase() === selectedStep.toLocaleLowerCase())?.alias;
        if (stepAlias) {
            processSteps.push(stepAlias);
        }
    });

    return {
        step_execution: stepTime,
        request_id: Number(requestId),
        offset: (paginationPage - 1) * limit,
        step_duration: stepDuration,
        limit,
        process: process || null,
        statuses: processStatuses,
        step_aliases: processSteps,
        step_status: stepStatuses,
        step_error_code: stepErrorCodes,
        period: registrationDate,
        parameter: flexibleSearch,
        smart_card_id: smartCardId,
        sap_id: sapId,
    };
}

function serializeMassOperationsFiltersValues({
    selectedFilters,
    filtersOptions,
}: RootState,
paginationPage: number): GetMassOperationsListParams {
    const {
        operationId,
        operationType,
        initiator,
        requestId,
    } = selectedFilters.transactionLogFilters;
    const massOperationType = filtersOptions.massOperationTypes.find(type => type.name === operationType)?.alias;

    return {
        page_number: paginationPage,
        max_page_size: defaultPageSize,
        reverse_order: true,
        mass_id: parseInt(operationId, 10) || null,
        mass_type: massOperationType || null,
        owner: initiator || null,
        object_id: parseInt(requestId, 10) || null,
    };
}

export const findRequests = createAsyncThunk(
    'findRequests',
    (paginationPage: number, state) =>
        requestsAPI.findRequests(serializeSelectedFiltersValues(state.getState() as RootState, paginationPage))
);

export const findAllRequests = createAsyncThunk(
    'findAllRequests',
    (_: undefined, state) => {
        const paginationPage = 1;
        const maximumLimit = 10000000;
        return requestsAPI
            .findRequests(serializeSelectedFiltersValues(state.getState() as RootState, paginationPage, maximumLimit));
    }
);

export const findRequestById = createAsyncThunk(
    'findRequestById',
    (id: number) => requestsAPI.findRequestById(id)
);

export const getMassOperationsList = createAsyncThunk(
    'getMassOperationsList',
    (paginationPage: number, state) =>
        requestsAPI
            .getMassOperationsList(serializeMassOperationsFiltersValues(state.getState() as RootState, paginationPage))
);

export const getMassOperationDetalization = createAsyncThunk(
    'getMassOperationDetalization',
    (operationId: number) =>
        requestsAPI.getMassOperationDetalization(operationId)
);

export const singleChangeProcessStatus = createAsyncThunk(
    'singleChangeProcessStatus',
    ({ id, status }: {id: number; status: string}) => requestsAPI.singleChangeProcessStatus(id, status)
);

export const massChangeProcessStatus = createAsyncThunk(
    'massChangeProcessStatus',
    ({ ids, status }: {ids: number[]; status: string}, state) => {
        const { authorization: { userInfo } } = state.getState() as RootState;
        return requestsAPI.massChangeProcessStatus(ids, status, {
            first_name: userInfo!.first_name,
            last_name: userInfo!.last_name,
        });
    }
);

export const singleChangeProcessStep = createAsyncThunk(
    'singleChangeProcessStep',
    ({ id, stepAlias }: {id: number; stepAlias: string}) =>
        requestsAPI.singleChangeProcessStep(id, stepAlias)
);

export const massChangeProcessStep = createAsyncThunk(
    'massChangeProcessStep',
    ({ ids, stepAlias }: {ids: number[]; stepAlias: string}, state) => {
        const { authorization: { userInfo } } = state.getState() as RootState;
        return requestsAPI.massChangeProcessStep(ids, stepAlias, {
            first_name: userInfo!.first_name,
            last_name: userInfo!.last_name,
        });
    }
);

export const downloadExcelFiltrationResult = createAsyncThunk(
    'downloadExcelFiltrationResult',
    (_: undefined, state) => {
        const { filtrationResult } = state.getState() as RootState;
        const requestsIds = filtrationResult.selectedRequests.map(request => request.id);

        return requestsAPI.downloadExcelFiltrationResult(requestsIds);
    }
);

export const downloadExcelMassOperationsList = createAsyncThunk(
    'downloadExcelMassOperationsList',
    (_: undefined, state) => {
        const { massOperations: { selectedOperationsIds } } = state.getState() as RootState;

        return requestsAPI.downloadExcelMassOperationsList(selectedOperationsIds);
    }
);

type ChangeRequestParameter = {
    parameterId: number
    requestId: number
    parameter: string
};
export const changeRequestParameter = createAsyncThunk(
    'changeRequestParameter',
    ({ parameterId, requestId, parameter }: ChangeRequestParameter) =>
        requestsAPI.changeRequestParameter(parameterId, requestId, parameter)
);

function downloadExcelToBrowser(action: any): void {
    const url = window.URL.createObjectURL(new Blob([action.payload.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.xls');
    document.body.appendChild(link);
    link.click();
}

const requests = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        resetFetchStatusOfSingleOperation(state) {
            state.statusFetchingSingleOperation = initialState.statusFetchingSingleOperation;
        },
        resetFetchStatusOfMassOperation(state) {
            state.statusFetchingMassOperation = initialState.statusFetchingMassOperation;
        },
    },
    extraReducers: builder => {
        builder.addCase(findRequests.pending, state => {
            state.statusFetchingFiltrationResult = StatusFetching.pending;
        });
        builder.addCase(findRequests.fulfilled, (state, { payload: { data } }) => {
            state.filtrationResult = data.content;
            state.statusFetchingFiltrationResult = StatusFetching.fulfilled;
        });
        builder.addCase(findRequests.rejected, (state, { error }) => {
            state.errorMessage = error.message;
            state.statusFetchingFiltrationResult = StatusFetching.rejected;
        });

        builder.addCase(findRequestById.pending, state => {
            state.statusFetchingRequestDetalization = StatusFetching.pending;
        });
        builder.addCase(findRequestById.fulfilled, (state, { payload: { data } }) => {
            state.statusFetchingRequestDetalization = StatusFetching.fulfilled;
            state.requestDetalization = data;
        });
        builder.addCase(findRequestById.rejected, (state, { error }) => {
            state.errorMessage = error.message;
            state.statusFetchingRequestDetalization = StatusFetching.rejected;
        });

        builder.addCase(getMassOperationsList.pending, state => {
            state.statusFetchingMassOperationsList = StatusFetching.pending;
        });
        builder.addCase(getMassOperationsList.fulfilled, (state, { payload: { data } }) => {
            state.statusFetchingMassOperationsList = StatusFetching.fulfilled;
            state.massOperationsList = data.content;
        });

        builder.addCase(getMassOperationDetalization.pending, state => {
            state.statusFetchingMassOperationDetalization = StatusFetching.pending;
        });
        builder.addCase(getMassOperationDetalization.fulfilled, (state, { payload: { data } }) => {
            state.statusFetchingMassOperationDetalization = StatusFetching.fulfilled;
            state.massOperationDetalization = data;
        });

        builder.addCase(singleChangeProcessStep.pending, state => {
            state.statusFetchingSingleOperation = StatusFetching.pending;
        });
        builder.addCase(singleChangeProcessStep.fulfilled, state => {
            state.statusFetchingSingleOperation = StatusFetching.fulfilled;
        });

        builder.addCase(massChangeProcessStep.pending, state => {
            state.statusFetchingMassOperation = StatusFetching.pending;
        });
        builder.addCase(massChangeProcessStep.fulfilled, (state, { payload: { data } }) => {
            state.statusFetchingMassOperation = StatusFetching.fulfilled;
            state.massOperationNumber = data.mass_id;
        });

        builder.addCase(singleChangeProcessStatus.pending, state => {
            state.statusFetchingSingleOperation = StatusFetching.pending;
        });
        builder.addCase(singleChangeProcessStatus.fulfilled, state => {
            state.statusFetchingSingleOperation = StatusFetching.fulfilled;
        });

        builder.addCase(massChangeProcessStatus.pending, state => {
            state.statusFetchingMassOperation = StatusFetching.pending;
        });
        builder.addCase(massChangeProcessStatus.fulfilled, (state, { payload: { data } }) => {
            state.statusFetchingMassOperation = StatusFetching.fulfilled;
            state.massOperationNumber = data.mass_id;
        });

        builder.addCase(changeRequestParameter.pending, state => {
            state.statusFetchingSingleOperation = StatusFetching.pending;
        });
        builder.addCase(changeRequestParameter.fulfilled, state => {
            state.statusFetchingSingleOperation = StatusFetching.fulfilled;
        });

        builder.addCase(findAllRequests.pending, state => {
            state.statusFetchingAllRequests = StatusFetching.pending;
        });
        builder.addCase(findAllRequests.fulfilled, state => {
            state.statusFetchingAllRequests = StatusFetching.fulfilled;
        });

        builder.addCase(downloadExcelFiltrationResult.pending, state => {
            state.statusFetchingDownloadExcel = StatusFetching.pending;
        });
        builder.addCase(downloadExcelFiltrationResult.fulfilled, (state, action) => {
            state.statusFetchingDownloadExcel = StatusFetching.fulfilled;
            downloadExcelToBrowser(action);
        });
        builder.addCase(downloadExcelMassOperationsList.fulfilled, (state, action) => {
            state.statusFetchingDownloadExcelMassOperations = StatusFetching.fulfilled;
            downloadExcelToBrowser(action);
        });
    },
});

export const {
    resetFetchStatusOfSingleOperation,
    resetFetchStatusOfMassOperation,
} = requests.actions;

export default requests.reducer;
