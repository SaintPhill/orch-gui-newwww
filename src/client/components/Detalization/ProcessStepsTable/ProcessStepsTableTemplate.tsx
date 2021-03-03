import React from 'react';

import { RequestById } from '../../../../store/types/requestsTypes';
import { ButtonTheme } from '../../../UI/Button/ButtonTemplate';
import { Button } from '../../../UI/Button';
import { TableWrapper } from '../../../UI/TableComponents/TableWrapper';
import { MoveToStepPopup } from '../../../UI/MoveToStepPopup';
import { ChangeStatusPopup } from '../../../UI/ChangeStatusPopup';
import { ProcessStepsTableColumnsVisibility } from '../DetalizationBehavior';
import { SelectedRequest } from '../../../../store/StoreSlices/filtrationResult';
import { TableStickyHeader } from '../../../UI/TableComponents/TableStickyHeader';
import { ProcessStepsTableRow } from './ProcessStepsRow';
import { TableRow } from '../../../UI/TableComponents/TableRow';
import './ProcessSteps.scss';

type Props = {
    request: RequestById | null
    isMoveToStepPopupVisible: boolean
    isChangeStatusPopupVisible: boolean
    selectedProcess: SelectedRequest | null
    columnsVisibility: ProcessStepsTableColumnsVisibility
    openMoveToStepPopup(): void
    closeMoveToStepPopup(): void
    openChangeStatusPopup(): void
    closeChangeStatusPopup(): void
    selectProcess(id: number, alias: string): void
};

export function ProcessStepsTableTemplate({
    request,
    isMoveToStepPopupVisible,
    isChangeStatusPopupVisible,
    columnsVisibility,
    selectProcess,
    selectedProcess,
    closeMoveToStepPopup,
    openMoveToStepPopup,
    closeChangeStatusPopup,
    openChangeStatusPopup,
}: Props): JSX.Element {
    const ROOT_CLASS = 'process-steps-table';

    return (
        <>
            <TableWrapper isDetalizationTable>
                <table className={ROOT_CLASS}>
                    <thead>
                        <TableRow>
                            <TableStickyHeader />
                            <TableStickyHeader>ID заявки</TableStickyHeader>
                            <TableStickyHeader>Процесс</TableStickyHeader>

                            {columnsVisibility.registrationDate &&
                                <TableStickyHeader>Дата регистрации</TableStickyHeader>
                            }

                            <TableStickyHeader isNarrow>Статус</TableStickyHeader>

                            {columnsVisibility.stepNumber &&
                                <TableStickyHeader isNarrow>
                                    №
                                </TableStickyHeader>
                            }

                            {columnsVisibility.step &&
                                <TableStickyHeader>Шаг</TableStickyHeader>
                            }
                            {columnsVisibility.stepAlias &&
                                <TableStickyHeader>Step</TableStickyHeader>
                            }

                            <TableStickyHeader>Время выполнения</TableStickyHeader>

                            {columnsVisibility.error &&
                                <TableStickyHeader>Ошибка</TableStickyHeader>
                            }
                            {columnsVisibility.errorCode &&
                                <TableStickyHeader>Код ошибки</TableStickyHeader>
                            }
                        </TableRow>
                    </thead>
                    <tbody>
                        {request && selectedProcess &&
                            <ProcessStepsTableRow
                                request={request}
                                selectedProcess={selectedProcess}
                                selectProcess={selectProcess}
                                columnsVisibility={columnsVisibility}
                            />
                        }
                    </tbody>
                </table>
            </TableWrapper>

            <div className={`${ROOT_CLASS}__action-buttons`}>
                <Button
                    onClick={openChangeStatusPopup}
                    theme={ButtonTheme.white}
                    className={`${ROOT_CLASS}__button`}
                >
                    Изменить статус
                </Button>
                <Button
                    onClick={openMoveToStepPopup}
                    theme={ButtonTheme.white}
                    className={`${ROOT_CLASS}__button`}
                >
                    Перевести на шаг
                </Button>
            </div>

            {isMoveToStepPopupVisible &&
                <MoveToStepPopup
                    selectedProcess={selectedProcess?.process}
                    closeItSelf={closeMoveToStepPopup}
                />
            }

            {isChangeStatusPopupVisible &&
                <ChangeStatusPopup
                    closeItSelf={closeChangeStatusPopup}
                />
            }
        </>
    );
}
