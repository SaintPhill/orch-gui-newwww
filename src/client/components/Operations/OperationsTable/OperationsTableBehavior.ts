import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { OperationsTableTemplate } from './OperationsTableTemplate';
import { RootState } from '../../../../store/StoreSlices';
import { StatusFetching } from '../../../../store/StoreSlices/filtersOptions';
import { getMassOperationsList } from '../../../../store/StoreSlices/requests';

export function OperationsTableBehavior(): JSX.Element {
    const dispatch = useDispatch();
    const massOperations = useSelector((state: RootState) => state.requests.massOperationsList);
    const statusFetching = useSelector((state: RootState) => state.requests.statusFetchingMassOperationsList);
    const selectedOperationsIds = useSelector((state: RootState) => state.massOperations.selectedOperationsIds);

    useEffect(() => {
        if (statusFetching === StatusFetching.idle) {
            dispatch(getMassOperationsList(0));
        }
    }, [statusFetching, dispatch]);

    return React.createElement(OperationsTableTemplate, {
        massOperations,
        selectedOperationsIds,
        statusFetching,
    });
}
