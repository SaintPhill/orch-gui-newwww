import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DetalizationTemplate } from './DetalizationTemplate';
import { RootState } from '../../../store/StoreSlices';
import {
    findRequestById,
    resetFetchStatusOfSingleOperation,
} from '../../../store/StoreSlices/requests';
import { TableColumnsNames } from './ProcessStepsColumnsController/ProcessStepsColumnsControllerBehavior';
import {
    toggleDetalizationVisibility,
    DetalizationTable,
    switchDetalizatoinTable,
} from '../../../store/StoreSlices/visibility';
import { StatusFetching } from '../../../store/StoreSlices/filtersOptions';

export type ProcessStepsTableColumnsVisibility = {
    error: boolean
    step: boolean
    type: boolean
    stepNumber: boolean
    stepAlias: boolean
    errorCode: boolean
    registrationDate: boolean
};

export function DetalizationBehavior(): JSX.Element {
    const dispatch = useDispatch();
    const selectedRequestId = useSelector((state: RootState) => state.filtrationResult.requestIdToChange);
    const statusFetching = useSelector((state: RootState) => state.requests.statusFetchingRequestDetalization);
    const isSingleOperationSuccessful = useSelector((state: RootState) =>
        state.requests.statusFetchingSingleOperation === StatusFetching.fulfilled);
    const isDetalizationTableShown = useSelector((state: RootState) => state.visibility.isDetalizationTableShown);
    const isDetalizationHidden = useSelector((state: RootState) => state.visibility.isDetalizationHidden);
    const isFiltrationResultHidden =
        useSelector((state: RootState) => state.visibility.isFiltrationResultHidden);
    const selectedTable = useSelector((state: RootState) => state.visibility.detalization.selectedTable);
    const [isProcessStepsTableColumnsControllerVisible, toggleProcessStepsTableColumnsControllerVisibility] =
        useState(false);
    const [processStepsTableColumnsVisibility, handleProcessStepsTableColumnsVisibility] =
        useState<ProcessStepsTableColumnsVisibility>({
            error: true,
            step: true,
            type: true,
            stepNumber: true,
            stepAlias: true,
            errorCode: true,
            registrationDate: true,
        });
    const [updateButtonState, setUpdateButtonState] = useState({
        isPulsing: false,
        isDisabled: true,
    });

    useEffect(() => {
        if (!isDetalizationTableShown) {
            setUpdateButtonState({
                isDisabled: true,
                isPulsing: false,
            });
        }
    }, [isDetalizationTableShown]);

    useEffect(() => {
        if (isSingleOperationSuccessful) {
            setUpdateButtonState({
                isDisabled: false,
                isPulsing: true,
            });
            dispatch(resetFetchStatusOfSingleOperation());
        }
    }, [isSingleOperationSuccessful, dispatch]);

    function setProcessStepsTableColumnsVisibility(columnName: TableColumnsNames): void {
        handleProcessStepsTableColumnsVisibility({
            ...processStepsTableColumnsVisibility,
            [columnName]: !processStepsTableColumnsVisibility[columnName],
        });
    }

    function showProcessStepsTableColumnsController(): void {
        toggleProcessStepsTableColumnsControllerVisibility(true);
    }
    function hideProcessStepsTableColumnsController(): void {
        toggleProcessStepsTableColumnsControllerVisibility(false);
    }

    function switchTable(tableName: DetalizationTable): void {
        dispatch(switchDetalizatoinTable(tableName));
    }

    function updateTable(): void {
        setUpdateButtonState({
            isDisabled: false,
            isPulsing: false,
        });
        dispatch(findRequestById(selectedRequestId));
    }

    function onToggleIconCLick(): void {
        dispatch(toggleDetalizationVisibility());
    }


    return React.createElement(DetalizationTemplate, {
        selectedTable,
        statusFetching,
        updateButtonState,
        isDetalizationHidden,
        isFiltrationResultHidden,
        isDetalizationTableShown,
        isSingleOperationSuccessful,
        isProcessStepsTableColumnsControllerVisible,
        processStepsTableColumnsVisibility,
        switchTable,
        updateTable,
        onToggleIconCLick,
        showProcessStepsTableColumnsController,
        hideProcessStepsTableColumnsController,
        setProcessStepsTableColumnsVisibility,
    });
}
