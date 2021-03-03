import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { RootState } from '../../../../store/StoreSlices';
import { MainLayoutState } from '../../../../store/StoreSlices/visibility';
import './TableWrapper.scss';

interface Props {
    children: React.ReactNode
    isFiltrationResultTable?: boolean
    isDetalizationTable?: boolean
    isOperationsTasksTable?: boolean
    isOperationDetalizationTable?: boolean
}

export function TableWrapperTemplate({
    children,
    isFiltrationResultTable,
    isDetalizationTable,
    isOperationsTasksTable,
    isOperationDetalizationTable,
}: Props): JSX.Element {
    const ROOT_CLASS = 'table-wrapper';
    const mainLayoutState = useSelector((state: RootState) => state.visibility.mainLayoutState);
    const isFiltrationResultHidden =
        useSelector((state: RootState) => state.visibility.isFiltrationResultHidden);
    const isDetalizationHidden = useSelector((state: RootState) => state.visibility.isDetalizationHidden);
    const isOperationsTableHidden =
        useSelector((state: RootState) => state.visibility.isOperationsTableHidden);
    const isOperationDetalizationTableHidden =
        useSelector((state: RootState) => state.visibility.isOperationDetalizationTableHidden);
    const isFiltersHidden = useSelector((state: RootState) => state.visibility.isFiltersHidden);
    const isFiltrationResultRaisedHeight = isDetalizationHidden && isFiltrationResultTable;
    const isMassOperationTasksTableRaisedHeight = isOperationDetalizationTableHidden && isOperationsTasksTable;
    const wrapperClassName = classNames(
        ROOT_CLASS,
        {
            [`${ROOT_CLASS}-operations`]: mainLayoutState === MainLayoutState.transactionLog,
            [`${ROOT_CLASS}-filtration-result`]: isFiltrationResultTable,
            [`${ROOT_CLASS}_raised-width`]: isFiltersHidden || mainLayoutState === MainLayoutState.transactionLog,
            [`${ROOT_CLASS}_raised-height`]: isFiltrationResultRaisedHeight || isMassOperationTasksTableRaisedHeight,
            [`${ROOT_CLASS}-detalization_raised-height`]: isFiltrationResultHidden && isDetalizationTable,
            [`${ROOT_CLASS}-operation-detalization_raised-height`]: isOperationsTableHidden &&
                isOperationDetalizationTable,
        }
    );

    return (
        <div className={wrapperClassName}>
            {children}
        </div>
    );
}
