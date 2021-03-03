import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { OperationsTableRowTemplate } from './OperationsTableRowTemplate';
import { MassOperation } from '../../../../../store/types/requestsTypes';
import {
    updateSelectedOperations, selectTableRowId,
} from '../../../../../store/StoreSlices/massOperations';
import { getMassOperationDetalization } from '../../../../../store/StoreSlices/requests';
import { RootState } from '../../../../../store/StoreSlices';

interface Props {
    massOperation: MassOperation
    selectedOperationsIds: number[]
}

export function OperationsTableRowBehavior({
    massOperation,
    selectedOperationsIds,
}: Props): JSX.Element {
    const dispatch = useDispatch();
    const selectedRowId = useSelector((state: RootState) => state.massOperations.selectedTableRowId);

    function setSelectedOperations(): void {
        dispatch(updateSelectedOperations({ id: massOperation.mass_id }));
    }

    function onRowClick(): void {
        if (selectedRowId !== massOperation.mass_id) {
            dispatch(getMassOperationDetalization(massOperation.mass_id));
            dispatch(selectTableRowId({ id: massOperation.mass_id }));
        }
    }

    return React.createElement(OperationsTableRowTemplate, {
        massOperation,
        selectedRowId,
        selectedOperationsIds,
        setSelectedOperations,
        onRowClick,
    });
}
