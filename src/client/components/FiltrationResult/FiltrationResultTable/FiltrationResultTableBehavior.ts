import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FiltrationResultTableTemplate } from './FiltrationResultTableTemplate';
import { RootState } from '../../../../store/StoreSlices';
import { Request } from '../../../../store/types/requestsTypes';
import { SelectedRequest, toggleRequestIdToChange } from '../../../../store/StoreSlices/filtrationResult';
import { findRequestById } from '../../../../store/StoreSlices/requests';
import { toggleDetalizationTableVisibility } from '../../../../store/StoreSlices/visibility';

interface Props {
    requests: Request[] | null
    selectedRequests: SelectedRequest[]
    selectAllRequests(): void
    removeSelectionFromAllRequests(): void
    setSelectedRequests(id: number, process: string): void
}

export function FiltrationResultTableBehavior({
    requests,
    selectedRequests,
    selectAllRequests,
    setSelectedRequests,
    removeSelectionFromAllRequests,
}: Props): JSX.Element {
    const dispatch = useDispatch();
    const statusFetchingRequestDetalization = useSelector((state: RootState) =>
        state.requests.statusFetchingRequestDetalization);
    const statusFetchingFiltrationResult = useSelector((state: RootState) =>
        state.requests.statusFetchingFiltrationResult);
    const isAllRequestsSelected = useSelector((state: RootState) => state.filtrationResult.isAllRequestsSelected);
    const requestIdToShowDetalization =
        useSelector((state: RootState) => state.filtrationResult.requestIdToChange);

    function toggleRowSelection(requestId: number): void {
        dispatch(toggleRequestIdToChange(requestId));

        if (requestIdToShowDetalization !== requestId) {
            dispatch(findRequestById(requestId));
            dispatch(toggleDetalizationTableVisibility(true));
        } else {
            dispatch(toggleDetalizationTableVisibility(false));
        }
    }

    return React.createElement(FiltrationResultTableTemplate, {
        requests,
        requestIdToShowDetalization,
        selectedRequests,
        isAllRequestsSelected,
        statusFetchingFiltrationResult,
        statusFetchingRequestDetalization,
        setSelectedRequests,
        selectAllRequests,
        toggleRowSelection,
        removeSelectionFromAllRequests,
    });
}
