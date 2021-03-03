import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ParametersTableTemplate } from './ParametersTableTemplate';
import { RootState } from '../../../../store/StoreSlices';
import { RequestParameter } from '../../../../store/types/requestsTypes';
import { selectParameterId } from '../../../../store/StoreSlices/visibility';

export function ParametersTableBehavior(): JSX.Element {
    const dispatch = useDispatch();
    const requestParams = useSelector((state: RootState) =>
        state.requests.requestDetalization)?.parameters || null;
    const selectedParameter = useSelector((state: RootState) => state.visibility.detalization.selectedParameter);
    const [isChangeParameterPopupVisible, setIsChangeParameterPopupVisibleFlag] = useState(false);

    function openChangeParameterPopup(): void {
        setIsChangeParameterPopupVisibleFlag(true);
    }
    function closeChangeParameterPopup(): void {
        setIsChangeParameterPopupVisibleFlag(false);
    }

    function selectParameter(parameter: RequestParameter): void {
        if (parameter.id !== selectedParameter?.id) {
            dispatch(selectParameterId(parameter));
        }
    }

    return React.createElement(ParametersTableTemplate, {
        requestParams,
        selectedParameter,
        isChangeParameterPopupVisible,
        selectParameter,
        openChangeParameterPopup,
        closeChangeParameterPopup,
    });
}

