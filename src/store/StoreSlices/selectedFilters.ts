import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Moment } from 'moment';

import { FilterName } from '../../client/components/Filters/Dropdown/Dropdown';
import { StepDurationEnum } from '../../client/components/Filters/Duration/DurationBehavior';
import { ParameterEnum } from '../../client/components/Filters/FlexibleSearch/FlexibleSearchBehavior';
import { RootState } from './index';


export type dateRange = {
    from: number
    to: number
};

export type StepDuration = {
    le: number | null
    ge: number | null
    eq: number | null
};

export type FlexibleSearch = {
    name: string
    value: string
};

export type WorkWithRequestFilters = {
    [key: string]: string | string[] | FlexibleSearch | StepDuration | dateRange | null
    process: string
    requestId: string
    smartCardId: string
    flexibleSearch: FlexibleSearch | null
    sapId: string
    stepStatuses: string[]
    stepErrorCodes: string[]
    stepDuration: StepDuration | null
    registrationDate: dateRange | null
    stepTime: dateRange | null
    processStatuses: string[]
    processSteps: string[]
};

export type TransactionLogFilters = {
    [key: string]: string
    operationId: string
    operationType: string
    initiator: string
    requestId: string
};

export interface FiltersState {
    workWithRequestsFilters: WorkWithRequestFilters
    transactionLogFilters: TransactionLogFilters
    availableFilters: FilterName[]
}

const initialState: FiltersState = {
    workWithRequestsFilters: {
        process: '',
        requestId: '',
        smartCardId: '',
        sapId: '',
        flexibleSearch: null,
        stepDuration: null,
        stepStatuses: [],
        stepErrorCodes: [],
        registrationDate: null,
        stepTime: null,
        processStatuses: [],
        processSteps: [],
    },
    transactionLogFilters: {
        operationId: '',
        operationType: '',
        initiator: '',
        requestId: '',
    },
    availableFilters: [],
};

function clearDeletedFilterValue(state: FiltersState, filterName: FilterName): void {
    switch (filterName) {
        case FilterName.process: {
            state.workWithRequestsFilters.process = initialState.workWithRequestsFilters.process;
            break;
        }
        case FilterName.requestId: {
            state.workWithRequestsFilters.requestId = initialState.workWithRequestsFilters.requestId;
            break;
        }
        case FilterName.registrationDate: {
            state.workWithRequestsFilters.registrationDate = initialState.workWithRequestsFilters.registrationDate;
            break;
        }
        case FilterName.smartCardId: {
            state.workWithRequestsFilters.smartCardId = initialState.workWithRequestsFilters.smartCardId;
            break;
        }
        case FilterName.sapId: {
            state.workWithRequestsFilters.sapId = initialState.workWithRequestsFilters.sapId;
            break;
        }
        case FilterName.processStep: {
            state.workWithRequestsFilters.processSteps = initialState.workWithRequestsFilters.processSteps;
            break;
        }
        case FilterName.processStatus: {
            state.workWithRequestsFilters.processStatuses = initialState.workWithRequestsFilters.processStatuses;
            break;
        }
        case FilterName.stepTime: {
            state.workWithRequestsFilters.stepTime = initialState.workWithRequestsFilters.stepTime;
            break;
        }
        case FilterName.stepStatus: {
            state.workWithRequestsFilters.stepStatuses = initialState.workWithRequestsFilters.stepStatuses;
            break;
        }
        case FilterName.stepErrorCode: {
            state.workWithRequestsFilters.stepErrorCodes = initialState.workWithRequestsFilters.stepErrorCodes;
            break;
        }
        case FilterName.duration: {
            state.workWithRequestsFilters.stepDuration = initialState.workWithRequestsFilters.stepDuration;
            break;
        }
        case FilterName.flexibleSearch: {
            state.workWithRequestsFilters.flexibleSearch = initialState.workWithRequestsFilters.flexibleSearch;
            break;
        }
    }
}

