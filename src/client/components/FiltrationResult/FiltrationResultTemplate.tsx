import React from 'react';
import classNames from 'classnames';
import { Pagination } from 'antd';

import { Button } from '../../UI/Button';
import { ButtonTheme } from '../../UI/Button/ButtonTemplate';
import { SpriteId } from '../../UI/SvgIcon/SvgIconTemplate';
import { Request } from '../../../store/types/requestsTypes';
import { FiltrationResultTable } from './FiltrationResultTable';
import { SvgIcon } from '../../UI/SvgIcon';
import { Popup } from '../../UI/Popup';
import { MoveToStepPopup } from '../../UI/MoveToStepPopup';
import { ChangeStatusPopup } from '../../UI/ChangeStatusPopup';
import { SelectedRequest, PaginationType } from '../../../store/StoreSlices/filtrationResult';
import { defaultPageSize } from '../../../store/StoreSlices/requests';
import { StatusFetching } from '../../../store/StoreSlices/filtersOptions';
import { PaginationSize } from '../../customHooks/usePaginationSize';
import './FiltrationResult.scss';

interface Props {
    requests: Request[] | null
    pagination: PaginationType
    paginationSize: PaginationSize
    massOperationNumber: string
    selectedRequests: SelectedRequest[]
    isDetalizationHidden: boolean
    isMassOperationSuccessPopupVisible: boolean
    isFiltrationResultHidden: boolean
    isChoseMassOperationPopupVisible: boolean
    isMoveToStepPopupVisible: boolean
    isChangeStatusPopupVisible: boolean
    isMoveToStepButtonDisabled: boolean
    isMassOperationsButtonDisabled: boolean
    statusFetchingFiltrationResult: StatusFetching
    loadXls(): void
    setSelectedRequests(id: number, process: string): void
    changePaginationPage(page: number): void
    toggleTableVisibility(): void
    selectAllRequests(): void
    openMoveToStepPopup(): void
    closeMoveToStepPopup(): void
    openChangeStatusPopup(): void
    closeChangeStatusPopup(): void
    openChoseMassOperationPopup(): void
    closeChoseMassOperationPopup(): void
    closeMassOperationSuccessPopup(): void
    removeSelectionFromAllRequests(): void
}

export function FiltrationResultTemplate({
    requests,
    selectedRequests,
    massOperationNumber,
    paginationSize,
    isDetalizationHidden,
    isMassOperationSuccessPopupVisible,
    isFiltrationResultHidden,
    isMoveToStepButtonDisabled,
    isMassOperationsButtonDisabled,
    isChoseMassOperationPopupVisible,
    statusFetchingFiltrationResult,
    openChoseMassOperationPopup,
    closeMassOperationSuccessPopup,
    closeChoseMassOperationPopup,
    pagination,
    changePaginationPage,
    toggleTableVisibility,
    loadXls,
    selectAllRequests,
    setSelectedRequests,
    removeSelectionFromAllRequests,
    closeMoveToStepPopup,
    openMoveToStepPopup,
    closeChangeStatusPopup,
    openChangeStatusPopup,
    isMoveToStepPopupVisible,
    isChangeStatusPopupVisible,
}: Props): JSX.Element {
    const ROOT_CLASS = 'filtration-result';
    const isAtLeastOneRequestSelected = !!selectedRequests.length;

    const filtrationResultClass = classNames(
        ROOT_CLASS,
        {
            [`${ROOT_CLASS}_hidden`]: isFiltrationResultHidden,
            [`${ROOT_CLASS}_full-screen`]: isDetalizationHidden,
        }
    );
    const toggleIconClass = classNames(
        `${ROOT_CLASS}__toggle-icon`,
        {
            [`${ROOT_CLASS}__toggle-icon_down`]: isFiltrationResultHidden,
        }
    );

    return (
        <div className={filtrationResultClass}>
            <div className={`${ROOT_CLASS}__header`}>
                <h1 className={`${ROOT_CLASS}__title`}>Результаты фильтрации</h1>
                {!isDetalizationHidden &&
                    <SvgIcon
                        onClick={toggleTableVisibility}
                        className={toggleIconClass}
                        spriteId={SpriteId.arrowLeft}
                    />
                }
            </div>

            {!isFiltrationResultHidden &&
                <>
                    <FiltrationResultTable
                        requests={requests}
                        selectedRequests={selectedRequests}
                        selectAllRequests={selectAllRequests}
                        setSelectedRequests={setSelectedRequests}
                        removeSelectionFromAllRequests={removeSelectionFromAllRequests}
                    />
                    <div className={`${ROOT_CLASS}__action-bar`}>
                        <Pagination
                            disabled={statusFetchingFiltrationResult !== StatusFetching.fulfilled}
                            size={paginationSize}
                            hideOnSinglePage
                            current={pagination.pageNumber}
                            total={pagination.totalElements}
                            defaultPageSize={defaultPageSize}
                            onChange={changePaginationPage}
                        />
                        <div className={`${ROOT_CLASS}__action-buttons`}>
                            <Button
                                className={`${ROOT_CLASS}__load-xls-button`}
                                theme={ButtonTheme.white}
                                isDisabled={!isAtLeastOneRequestSelected}
                                onClick={loadXls}
                            >
                                Выгрузить в xls
                            </Button>
                            <Button
                                onClick={openChoseMassOperationPopup}
                                className={`${ROOT_CLASS}__create-mass-operation-button`}
                                theme={ButtonTheme.blue}
                                isDisabled={isMassOperationsButtonDisabled}
                            >
                                <span
                                    title={isMassOperationsButtonDisabled && selectedRequests.length > 1 ?
                                        'Состояние некоторых выбранных заявок изменено' : ''}>
                                    Создать массовую операцию
                                </span>
                            </Button>
                        </div>
                    </div>
                </>
            }

            {isChoseMassOperationPopupVisible &&
                <Popup closeItSelf={closeChoseMassOperationPopup}>
                    <Button
                        onClick={openChangeStatusPopup}
                        className={`${ROOT_CLASS}__mass-operation-button`}
                    >
                        Изменить статус
                    </Button>
                    <Button
                        isDisabled={isMoveToStepButtonDisabled}
                        onClick={openMoveToStepPopup}
                        className={`${ROOT_CLASS}__mass-operation-button`}
                    >
                        <span title={isMoveToStepButtonDisabled ? 'Необходимо выбрать одинаковые процессы' : ''}>
                            Перевести на шаг
                        </span>
                    </Button>
                </Popup>
            }

            {isMoveToStepPopupVisible &&
                <MoveToStepPopup
                    isMassOperation
                    selectedProcess={selectedRequests[0]?.process}
                    closeItSelf={closeMoveToStepPopup}
                />
            }

            {isChangeStatusPopupVisible &&
                <ChangeStatusPopup
                    isMassOperation
                    closeItSelf={closeChangeStatusPopup}
                />
            }

            {isMassOperationSuccessPopupVisible &&
                <Popup closeItSelf={closeMassOperationSuccessPopup}>
                    <div className={`${ROOT_CLASS}__mass-operation-success-popup`}>
                        <p className={`${ROOT_CLASS}__mass-operation-success-popup-title`}>
                            Запущена массовая операция
                        </p>
                        <p>№ {massOperationNumber}</p>
                        <Button
                            className={`${ROOT_CLASS}__mass-operation-success-popup-ok-button`}
                            theme={ButtonTheme.blue}
                            onClick={closeMassOperationSuccessPopup}
                        >
                            Ок
                        </Button>
                    </div>
                </Popup>
            }
        </div>
    );
}
