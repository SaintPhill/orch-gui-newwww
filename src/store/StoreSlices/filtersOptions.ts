import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { filtersOptionsAPI } from '../RestApi/filtersOptionsAPI';
import { Process, ProcessStep, MassOperationType } from '../types/filtersOptionsTypes';
import { RootState } from './index';
import { SelectOption } from '../../client/components/Filters/Dropdown/Dropdown';

export enum StatusFetching {
    idle = 'idle',
    pending = 'pending',
    fulfilled = 'fulfilled',
    rejected = 'rejected',
}

export interface FiltersValuesState {
    processes: Process[]
    processSteps: ProcessStep[]
    statuses: string[]
    stepStatuses: string[]
    stepErrorCodes: string[]
    statusFetching: StatusFetching
    stepsStatusFetching: StatusFetching
    massOperationTypes: MassOperationType[]
    errorMessage?: string
}

const initialState: FiltersValuesState = {
    processes: [],
    processSteps: [],
    statuses: [],
    stepStatuses: [],
    stepErrorCodes: [],
    massOperationTypes: [
        {
            name: 'Изменение статуса',
            alias: 'ChangeStatus',
        },
        {
            name: 'Изменение шага',
            alias: 'ChangeStep',
        },
    ],
    statusFetching: StatusFetching.idle,
    stepsStatusFetching: StatusFetching.idle,
};

export const getFiltersOptions = createAsyncThunk(
    'getFiltersOptions',
    async () => {
        const [processes, processStatuses, stepErrors] = await Promise.all([
            filtersOptionsAPI.getProcesses(),
            filtersOptionsAPI.getStatuses(),
            filtersOptionsAPI.getStepsErrors(),
        ]);
        return {
            processes,
            processStatuses,
            stepErrors,
        };
    });

export const getStepsByProcess = createAsyncThunk(
    'getStepsByProcess',
    (process: string) => filtersOptionsAPI.getStepsByProcess(process)
);

const filtersOptions = createSlice({
    name: 'filtersOptions',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getFiltersOptions.pending, state => {
            state.statusFetching = StatusFetching.pending;
        });
        builder.addCase(getFiltersOptions.fulfilled, (state, { payload }) => {
            state.statusFetching = StatusFetching.fulfilled;
            state.processes = payload.processes.data;
            state.statuses = payload.processStatuses.data;

            payload.stepErrors.data.forEach(step => {
                state.stepErrorCodes = [...state.stepErrorCodes, `${step.id} - ${step.name}`];

                if (!state.stepStatuses.find(status => status === step.status)) {
                    state.stepStatuses = [...state.stepStatuses, step.status];
                }
            });
        });
        builder.addCase(getFiltersOptions.rejected, (state, { error }) => {
            state.errorMessage = error.message;
            state.statusFetching = StatusFetching.rejected;
        });

        builder.addCase(getStepsByProcess.pending, state => {
            state.stepsStatusFetching = StatusFetching.pending;
        });
        builder.addCase(getStepsByProcess.fulfilled, (state, { payload: { data } }) => {
            state.processSteps = data.steps;
            state.stepsStatusFetching = StatusFetching.fulfilled;
        });
        builder.addCase(getStepsByProcess.rejected, (state, { error }) => {
            state.errorMessage = error.message;
            state.stepsStatusFetching = StatusFetching.rejected;
        });
    },
});

export default filtersOptions.reducer;

export const getProcessSelectOptions = (state: RootState): SelectOption[] =>
    state.filtersOptions.processes.map(process => ({ label: process.name, value: process.alias }));

export const getProcessStepSelectOptions = (state: RootState): SelectOption[] =>
    state.filtersOptions.processSteps.map(step => ({ label: step.name, value: step.alias }));

export const getMassOperationTypesOptions = (state: RootState): string[] =>
    state.filtersOptions.massOperationTypes.map(type => type.name);
