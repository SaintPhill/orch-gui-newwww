import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePopupVisibility } from '../../../customHooks/usePopupVisibility';

import { ProcessStepsTableTemplate } from './ProcessStepsTableTemplate';
import { RootState } from '../../../../store/StoreSlices';
import { ProcessStepsTableColumnsVisibility } from '../DetalizationBehavior';
import { selectProcessStepRequest } from '../../../../store/StoreSlices/visibility';

type Props = {
    columnsVisibility: ProcessStepsTableColumnsVisibility
};

export function ProcessStepsTableBehavior({ columnsVisibility }: Props): JSX.Element {
    const dispatch = useDispatch();
    const request = useSelector((state: RootState) => state.requests.requestDetalization);
    const selectedProcess = useSelector((state: RootState) => state.visibility.detalization.selectedRequest);
    const [isMoveToStepPopupVisible, openMoveToStepPopup, closeMoveToStepPopup] = usePopupVisibility();
    const [isChangeStatusPopupVisible, openChangeStatusPopup, closeChangeStatusPopup] = usePopupVisibility();

    function selectProcess(id: number, process: string): void {
        if (selectedProcess?.process !== process) {
            dispatch(selectProcessStepRequest({ id, process }));
        }
    }

    return React.createElement(ProcessStepsTableTemplate, {
        request,
        isMoveToStepPopupVisible,
        isChangeStatusPopupVisible,
        selectedProcess,
        columnsVisibility,
        openMoveToStepPopup,
        closeMoveToStepPopup,
        openChangeStatusPopup,
        closeChangeStatusPopup,
        selectProcess,
    });
}
