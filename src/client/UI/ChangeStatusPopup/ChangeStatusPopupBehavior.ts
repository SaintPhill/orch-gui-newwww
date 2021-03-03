import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePopupVisibility } from '../../customHooks/usePopupVisibility';

import { ChangeStatusPopupTemplate } from './ChangeStatusPopupTemplate';
import { singleChangeProcessStatus, massChangeProcessStatus } from '../../../store/StoreSlices/requests';
import { RootState } from '../../../store/StoreSlices';

interface Props {
    isMassOperation?: boolean
    closeItSelf(): void
}

export function ChangeStatusPopupBehavior({
    closeItSelf,
    isMassOperation,
}: Props): JSX.Element {
    const dispatch = useDispatch();
    const [selectedStatus, setSelectedStatus] = useState('');
    const statuses = ['ERROR','MANUAL', 'PROCESSING', 'SUCCESS'];
    const selectedRequests = useSelector((state: RootState) =>
        state.filtrationResult.selectedRequests).map(request => request.id);
    const selectedRequest = useSelector((state: RootState) =>
        state.filtrationResult.requestIdToChange);
    const [isConfirmPopupVisible, openConfirmPopup, closeConfirmPopup] = usePopupVisibility();

    function selectStatus(status: string): void {
        setSelectedStatus(status);
    }

    function confirmStatusChange(): void {
        if (isMassOperation) {
            dispatch(massChangeProcessStatus({ ids: selectedRequests, status: selectedStatus }));
        } else {
            dispatch(singleChangeProcessStatus({ id: selectedRequest, status: selectedStatus }));
        }
        closeItSelf();
    }

    return React.createElement(ChangeStatusPopupTemplate, {
        statuses,
        isConfirmPopupVisible,
        closeItSelf,
        selectedStatus,
        closeConfirmPopup,
        openConfirmPopup,
        selectStatus,
        confirmStatusChange,
    });
}
