import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    findRequestById,
} from './requests';
import { SelectedRequest } from './filtrationResult';
import { RequestParameter } from '../types/requestsTypes';

export enum MainLayoutState {
    workWithRequests = 'Работа с заявками',
    transactionLog = 'Журнал операций',
    administration = 'Администрирование',
}

export enum DetalizationTable {
    parameters = 'parameters',
    processSteps = 'processSteps',
}

interface VisibilityState {
    isFiltersHidden: boolean
    isFiltrationResultHidden: boolean
    isDetalizationHidden: boolean
    isOperationsTableHidden: boolean
    isOperationDetalizationTableHidden: boolean
    isDetalizationTableShown: boolean
    detalization: {
        selectedTable: DetalizationTable
        selectedParameter: RequestParameter | null
        selectedRequest: SelectedRequest | null
    }
    mainLayoutState: MainLayoutState
}

const initialState: VisibilityState = {
    isFiltersHidden: false,
    isFiltrationResultHidden: false,
    isDetalizationHidden: false,
    isOperationsTableHidden: false,
    isOperationDetalizationTableHidden: false,
    isDetalizationTableShown: false,
    detalization: {
        selectedTable: DetalizationTable.processSteps,
        selectedParameter: null,
        selectedRequest: null,
    },
    mainLayoutState: MainLayoutState.workWithRequests,
};

export const visibility = createSlice({
    name: 'visibility',
    initialState,
    reducers: {
        toggleFiltersVisibility(state) {
            state.isFiltersHidden = !state.isFiltersHidden;
        },
        toggleFiltrationResultVisibility(state) {
            state.isFiltrationResultHidden = !state.isFiltrationResultHidden;
        },
        toggleMassOperationsTasksVisibility(state) {
            state.isOperationsTableHidden = !state.isOperationsTableHidden;
        },
        toggleMassOperationsDetalizationVisibility(state) {
            state.isOperationDetalizationTableHidden = !state.isOperationDetalizationTableHidden;
        },
        toggleDetalizationVisibility(state) {
            state.isDetalizationHidden = !state.isDetalizationHidden;
        },
        toggleDetalizationTableVisibility(state, { payload }: PayloadAction<boolean>) {
            state.isDetalizationTableShown = payload;
        },
        switchMainLayout(state, { payload }: PayloadAction<MainLayoutState>) {
            state.mainLayoutState = payload;
        },
        switchDetalizatoinTable(state, { payload }: PayloadAction<DetalizationTable>) {
            state.detalization.selectedTable = payload;
        },

        selectProcessStepRequest(state, { payload }: PayloadAction<SelectedRequest>) {
            state.detalization.selectedRequest = payload;
        },
        selectParameterId(state, { payload }: PayloadAction<RequestParameter>) {
            state.detalization.selectedParameter = payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(findRequestById.fulfilled, (state, { payload: { data } }) => {
            const { id, process_alias: process, parameters } = data;
            state.detalization.selectedRequest = { id, process };

            if (parameters) {
                const [{ name, type, value, id }] = parameters;
                state.detalization.selectedParameter = { name, type, value, id };
            }
        });
    },
});

export const {
    toggleFiltersVisibility,
    toggleFiltrationResultVisibility,
    toggleDetalizationVisibility,
    toggleDetalizationTableVisibility,
    toggleMassOperationsTasksVisibility,
    toggleMassOperationsDetalizationVisibility,
    switchMainLayout,
    switchDetalizatoinTable,
    selectProcessStepRequest,
    selectParameterId,
} = visibility.actions;

export default visibility.reducer;


