import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    singleChangeProcessStatus,
    singleChangeProcessStep,
    findAllRequests,
    findRequestById,
    findRequests,
    changeRequestParameter, massChangeProcessStatus, massChangeProcessStep,
} from './requests';

export type SelectedRequest = {
    id: number
    process: string
};

export type PaginationType = {
    pageNumber: number
    totalElements: number
};

export type FiltrationResult = {
    selectedRequests: SelectedRequest[]
    changedRequestsIds: number[]
    requestIdToChange: number
    isAllRequestsSelected: boolean
    isMassOperationsButtonDisabled: boolean
    pagination: PaginationType
};

const initialState: FiltrationResult = {
    selectedRequests: [],
    requestIdToChange: 0,
    changedRequestsIds: [],
    isAllRequestsSelected: false,
    isMassOperationsButtonDisabled: true,
    pagination: { pageNumber: 0, totalElements: 0 },

};

function isMassOperationButtonDisabled(state: FiltrationResult): boolean {
    return !!state.changedRequestsIds.find(changeRequest =>
        state.selectedRequests.find(selectedRequest =>
            selectedRequest.id === changeRequest)) || state.selectedRequests.length < 2;
}

function markChangedRequests(state: FiltrationResult, action: any): void {
    state.changedRequestsIds = [
        ...state.changedRequestsIds,
        ...JSON.parse(action.payload.config.data).request_id,
    ];

    state.isMassOperationsButtonDisabled = isMassOperationButtonDisabled(state);
}

export const filtrationResult = createSlice({
    name: 'filtrationResult',
    initialState,
    reducers: {
        updateSelectedRequests(state, action: PayloadAction<SelectedRequest>) {
            const { process, id } = action.payload;
            const isRequestAlreadySelected = state.selectedRequests.find(request => request.id === id);

            if (isRequestAlreadySelected) {
                state.selectedRequests = state.selectedRequests.filter(request => request.id !== id);
            } else {
                state.selectedRequests = [...state.selectedRequests, { process, id }];
            }

            state.isMassOperationsButtonDisabled = isMassOperationButtonDisabled(state);
        },
        clearSelectedRequests(state) {
            state.selectedRequests = [];
            state.isAllRequestsSelected = false;
            state.isMassOperationsButtonDisabled = true;
        },
        toggleRequestIdToChange(state, action: PayloadAction<number>) {
            if (state.requestIdToChange === action.payload) {
                state.requestIdToChange = 0;
            } else {
                state.requestIdToChange = action.payload;
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(findAllRequests.pending, state => {
            state.isAllRequestsSelected = true;
        });
        builder.addCase(findAllRequests.rejected, state => {
            state.isAllRequestsSelected = false;
        });
        builder.addCase(findAllRequests.fulfilled, (state, action) => {
            state.selectedRequests = action.payload.data.content.map(request => ({
                id: request.id,
                process: request.process_alias,
            }));
            state.changedRequestsIds.forEach(changedRequestId => {
                state.selectedRequests = [
                    ...state.selectedRequests, {
                        id: changedRequestId,
                        process: '',
                    },
                ];
            });

            state.isMassOperationsButtonDisabled = isMassOperationButtonDisabled(state);
        });

        builder.addCase(findRequests.pending, state => {
            state.changedRequestsIds = [];
            state.requestIdToChange = 0;
        });
        builder.addCase(findRequests.fulfilled, (state, { payload: { data } }) => {
            const { pageNumber, totalElements } = data;
            state.pagination = { pageNumber: pageNumber + 1, totalElements };
        });

        builder.addCase(findRequestById.fulfilled, (state, { payload: { data } }) => {
            state.requestIdToChange = data.id;
        });

        builder.addCase(singleChangeProcessStep.fulfilled, state => {
            state.changedRequestsIds = [...state.changedRequestsIds, state.requestIdToChange];
            state.isMassOperationsButtonDisabled = isMassOperationButtonDisabled(state);
        });

        builder.addCase(singleChangeProcessStatus.fulfilled, state => {
            state.changedRequestsIds = [...state.changedRequestsIds, state.requestIdToChange];
            state.isMassOperationsButtonDisabled = isMassOperationButtonDisabled(state);
        });

        builder.addCase(changeRequestParameter.fulfilled, state => {
            state.changedRequestsIds = [...state.changedRequestsIds, state.requestIdToChange];
            state.isMassOperationsButtonDisabled = isMassOperationButtonDisabled(state);
        });

        builder.addCase(massChangeProcessStatus.fulfilled, markChangedRequests);
        builder.addCase(massChangeProcessStep.fulfilled, markChangedRequests);
    },
});

export const {
    updateSelectedRequests,
    clearSelectedRequests,
    toggleRequestIdToChange,
} = filtrationResult.actions;

export default filtrationResult.reducer;
