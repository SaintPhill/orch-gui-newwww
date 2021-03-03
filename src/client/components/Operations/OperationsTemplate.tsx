import React from 'react';
import classNames from 'classnames';
import { Pagination } from 'antd';

import { Button } from '../../UI/Button';
import { SvgIcon } from '../../UI/SvgIcon';
import { UpdateButton } from '../../UI/UpdateButton';
import { OperationsTable } from './OperationsTable';
import { SpriteId } from '../../UI/SvgIcon/SvgIconTemplate';
import { ButtonTheme } from '../../UI/Button/ButtonTemplate';
import { StatusFetching } from '../../../store/StoreSlices/filtersOptions';
import { defaultPageSize } from '../../../store/StoreSlices/requests';
import { PaginationSize } from '../../customHooks/usePaginationSize';
import { PaginationType } from '../../../store/StoreSlices/filtrationResult';
import './Operations.scss';

interface Props {
    statusFetching: StatusFetching
    pagination: PaginationType
    paginationSize: PaginationSize
    selectedOperationsIds: number[]
    isOperationDetalizationTableHidden: boolean
    isOperationsTableHidden: boolean
    updateTable(): void
    downloadExcel(): void
    changePaginationPage(page: number): void
    toggleTableVisibility(): void
}

export function OperationsTemplate({
    statusFetching,
    pagination,
    paginationSize,
    selectedOperationsIds,
    isOperationDetalizationTableHidden,
    isOperationsTableHidden,
    updateTable,
    downloadExcel,
    changePaginationPage,
    toggleTableVisibility,
}: Props): JSX.Element {
    const ROOT_CLASS = 'operations';

    const filtrationResultClass = classNames(
        ROOT_CLASS,
        {
            [`${ROOT_CLASS}_hidden`]: isOperationsTableHidden,
            [`${ROOT_CLASS}_full-screen`]: isOperationDetalizationTableHidden,
        }
    );
    const toggleIconClass = classNames(
        `${ROOT_CLASS}__toggle-icon`,
        {
            [`${ROOT_CLASS}__toggle-icon_down`]: isOperationsTableHidden,
        }
    );

    return (
        <div className={filtrationResultClass}>
            <div className={`${ROOT_CLASS}__header`}>
                <h1 className={`${ROOT_CLASS}__title`}>Операции</h1>
                {!isOperationDetalizationTableHidden &&
                    <SvgIcon
                        onClick={toggleTableVisibility}
                        className={toggleIconClass}
                        spriteId={SpriteId.arrowLeft}
                    />
                }
                <UpdateButton blockClass={ROOT_CLASS} isDisabled={false} onClick={updateTable} />
            </div>

            {!isOperationsTableHidden &&
                <>
                    <OperationsTable />
                    <div className={`${ROOT_CLASS}__action-bar`}>
                        <Pagination
                            disabled={statusFetching !== StatusFetching.fulfilled}
                            size={paginationSize}
                            hideOnSinglePage
                            current={pagination.pageNumber}
                            total={pagination.totalElements}
                            defaultPageSize={defaultPageSize}
                            onChange={changePaginationPage}
                        />
                        <Button
                            className={`${ROOT_CLASS}__load-xls-button`}
                            theme={ButtonTheme.white}
                            isDisabled={!selectedOperationsIds.length}
                            onClick={downloadExcel}
                        >
                                Выгрузить в xls
                        </Button>
                    </div>
                </>
            }
        </div>
    );
}
