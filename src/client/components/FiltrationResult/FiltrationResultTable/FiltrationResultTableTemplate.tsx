import React from 'react';
import { Spin } from 'antd';

import { Checkbox } from '../../../UI/Checkbox';
import { Request } from '../../../../store/types/requestsTypes';
import { FiltrationResultTableRow } from './FiltrationResultTableRow';
import { StatusFetching } from '../../../../store/StoreSlices/filtersOptions';
import { TableWrapper } from '../../../UI/TableComponents/TableWrapper';
import { CheckboxTheme } from '../../../UI/Checkbox/CheckboxTemplate';
import { SelectedRequest } from '../../../../store/StoreSlices/filtrationResult';
import { TableStickyHeader } from '../../../UI/TableComponents/TableStickyHeader';
import { TableRow } from '../../../UI/TableComponents/TableRow';
import './FiltrationResultTable.scss';

interface Props {
    requests: Request[] | null
    requestIdToShowDetalization: number | null
    selectedRequests: SelectedRequest[]
    isAllRequestsSelected: boolean
    statusFetchingFiltrationResult: StatusFetching
    statusFetchingRequestDetalization: StatusFetching
    selectAllRequests(): void
    toggleRowSelection(requestId: number): void
    removeSelectionFromAllRequests(): void
    setSelectedRequests(id: number, process: string): void
}


export function FiltrationResultTableTemplate({
    requests,
    requestIdToShowDetalization,
    setSelectedRequests,
    selectedRequests,
    isAllRequestsSelected,
    selectAllRequests,
    statusFetchingFiltrationResult,
    statusFetchingRequestDetalization,
    toggleRowSelection,
    removeSelectionFromAllRequests,
}: Props): JSX.Element {
    const ROOT_CLASS = 'filtration-result-table';
    const isAtLeastOneRequestSelected = selectedRequests.length > 0;

    let checkboxTheme: CheckboxTheme;
    if (!isAllRequestsSelected && isAtLeastOneRequestSelected) {
        checkboxTheme = CheckboxTheme.intermediate;
    } else if (isAllRequestsSelected) {
        checkboxTheme = CheckboxTheme.blue;
    } else {
        checkboxTheme = CheckboxTheme.hasNoTheme;
    }

    return (
        <TableWrapper isFiltrationResultTable>
            <table className={ROOT_CLASS}>
                <thead>
                    <TableRow
                        onClick={isAllRequestsSelected ?
                            removeSelectionFromAllRequests : selectAllRequests}
                        isCursorPointer
                    >
                        <TableStickyHeader>
                            <Checkbox
                                theme={checkboxTheme}
                                isChecked={isAllRequestsSelected}
                            />
                        </TableStickyHeader>
                        <TableStickyHeader>id заявки</TableStickyHeader>
                        <TableStickyHeader>Дата регистрации</TableStickyHeader>
                        <TableStickyHeader>Статус заявки</TableStickyHeader>
                        <TableStickyHeader>Псевдоним процесса</TableStickyHeader>
                        <TableStickyHeader>Шаг</TableStickyHeader>
                        <TableStickyHeader>Ошибка</TableStickyHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {statusFetchingFiltrationResult === StatusFetching.pending &&
                        <tr className={`${ROOT_CLASS}__loading-spinner`}><td><Spin size={'large'} /></td></tr>
                    }

                    {statusFetchingFiltrationResult === StatusFetching.fulfilled &&
                        requests && requests.map((request, index) =>
                        <FiltrationResultTableRow
                            requestIdToShowDetalization={requestIdToShowDetalization}
                            toggleRowSelection={toggleRowSelection}
                            statusFetchingRequestDetalization={statusFetchingRequestDetalization}
                            selectedRequests={selectedRequests}
                            setSelectedRequests={setSelectedRequests}
                            request={request}
                            key={index}
                        />
                    )}
                </tbody>
            </table>
        </TableWrapper>
    );
}
