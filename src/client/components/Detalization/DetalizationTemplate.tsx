import React, { useCallback } from 'react';
import classNames from 'classnames';
import { Spin } from 'antd';

import { Button } from '../../UI/Button';
import { ProcessStepsTableColumnsVisibility } from './DetalizationBehavior';
import { StatusFetching } from '../../../store/StoreSlices/filtersOptions';
import { ParametersTable } from './ParametersTable';
import { SvgIcon } from '../../UI/SvgIcon';
import { ProcessStepsTable } from './ProcessStepsTable';
import { SpriteId } from '../../UI/SvgIcon/SvgIconTemplate';
import { ProcessStepsColumnsController } from './ProcessStepsColumnsController';
import { SuccessMessage } from '../../UI/SuccessMessage';
import { TableColumnsNames } from './ProcessStepsColumnsController/ProcessStepsColumnsControllerBehavior';
import { UpdateButton } from '../../UI/UpdateButton';
import { DetalizationTable } from '../../../store/StoreSlices/visibility';
import 'antd/lib/spin/style/index.css';
import './Detalization.scss';

interface Props {
    selectedTable: DetalizationTable
    updateButtonState: {
        isPulsing: boolean
        isDisabled: boolean
    }
    isDetalizationHidden: boolean
    isFiltrationResultHidden: boolean
    isDetalizationTableShown: boolean
    isSingleOperationSuccessful: boolean
    isProcessStepsTableColumnsControllerVisible: boolean
    processStepsTableColumnsVisibility: ProcessStepsTableColumnsVisibility
    statusFetching: StatusFetching
    updateTable(): void
    onToggleIconCLick(): void
    switchTable(tableName: DetalizationTable): void
    showProcessStepsTableColumnsController(): void
    hideProcessStepsTableColumnsController(): void
    setProcessStepsTableColumnsVisibility(columnName: TableColumnsNames): void
}

export function DetalizationTemplate({
    selectedTable,
    switchTable,
    statusFetching,
    updateButtonState,
    isFiltrationResultHidden,
    isDetalizationHidden,
    isDetalizationTableShown,
    isSingleOperationSuccessful,
    isProcessStepsTableColumnsControllerVisible,
    onToggleIconCLick,
    showProcessStepsTableColumnsController,
    hideProcessStepsTableColumnsController,
    updateTable,
    setProcessStepsTableColumnsVisibility,
    processStepsTableColumnsVisibility,
}: Props): JSX.Element {
    const ROOT_CLASS = 'detalization';
    const isProcessStepsTableSelected = selectedTable === DetalizationTable.processSteps;
    const isParametersTableSelected = selectedTable === DetalizationTable.parameters;

    const onParamsButtonClick = useCallback(() => {
        switchTable(DetalizationTable.parameters);
    }, [switchTable]);
    const onProcessStepsButtonClick = useCallback(() => {
        switchTable(DetalizationTable.processSteps);
    }, [switchTable]);

    const detalizationClassName = classNames(
        ROOT_CLASS,
        {
            [`${ROOT_CLASS}_full-screen`]: isFiltrationResultHidden,
            [`${ROOT_CLASS}_hidden`]: isDetalizationHidden,
        }
    );

    const parametersButtonClass = classNames(
        `${ROOT_CLASS}__choose-table-button`,
        {
            [`${ROOT_CLASS}__choose-table-button_selected`]: isParametersTableSelected,
        }
    );
    const processStepsButtonClass = classNames(
        `${ROOT_CLASS}__choose-table-button`,
        {
            [`${ROOT_CLASS}__choose-table-button_selected`]: isProcessStepsTableSelected,
        }
    );

    const toggleIconClass = classNames(
        `${ROOT_CLASS}__toggle-visibility-icon`,
        {
            [`${ROOT_CLASS}__toggle-visibility-icon_up`]: isDetalizationHidden,
        }
    );

    const isReadyToShowTable = statusFetching === StatusFetching.fulfilled && isDetalizationTableShown
        && !isDetalizationHidden;

    return (
        <div className={detalizationClassName}>
            <header className={`${ROOT_CLASS}__header`}>
                <h1 className={`${ROOT_CLASS}__title`}>Детализация</h1>
                {!isFiltrationResultHidden &&
                    <SvgIcon
                        onClick={onToggleIconCLick}
                        className={toggleIconClass}
                        spriteId={SpriteId.arrowLeft}
                    />
                }
                <SuccessMessage isShown={isSingleOperationSuccessful} blockClass={ROOT_CLASS}/>
                <div className={`${ROOT_CLASS}__choose-table-buttons-wrapper`}>
                    <div className={`${ROOT_CLASS}__choose-table-buttons`}>
                        <Button onClick={onParamsButtonClick} className={parametersButtonClass}>
                            Параметры
                        </Button>
                        <Button onClick={onProcessStepsButtonClick} className={processStepsButtonClass}>
                            Шаги процесса
                        </Button>
                    </div>
                    <div className={`${ROOT_CLASS}__action-block`}>
                        <span title={'Обновить'}>
                            <UpdateButton
                                onClick={updateTable}
                                isDisabled={updateButtonState.isDisabled}
                                isPulsing={updateButtonState.isPulsing}
                            />
                        </span>

                        {isProcessStepsTableSelected &&
                            <SvgIcon
                                onMouseEnter={showProcessStepsTableColumnsController}
                                className={`${ROOT_CLASS}__menu-icon`}
                                spriteId={SpriteId.menu}
                            />
                        }
                        {isProcessStepsTableColumnsControllerVisible &&
                            <ProcessStepsColumnsController
                                closeItSelf={hideProcessStepsTableColumnsController}
                                columnsVisibility={processStepsTableColumnsVisibility}
                                setColumnsVisibility={setProcessStepsTableColumnsVisibility}
                            />
                        }
                    </div>
                </div>
            </header>

            {statusFetching === StatusFetching.pending && isDetalizationTableShown &&
                <div className={`${ROOT_CLASS}__loading-spinner`}><Spin size={'large'} /></div>}

            {isReadyToShowTable && isParametersTableSelected && <ParametersTable />}

            {isReadyToShowTable && isProcessStepsTableSelected &&
                <ProcessStepsTable columnsVisibility={processStepsTableColumnsVisibility} />}
        </div>
    );
}