export const selectedFilters = createSlice({
    name: 'selectedFilters',
    initialState,
    reducers: {
        processSelected(state, { payload }: PayloadAction<string>) {
            state.workWithRequestsFilters.processSteps = [];
            state.workWithRequestsFilters.process = payload;
        },
        processStatusSelected(state, { payload }: PayloadAction<string[]>) {
            state.workWithRequestsFilters.processStatuses = payload;
        },
        processStepSelected(state, { payload }: PayloadAction<string[]>) {
            state.workWithRequestsFilters.processSteps = payload;
        },
        handleRequestId(state, { payload }: PayloadAction<string>) {
            state.workWithRequestsFilters.requestId = payload;
        },
        handleSmartCardId(state, { payload }: PayloadAction<string>) {
            state.workWithRequestsFilters.smartCardId = payload;
        },
        handleSapId(state, { payload }: PayloadAction<string>) {
            state.workWithRequestsFilters.sapId = payload;
        },
        handleStepStatus(state, { payload }: PayloadAction<string[]>) {
            state.workWithRequestsFilters.stepStatuses = payload;
        },
        handleStepErrorCode(state, { payload }: PayloadAction<string[]>) {
            state.workWithRequestsFilters.stepErrorCodes = payload;
        },
        setRegistrationDate(state, { payload }: PayloadAction<[Moment, Moment] | null>) {
            if (payload) {
                state.workWithRequestsFilters.registrationDate = {
                    from: Number(payload[0].toDate()),
                    to: Number(payload[1].toDate()),
                };

            } else {
                state.workWithRequestsFilters.registrationDate = payload;
            }
        },
        setStepTime(state, { payload }: PayloadAction<[Moment, Moment] | null>) {
            if (payload) {
                state.workWithRequestsFilters.stepTime = {
                    from: Number(payload[0].toDate()),
                    to: Number(payload[1].toDate()),
                };

            } else {
                state.workWithRequestsFilters.stepTime = payload;
            }
        },
        handleStepDuration(state, { payload }: PayloadAction<{durationName: StepDurationEnum; value: string}>) {
            if (!state.workWithRequestsFilters.stepDuration) {
                state.workWithRequestsFilters.stepDuration = {
                    le: null,
                    ge: null,
                    eq: null,
                };
            }

            state.workWithRequestsFilters.stepDuration[payload.durationName] = payload.value === '' ?
                null : Number(payload.value);

            if (state.workWithRequestsFilters.stepDuration.le === null &&
                state.workWithRequestsFilters.stepDuration.ge === null &&
                state.workWithRequestsFilters.stepDuration.eq === null) {
                state.workWithRequestsFilters.stepDuration = null;
            }
        },
        handleParameter(state, { payload }: PayloadAction<{parameterField: ParameterEnum; value: string}>) {
            if (!state.workWithRequestsFilters.flexibleSearch) {
                state.workWithRequestsFilters.flexibleSearch = {
                    name: '',
                    value: '',
                };
            }

            state.workWithRequestsFilters.flexibleSearch[payload.parameterField] = payload.value;

            if (state.workWithRequestsFilters.flexibleSearch.name === '' &&
                state.workWithRequestsFilters.flexibleSearch.value === '') {
                state.workWithRequestsFilters.flexibleSearch = null;
            }
        },
        addFilterToFiltersList(state, { payload }: PayloadAction<FilterName[]>) {
            if (payload.find(filter => filter === FilterName.processStep) &&
                !state.availableFilters.find(filter => filter === FilterName.process)) {
                state.availableFilters = payload.concat(FilterName.process);
            } else {
                state.availableFilters = payload;
            }
        },
        deleteFilterFromFiltersList(state, { payload }: PayloadAction<FilterName>) {
            state.availableFilters = state.availableFilters.filter(filter => filter !== payload);
            clearDeletedFilterValue(state, payload);

            if (payload === FilterName.process) {
                state.availableFilters = state.availableFilters.filter(filterName =>
                    filterName !== FilterName.processStep);
            }
        },
        clearWorkWithRequestsFilters(state) {
            return {
                ...initialState,
                availableFilters: state.availableFilters,
                transactionLogFilters: state.transactionLogFilters,
            };
        },

        handleOperationId(state, { payload }: PayloadAction<string>) {
            state.transactionLogFilters.operationId = payload;
        },
        operationTypeSelected(state, { payload }: PayloadAction<string>) {
            state.transactionLogFilters.operationType = payload;
        },

        handleTransactionLogRequestId(state, { payload }: PayloadAction<string>) {
            state.transactionLogFilters.requestId = payload;
        },

        clearTransactionLogFilters(state) {
            return { ...state, transactionLogFilters: initialState.transactionLogFilters };
        },
    },
});

export const {
    processSelected,
    processStatusSelected,
    processStepSelected,
    handleRequestId,
    handleSmartCardId,
    setRegistrationDate,
    setStepTime,
    clearWorkWithRequestsFilters,
    addFilterToFiltersList,
    deleteFilterFromFiltersList,
    handleSapId,
    handleStepStatus,
    handleStepErrorCode,
    handleStepDuration,
    handleParameter,
    handleOperationId,
    operationTypeSelected,
    handleTransactionLogRequestId,
    clearTransactionLogFilters,
} = selectedFilters.actions;

export default selectedFilters.reducer;

export const workWithRequestsFilters = (state: RootState): WorkWithRequestFilters =>
    state.selectedFilters.workWithRequestsFilters;
