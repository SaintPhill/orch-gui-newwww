import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePopupVisibility } from '../../customHooks/usePopupVisibility';

import { MoveToStepPopupTemplate } from './MoveToStepPopupTemplate';
import { singleChangeProcessStep, massChangeProcessStep } from '../../../store/StoreSlices/requests';
import { ProcessStep } from '../../../store/types/filtersOptionsTypes';
import { filtersOptionsAPI } from '../../../store/RestApi/filtersOptionsAPI';
import { RootState } from '../../../store/StoreSlices';

interface Props {
    isMassOperation?: boolean
    selectedProcess?: string
    closeItSelf(): void
}

export function MoveToStepPopupBehavior({
    closeItSelf,
    isMassOperation,
    selectedProcess,
}: Props): JSX.Element {
    const dispatch = useDispatch();
    const [selectedStep, setSelectedStep] = useState('');
    const selectedRequestsIds = useSelector((state: RootState) =>
        state.filtrationResult.selectedRequests).map(request => request.id);
    const selectedRequest = useSelector((state: RootState) =>
        state.filtrationResult.requestIdToChange);
    const [steps, setSteps] = useState<ProcessStep[] | null>(null);
    const [isConfirmPopupVisible, openConfirmPopup, closeConfirmPopup] = usePopupVisibility();

    function selectStep(stepAlias: string): void {
        setSelectedStep(stepAlias);
    }

    function confirmStepChange(): void {
        if (isMassOperation) {
            dispatch(massChangeProcessStep({ ids: selectedRequestsIds, stepAlias: selectedStep }));
        } else {
            dispatch(singleChangeProcessStep({ id: selectedRequest, stepAlias: selectedStep }));
        }
        closeItSelf();
    }

    useEffect(() => {
        if (selectedProcess) {
            (async () => {
                try {
                    const { data: { steps } } = await filtersOptionsAPI.getStepsByProcess(selectedProcess);
                    setSteps(steps);
                } catch (error) {
                    throw new Error(error);
                }
            })();
        }
    }, [selectedProcess]);

    return React.createElement(MoveToStepPopupTemplate, {
        steps,
        closeItSelf,
        selectedStep,
        isConfirmPopupVisible,
        openConfirmPopup,
        closeConfirmPopup,
        selectStep,
        confirmStepChange,
    });
}
