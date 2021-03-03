import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePopupVisibility } from '../../../../customHooks/usePopupVisibility';

import { ChangeParameterPopupTemplate } from './ChangeParameterPopupTemplate';
import { RequestParameter } from '../../../../../store/types/requestsTypes';
import { changeRequestParameter } from '../../../../../store/StoreSlices/requests';
import { RootState } from '../../../../../store/StoreSlices';

type Props = {
    parameter: RequestParameter
    closeItSelf(): void
};

export function ChangeParameterPopupBehavior({
    parameter,
    closeItSelf,
}: Props): JSX.Element {
    const dispatch = useDispatch();
    const requestIdToChange = useSelector((state: RootState) => state.filtrationResult.requestIdToChange);
    const [parameterValue, setParameterValue] = useState(parameter.value);
    const [isConfirmPopupVisible, openConfirmPopup, closeConfirmPopup] = usePopupVisibility();

    function isValidParameterValue(value: string): boolean {
        const regExp = /[ЁА-яё]/g;

        return value.search(regExp) === -1;
    }

    function handleParameterValue(event: React.ChangeEvent<HTMLTextAreaElement>): void {
        const { value } = event.target;
        if (isValidParameterValue(value)) {
            setParameterValue(value);
        }
    }
    function confirmParameterChange(): void {
        dispatch(changeRequestParameter({
            requestId: requestIdToChange,
            parameterId: parameter.id,
            parameter: parameterValue,
        }));
        closeItSelf();
    }


    return React.createElement(ChangeParameterPopupTemplate, {
        isConfirmPopupVisible,
        parameter,
        parameterValue,
        closeItSelf,
        openConfirmPopup,
        closeConfirmPopup,
        handleParameterValue,
        confirmParameterChange,
    });
}
