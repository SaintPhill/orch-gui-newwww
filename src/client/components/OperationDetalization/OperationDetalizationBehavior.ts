import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store/StoreSlices';
import { OperationDetalizationTemplate } from './OperationDetalizationTemplate';
import { toggleMassOperationsDetalizationVisibility } from '../../../store/StoreSlices/visibility';


export function OperationDetalizationBehavior(): JSX.Element {
    const dispatch = useDispatch();
    const isOperationsTableHidden = useSelector((state: RootState) => state.visibility.isOperationsTableHidden);
    const isOperationDetalizationTableHidden =
        useSelector((state: RootState) => state.visibility.isOperationDetalizationTableHidden);

    function toggleTableVisibility(): void {
        dispatch(toggleMassOperationsDetalizationVisibility());
    }

    return React.createElement(OperationDetalizationTemplate, {
        isOperationsTableHidden,
        isOperationDetalizationTableHidden,
        toggleTableVisibility,
    });
}
