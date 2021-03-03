import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store/StoreSlices';
import { OperationsTemplate } from './OperationsTemplate';
import { toggleMassOperationsTasksVisibility } from '../../../store/StoreSlices/visibility';
import { downloadExcelMassOperationsList, getMassOperationsList } from '../../../store/StoreSlices/requests';
import { usePaginationSize } from '../../customHooks/usePaginationSize';

export function OperationsBehavior(): JSX.Element {
    const dispatch = useDispatch();
    const statusFetching = useSelector((state: RootState) => state.requests.statusFetchingMassOperationsList);
    const isOperationsTableHidden = useSelector((state: RootState) => state.visibility.isOperationsTableHidden);
    const isOperationDetalizationTableHidden =
        useSelector((state: RootState) => state.visibility.isOperationDetalizationTableHidden);
    const selectedOperationsIds = useSelector((state: RootState) => state.massOperations.selectedOperationsIds);
    const pagination = useSelector((state: RootState) => state.massOperations.pagination);
    const paginationSize = usePaginationSize();

    function toggleTableVisibility(): void {
        dispatch(toggleMassOperationsTasksVisibility());
    }

    function updateTable(): void {
        dispatch(getMassOperationsList(0));
    }

    function changePaginationPage(page: number): void {
        dispatch(getMassOperationsList(page - 1));
    }

    function downloadExcel(): void {
        dispatch(downloadExcelMassOperationsList());
    }

    return React.createElement(OperationsTemplate, {
        pagination,
        statusFetching,
        paginationSize,
        selectedOperationsIds,
        isOperationsTableHidden,
        isOperationDetalizationTableHidden,
        updateTable,
        downloadExcel,
        changePaginationPage,
        toggleTableVisibility,
    });
}
