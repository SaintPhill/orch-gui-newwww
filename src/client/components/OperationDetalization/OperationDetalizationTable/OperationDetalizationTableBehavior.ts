import React from 'react';
import { useSelector } from 'react-redux';

import { OperationDetalizationTableTemplate } from './OperationDetalizationTableTemplate';
import { RootState } from '../../../../store/StoreSlices';

export function OperationDetalizationTableBehavior(): JSX.Element {
    const statusFetching = useSelector((state: RootState) =>
        state.requests.statusFetchingMassOperationDetalization);
    const operationDetalization = useSelector((state: RootState) => state.requests.massOperationDetalization);


    return React.createElement(OperationDetalizationTableTemplate, {
        operationDetalization,
        statusFetching,
    });
}
