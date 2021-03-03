import React from 'react';

import { ParametersTableRow } from './ParametersTableRow';
import { RequestParameter } from '../../../../store/types/requestsTypes';
import { ButtonTheme } from '../../../UI/Button/ButtonTemplate';
import { Button } from '../../../UI/Button';
import { TableWrapper } from '../../../UI/TableComponents/TableWrapper';
import { ChangeParametersPopup } from './ChangeParameterPopup';
import { TableStickyHeader } from '../../../UI/TableComponents/TableStickyHeader';
import { TableRow } from '../../../UI/TableComponents/TableRow';
import './ParametersTable.scss';

interface Props {
    requestParams: RequestParameter[] | null
    selectedParameter: RequestParameter | null
    isChangeParameterPopupVisible: boolean
    selectParameter(parameter: RequestParameter): void
    openChangeParameterPopup(): void
    closeChangeParameterPopup(): void
}

export function ParametersTableTemplate({
    requestParams,
    isChangeParameterPopupVisible,
    selectParameter,
    selectedParameter,
    openChangeParameterPopup,
    closeChangeParameterPopup,
}: Props): JSX.Element {
    const ROOT_CLASS = 'parameters-table';

    return (
        <>
            <TableWrapper isDetalizationTable>
                <table className={ROOT_CLASS}>
                    <thead>
                        <TableRow>
                            <TableStickyHeader />
                            <TableStickyHeader>ID</TableStickyHeader>
                            <TableStickyHeader>Имя параметра</TableStickyHeader>
                            <TableStickyHeader>Тип значения</TableStickyHeader>
                            <TableStickyHeader>Значение</TableStickyHeader>
                        </TableRow>
                    </thead>
                    <tbody>
                        {selectedParameter && requestParams && requestParams.map((parameter, index) =>
                            <ParametersTableRow
                                parameter={parameter}
                                selectedParameter={selectedParameter}
                                selectParameter={selectParameter}
                                key={index}
                            />
                        )}
                    </tbody>
                </table>
            </TableWrapper>
            <Button
                onClick={openChangeParameterPopup}
                theme={ButtonTheme.blue}
                className={`${ROOT_CLASS}__change-parameter-button`}
            >
                Изменить параметр
            </Button>

            {isChangeParameterPopupVisible && selectedParameter &&
                <ChangeParametersPopup
                    closeItSelf={closeChangeParameterPopup}
                    parameter={selectedParameter}
                />
            }
        </>
    );
}
