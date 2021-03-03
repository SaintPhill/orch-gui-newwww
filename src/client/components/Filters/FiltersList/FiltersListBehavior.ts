import React, { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Moment } from 'moment';

import { FiltersListTemplate } from './FiltersListTemplate';
import {
    getStepsByProcess,
    getProcessSelectOptions,
    getProcessStepSelectOptions,
    getMassOperationTypesOptions,
} from '../../../../store/StoreSlices/filtersOptions';
import { FilterName, SelectOption } from '../Dropdown/Dropdown';
import { RootState } from '../../../../store/StoreSlices';
import {
    deleteFilterFromFiltersList,
    processSelected,
    processStatusSelected,
    processStepSelected,
    handleRequestId,
    handleSmartCardId,
    handleSapId,
    setRegistrationDate,
    setStepTime,
    handleStepStatus,
    handleStepErrorCode,
    handleOperationId,
    operationTypeSelected,
    handleTransactionLogRequestId,
} from '../../../../store/StoreSlices/selectedFilters';
import './FiltersList.scss';

type Props = {
    applyFilters(): void
};

export function FiltersListBehavior({ applyFilters }: Props): JSX.Element {
    const dispatch = useDispatch();
    const {
        workWithRequestsFilters,
        availableFilters,
        transactionLogFilters,
    } = useSelector((state: RootState) => state.selectedFilters);
    const processSelectOptions = useSelector(getProcessSelectOptions);
    const processStepSelectOptions = useSelector(getProcessStepSelectOptions);
    const statusSelectOptions = useSelector((state: RootState) => state.filtersOptions.statuses);
    const mainLayoutState = useSelector((state: RootState) => state.visibility.mainLayoutState);
    const stepStatusSelectOptions = useSelector((state: RootState) => state.filtersOptions.stepStatuses);
    const stepErrorCodeOptions = useSelector((state: RootState) => state.filtersOptions.stepErrorCodes);
    const operationTypesSelectOptions = useSelector(getMassOperationTypesOptions);
    const selectedProcessAlias = useSelector((state: RootState) => state.filtersOptions.processes)
        .find(item => item.name === workWithRequestsFilters.process)?.alias;

    useEffect(() => {
        if (selectedProcessAlias) {
            dispatch(getStepsByProcess(selectedProcessAlias));
        }
    }, [dispatch, selectedProcessAlias]);

    function handleRequestIdInput(event: React.FormEvent<HTMLInputElement>): void {
        if (!isNaN(Number(event.currentTarget.value)) || event.currentTarget.value === '') {
            dispatch(handleRequestId(event.currentTarget.value));
        }
    }
    function clearRequestIdInput(): void {
        dispatch(handleRequestId(''));
    }

    function handleSapIdInput(event: React.FormEvent<HTMLInputElement>): void {
        dispatch(handleSapId(event.currentTarget.value));
    }
    function clearSapIdInput(): void {
        dispatch(handleSapId(''));
    }

    function handleSmartCardIdInput(event: React.FormEvent<HTMLInputElement>): void {
        dispatch(handleSmartCardId(event.currentTarget.value));
    }
    function clearSmartCardIdInput(): void {
        dispatch(handleSmartCardId(''));
    }

    function setProcess(process: string): void {
        dispatch(processSelected(process));
    }

    function setProcessStatus(statuses: SelectOption[] | null): void {
        const selectedStatuses = statuses ? statuses.map(status => status.label) : [];
        dispatch(processStatusSelected(selectedStatuses));
    }

    function setProcessStep(steps: SelectOption[] | null): void {
        const selectedSteps = steps ? steps.map(step => step.label) : [];
        dispatch(processStepSelected(selectedSteps));
    }

    function handleRegistrationDate(dates: [Moment, Moment]): void {
        dispatch(setRegistrationDate(dates));
    }

    function handleStepTime(dates: [Moment, Moment]): void {
        dispatch(setStepTime(dates));
    }

    function deleteFilter(filterName: FilterName): void {
        dispatch(deleteFilterFromFiltersList(filterName));
    }

    function setStepStatuses(statuses: SelectOption[]): void {
        const selectedStatuses = statuses ? statuses.map(status => status.label) : [];
        dispatch(handleStepStatus(selectedStatuses));
    }

    function setStepErrorCodes(errorCodes: SelectOption[]): void {
        const selectedErrorCodes = errorCodes ? errorCodes.map(errorCode => errorCode.label) : [];
        dispatch(handleStepErrorCode(selectedErrorCodes));
    }

    function handleOperationIdInput(event: React.FormEvent<HTMLInputElement>): void {
        dispatch(handleOperationId(event.currentTarget.value));
    }
    function clearOperationIdInput(): void {
        dispatch(handleOperationId(''));
    }

    function handleTransactionLogRequestIdInput(event: React.FormEvent<HTMLInputElement>): void {
        dispatch(handleTransactionLogRequestId(event.currentTarget.value));
    }
    function clearTransactionLogRequestIdInput(): void {
        dispatch(handleTransactionLogRequestId(''));
    }

    function setOperationType(operationType: string): void {
        dispatch(operationTypeSelected(operationType));
    }

    function submitFilters(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        applyFilters();
    }

    return React.createElement(FiltersListTemplate, {
        workWithRequestsFilters,
        mainLayoutState,
        availableFilters,
        statusSelectOptions,
        processSelectOptions,
        processStepSelectOptions,
        stepStatusSelectOptions,
        stepErrorCodeOptions,
        operationTypesSelectOptions,
        transactionLogFilters,
        submitFilters,
        setProcess,
        setProcessStatus,
        setOperationType,
        setProcessStep,
        deleteFilter,
        handleStepTime,
        handleRegistrationDate,
        handleSapIdInput,
        clearSapIdInput,
        handleRequestIdInput,
        setStepStatuses,
        setStepErrorCodes,
        clearRequestIdInput,
        handleSmartCardIdInput,
        clearSmartCardIdInput,
        handleOperationIdInput,
        clearOperationIdInput,
        handleTransactionLogRequestIdInput,
        clearTransactionLogRequestIdInput,
    });
}
