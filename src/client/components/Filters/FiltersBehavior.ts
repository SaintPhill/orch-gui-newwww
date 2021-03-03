import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FiltersTemplate } from './FiltersTemplate';
import {
    addFilterToFiltersList, clearWorkWithRequestsFilters, clearTransactionLogFilters,
} from '../../../store/StoreSlices/selectedFilters';
import { FilterName, SelectOption } from './Dropdown/Dropdown';
import { RootState } from '../../../store/StoreSlices';
import { findRequests, getMassOperationsList } from '../../../store/StoreSlices/requests';
import { MainLayoutState, toggleFiltersVisibility } from '../../../store/StoreSlices/visibility';
import { clearSelectedRequests } from '../../../store/StoreSlices/filtrationResult';
import { StatusFetching } from '../../../store/StoreSlices/filtersOptions';
import { clearMassOperationsTableState } from '../../../store/StoreSlices/massOperations';

const allFilters = [
    FilterName.process,
    FilterName.processStep,
    FilterName.stepTime,
    FilterName.registrationDate,
    FilterName.processStatus,
    FilterName.smartCardId,
    FilterName.requestId,
    FilterName.sapId,
    FilterName.stepStatus,
    FilterName.stepErrorCode,
    FilterName.duration,
    FilterName.flexibleSearch,
];


export function FiltersBehavior(): JSX.Element {
    const dispatch = useDispatch();
    const { workWithRequestsFilters, transactionLogFilters } =
        useSelector((state: RootState) => state.selectedFilters);
    const isFiltersHidden = useSelector((state: RootState) => state.visibility.isFiltersHidden);
    const availableFilters = useSelector((state: RootState) => state.selectedFilters.availableFilters);
    const mainLayoutState = useSelector((state: RootState) => state.visibility.mainLayoutState);
    const statusFetchingFiltrationResult = useSelector((state: RootState) =>
        state.requests.statusFetchingFiltrationResult);
    const [isActionButtonsDisabled, toggleApplyButton] = useState(true);

    const isAtLeastOneWorkWithRequestsFilterSelected = useCallback(() => {
        let isAtLeastOneFilterSelected = false;
        Object.keys(workWithRequestsFilters).forEach(key => {
            if (!isAtLeastOneFilterSelected) {
                if (Array.isArray(workWithRequestsFilters[key]) && (workWithRequestsFilters[key] as []).length) {
                    isAtLeastOneFilterSelected = true;
                }
                if (!Array.isArray(workWithRequestsFilters[key]) && workWithRequestsFilters[key]) {
                    isAtLeastOneFilterSelected = true;
                }
            }
        });

        return isAtLeastOneFilterSelected;
    }, [workWithRequestsFilters]);

    const isAtLeastOneTransactionLogFilterSelected = useCallback(() => {
        let isAtLeastOneFilterSelected = false;
        Object.keys(transactionLogFilters).forEach(key => {
            if (!isAtLeastOneFilterSelected && transactionLogFilters[key]) {
                isAtLeastOneFilterSelected = true;
            }
        });

        return isAtLeastOneFilterSelected;
    }, [transactionLogFilters]);

    function closeFilters(): void {
        dispatch(toggleFiltersVisibility());
    }

    function onApplyButtonClick(): void {
        if (mainLayoutState === MainLayoutState.workWithRequests && isAtLeastOneWorkWithRequestsFilterSelected()) {
            const paginationPage = 1;
            dispatch(clearSelectedRequests());
            dispatch(findRequests(paginationPage));
        } else if (mainLayoutState === MainLayoutState.transactionLog && isAtLeastOneTransactionLogFilterSelected()) {
            dispatch(clearMassOperationsTableState());
            dispatch(getMassOperationsList(0));
        }
    }

    function onClearButtonClick(): void {
        if (mainLayoutState === MainLayoutState.workWithRequests && isAtLeastOneWorkWithRequestsFilterSelected()) {
            dispatch(clearWorkWithRequestsFilters());
        } else if (mainLayoutState === MainLayoutState.transactionLog && isAtLeastOneTransactionLogFilterSelected()) {
            dispatch(clearTransactionLogFilters());
        }
    }

    function addFilter(filters: SelectOption[] | null): void {
        if (filters) {
            const selectedFilters = filters.map(item => (item.value as FilterName));
            dispatch(addFilterToFiltersList(selectedFilters));
        } else {
            dispatch(addFilterToFiltersList([]));
        }
    }

    useEffect(() => {
        if (mainLayoutState === MainLayoutState.workWithRequests) {
            toggleApplyButton(!isAtLeastOneWorkWithRequestsFilterSelected() ||
                statusFetchingFiltrationResult === StatusFetching.pending);
        } else {
            toggleApplyButton(!isAtLeastOneTransactionLogFilterSelected());
        }
    }, [
        workWithRequestsFilters,
        transactionLogFilters,
        mainLayoutState,
        isAtLeastOneWorkWithRequestsFilterSelected,
        isAtLeastOneTransactionLogFilterSelected,
        statusFetchingFiltrationResult,
    ]);

    return React.createElement(FiltersTemplate, {
        allFilters,
        availableFilters,
        isActionButtonsDisabled,
        isFiltersHidden,
        mainLayoutState,
        closeFilters,
        onApplyButtonClick,
        onClearButtonClick,
        addFilter,
    });
}
