import React from 'react';
import { useSelector } from 'react-redux';

import { FiltrationResultTableTemplateRow } from './FiltrationResultTableRowTemplate';
import { Request } from '../../../../../store/types/requestsTypes';
import { StatusFetching } from '../../../../../store/StoreSlices/filtersOptions';
import { SelectedRequest } from '../../../../../store/StoreSlices/filtrationResult';
import { RootState } from '../../../../../store/StoreSlices';

interface Props {
    request: Request
    requestIdToShowDetalization: number | null
    selectedRequests: SelectedRequest[]
    statusFetchingRequestDetalization: StatusFetching
    toggleRowSelection(requestId: number): void
    setSelectedRequests(id: number, process: string): void
}

export function FiltrationResultTableRowBehavior({
    request,
    requestIdToShowDetalization,
    selectedRequests,
    toggleRowSelection,
    setSelectedRequests,
}: Props): JSX.Element {
    const isRequestChanged = !!useSelector((state: RootState) =>
        state.filtrationResult.changedRequestsIds).find(id => id === request.id);
    const statusFetchingRequestDetalization = useSelector((state: RootState) =>
        state.requests.statusFetchingRequestDetalization);

    function onCheckboxClick(): void {
        setSelectedRequests(request.id, request.process_alias);
    }

    function selectRow(): void {
        if (statusFetchingRequestDetalization !== StatusFetching.pending) {
            toggleRowSelection(request.id);
        }
    }

    return React.createElement(FiltrationResultTableTemplateRow, {
        request,
        selectedRequests,
        isRequestChanged,
        requestIdToShowDetalization,
        selectRow,
        onCheckboxClick,
    });
}
