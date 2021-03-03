import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaginationType } from './filtrationResult';
import {
    getMassOperationsList,
} from './requests';

export type MassOperationsState = {
    selectedOperationsIds: number[]
    selectedTableRowId: number | null
    pagination: PaginationType
};

const initialState: MassOperationsState = {
    selectedOperationsIds: [],
    selectedTableRowId: null,
    pagination: { pageNumber: 0, totalElements: 0 },
};

export const massOperations = createSlice({
    name: 'massOperations',
    initialState,
    reducers: {
        updateSelectedOperations(state, action: PayloadAction<{ id: number }>) {
            const { id } = action.payload;
            const isOperationAlreadySelected = state.selectedOperationsIds.find(operationId => operationId === id);

            if (isOperationAlreadySelected) {
                state.selectedOperationsIds = state.selectedOperationsIds.filter(operationId => operationId !== id);
            } else {
                state.selectedOperationsIds = [...state.selectedOperationsIds, id];
            }
        },
        clearMassOperationsTableState(state) {
            state.selectedOperationsIds = initialState.selectedOperationsIds;
            state.selectedTableRowId = initialState.selectedTableRowId;
            state.pagination = initialState.pagination;
        },
        selectTableRowId(state, action: PayloadAction<{id: number}>) {
            state.selectedTableRowId = action.payload.id;
        },
    },
    extraReducers: builder => {
        builder.addCase(getMassOperationsList.fulfilled, (state, { payload: { data } }) => {
            const { page_number, total_elements } = data;
            state.pagination = { pageNumber: page_number + 1, totalElements: total_elements };
        });
    },
});

export const {
    selectTableRowId,
    updateSelectedOperations,
    clearMassOperationsTableState,
} = massOperations.actions;

export default massOperations.reducer;
