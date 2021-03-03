import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store/StoreSlices';
import {
    findAllRequests,
    findRequests,
    downloadExcelFiltrationResult,
    resetFetchStatusOfMassOperation,
} from '../../../store/StoreSlices/requests';
import { FiltrationResultTemplate } from './FiltrationResultTemplate';
import {
    toggleFiltrationResultVisibility,
} from '../../../store/StoreSlices/visibility';
import {
    updateSelectedRequests,
    clearSelectedRequests,
} from '../../../store/StoreSlices/filtrationResult';
import { StatusFetching } from '../../../store/StoreSlices/filtersOptions';
import { usePopupVisibility } from '../../customHooks/usePopupVisibility';
import { usePaginationSize } from '../../customHooks/usePaginationSize';

export function FiltrationResultBehavior(): JSX.Element {
    const dispatch = useDispatch();
    const requests = useSelector((state: RootState) => state.requests.filtrationResult);
    const changedRequestsIds = useSelector((state: RootState) => state.filtrationResult.changedRequestsIds);
    const statusFetchingFiltrationResult = useSelector((state: RootState) =>
        state.requests.statusFetchingFiltrationResult);
    const isMassOperationSuccessful = useSelector((state: RootState) =>
        state.requests.statusFetchingMassOperation === StatusFetching.fulfilled);
    const massOperationNumber = useSelector((state: RootState) => state.requests.massOperationNumber);
    const statusFetchingAllRequests = useSelector((state: RootState) =>
        state.requests.statusFetchingAllRequests);
    const paginationSize = usePaginationSize();
    const pagination = useSelector((state: RootState) => state.filtrationResult.pagination);
    const isFiltrationResultHidden =
        useSelector((state: RootState) => state.visibility.isFiltrationResultHidden);
    const isDetalizationHidden = useSelector((state: RootState) => state.visibility.isDetalizationHidden);
    const isMassOperationsButtonDisabled =
        useSelector((state: RootState) => state.filtrationResult.isMassOperationsButtonDisabled);
    const selectedRequests = useSelector((state: RootState) => state.filtrationResult.selectedRequests);
    const [isChoseMassOperationPopupVisible, toggleIsChoseMassOperationPopupVisibleFlag] = useState(false);
    const [isMoveToStepPopupVisible, toggleIsMoveToStepPopupVisibleFlag] = useState(false);
    const [isChangeStatusPopupVisible, toggleIsChangeStatusPopupVisibleFlag] = useState(false);
    const [
        isMassOperationSuccessPopupVisible,
        openMassOperationSuccessPopup,
        closeMassOperationSuccessPopup,
    ] = usePopupVisibility();
    const [isMoveToStepButtonDisabled, toggleMoveToStepButton] = useState(false);

    function openChoseMassOperationPopup(): void {
        toggleIsChoseMassOperationPopupVisibleFlag(true);
    }
    function closeChoseMassOperationPopup(): void {
        toggleIsChoseMassOperationPopupVisibleFlag(false);
    }

    function openMoveToStepPopup(): void {
        toggleIsMoveToStepPopupVisibleFlag(true);
        toggleIsChoseMassOperationPopupVisibleFlag(false);
    }
    function closeMoveToStepPopup(): void {
        toggleIsMoveToStepPopupVisibleFlag(false);
    }

    function openChangeStatusPopup(): void {
        toggleIsChangeStatusPopupVisibleFlag(true);
        toggleIsChoseMassOperationPopupVisibleFlag(false);
    }
    function closeChangeStatusPopup(): void {
        toggleIsChangeStatusPopupVisibleFlag(false);
    }

    function toggleTableVisibility(): void {
        dispatch(toggleFiltrationResultVisibility());
    }

    function selectAllRequests(): void {
        dispatch(findAllRequests());
    }
    function removeSelectionFromAllRequests(): void {
        if (statusFetchingAllRequests !== StatusFetching.pending) {
            dispatch(clearSelectedRequests());
        }
    }

    function setSelectedRequests(id: number, process: string): void {
        dispatch(updateSelectedRequests({ id, process }));
    }

    function changePaginationPage(page: number): void {
        dispatch(findRequests(page));
    }

    useEffect(() => {
        if (selectedRequests.length) {
            const firstProcessAlias = selectedRequests[0]?.process;
            if (selectedRequests.find(selectedRequest => selectedRequest.process !== firstProcessAlias)) {
                toggleMoveToStepButton(true);
            } else {
                toggleMoveToStepButton(false);
            }
        }
    }, [selectedRequests, changedRequestsIds]);

    function loadXls(): void {
        dispatch(downloadExcelFiltrationResult());
    }

    useEffect(() => {
        if (isMassOperationSuccessful) {
            openMassOperationSuccessPopup();
            dispatch(resetFetchStatusOfMassOperation());
        }
    }, [openMassOperationSuccessPopup, isMassOperationSuccessful, dispatch]);

    return React.createElement(FiltrationResultTemplate, {
        requests,
        pagination,
        paginationSize,
        selectedRequests,
        massOperationNumber,
        isDetalizationHidden,
        isFiltrationResultHidden,
        isMoveToStepPopupVisible,
        isChangeStatusPopupVisible,
        isMoveToStepButtonDisabled,
        isMassOperationsButtonDisabled,
        isMassOperationSuccessPopupVisible,
        isChoseMassOperationPopupVisible,
        statusFetchingFiltrationResult,
        closeMassOperationSuccessPopup,
        loadXls,
        changePaginationPage,
        selectAllRequests,
        setSelectedRequests,
        toggleTableVisibility,
        removeSelectionFromAllRequests,
        openChoseMassOperationPopup,
        closeChoseMassOperationPopup,
        openMoveToStepPopup,
        closeMoveToStepPopup,
        openChangeStatusPopup,
        closeChangeStatusPopup,
    });
}
