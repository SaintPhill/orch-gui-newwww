import React, { FormEvent } from 'react';
import classnames from 'classnames';

import { Dropdown, FilterName, SelectOption } from '../Dropdown/Dropdown';
import { Input } from '../../../UI/Input';
import { InputType } from '../../../UI/Input/InputBehavior';
import { SpriteId } from '../../../UI/SvgIcon/SvgIconTemplate';
import { DateRangePicker } from '../DateRangePicker';
import { TransactionLogFilters, WorkWithRequestFilters } from '../../../../store/StoreSlices/selectedFilters';
import { Duration } from '../Duration';
import { FlexibleSearch } from '../FlexibleSearch';
import { MainLayoutState } from '../../../../store/StoreSlices/visibility';

interface Props {
    workWithRequestsFilters: WorkWithRequestFilters
    statusSelectOptions: string[]
    processStepSelectOptions: SelectOption[]
    processSelectOptions: SelectOption[]
    stepStatusSelectOptions: string[]
    stepErrorCodeOptions: string[]
    operationTypesSelectOptions: string[]
    availableFilters: FilterName[]
    mainLayoutState: MainLayoutState
    transactionLogFilters: TransactionLogFilters
    setProcess(value: string): void
    setProcessStep(value: SelectOption[]): void
    setProcessStatus(value: SelectOption[]): void
    setStepStatuses(value: SelectOption[]): void
    setStepErrorCodes(value: SelectOption[]): void
    setOperationType(value: string): void
    handleRequestIdInput(event: React.FormEvent<HTMLInputElement>): void
    clearRequestIdInput(): void
    handleSmartCardIdInput(event: React.FormEvent<HTMLInputElement>): void
    clearSmartCardIdInput(): void
    handleSapIdInput(event: React.FormEvent<HTMLInputElement>): void
    clearSapIdInput(): void
    handleOperationIdInput(event: React.FormEvent<HTMLInputElement>): void
    clearOperationIdInput(): void
    handleTransactionLogRequestIdInput(event: React.FormEvent<HTMLInputElement>): void
    clearTransactionLogRequestIdInput(): void
    handleRegistrationDate(dates: any): void
    handleStepTime(dates: any): void
    deleteFilter(filterName: FilterName): void
    submitFilters(event: FormEvent<HTMLFormElement>): void
}

export function FiltersListTemplate({
    workWithRequestsFilters,
    transactionLogFilters,
    availableFilters,
    mainLayoutState,
    setProcess,
    setProcessStep,
    setProcessStatus,
    setOperationType,
    handleRequestIdInput,
    clearRequestIdInput,
    handleSapIdInput,
    clearSapIdInput,
    handleStepTime,
    handleSmartCardIdInput,
    clearSmartCardIdInput,
    handleOperationIdInput,
    clearOperationIdInput,
    handleTransactionLogRequestIdInput,
    clearTransactionLogRequestIdInput,
    handleRegistrationDate,
    setStepStatuses,
    setStepErrorCodes,
    statusSelectOptions,
    processStepSelectOptions,
    processSelectOptions,
    stepStatusSelectOptions,
    stepErrorCodeOptions,
    operationTypesSelectOptions,
    deleteFilter,
    submitFilters,
}: Props): JSX.Element {
    const ROOT_CLASS = 'filters-list';

    const workWithRequestsFiltersClass = classnames(
        `${ROOT_CLASS}__work-with-requests-filters`,
        {
            [`${ROOT_CLASS}__work-with-requests-filters_hidden`]: mainLayoutState !== MainLayoutState.workWithRequests,
        }
    );

    const transactionLogFiltersClass = classnames(
        `${ROOT_CLASS}__transaction-log-filters`,
        {
            [`${ROOT_CLASS}__transaction-log-filters_hidden`]: mainLayoutState !== MainLayoutState.transactionLog,
        }
    );

    return (
        <form className={ROOT_CLASS} onSubmit={submitFilters}>
            <div className={workWithRequestsFiltersClass}>
                {
                    availableFilters.includes(FilterName.requestId) &&
                    <Input
                        blockClass={ROOT_CLASS}
                        label={FilterName.requestId}
                        onChange={handleRequestIdInput}
                        type={InputType.Text}
                        placeHolder={'Ввести'}
                        value={workWithRequestsFilters.requestId}
                        deleteSvgId={SpriteId.blackCruce}
                        deleteItSelf={deleteFilter}
                        onClearSvgClick={clearRequestIdInput}
                    />
                }
                {availableFilters.includes(FilterName.smartCardId) &&
                    <Input
                        blockClass={ROOT_CLASS}
                        onChange={handleSmartCardIdInput}
                        type={InputType.Text}
                        placeHolder={'Ввести'}
                        label={FilterName.smartCardId}
                        value={workWithRequestsFilters.smartCardId}
                        deleteSvgId={SpriteId.blackCruce}
                        deleteItSelf={deleteFilter}
                        onClearSvgClick={clearSmartCardIdInput}
                    />
                }
                {availableFilters.includes(FilterName.sapId) &&
                    <Input
                        blockClass={ROOT_CLASS}
                        onChange={handleSapIdInput}
                        type={InputType.Text}
                        placeHolder={'Ввести'}
                        label={FilterName.sapId}
                        value={workWithRequestsFilters.sapId}
                        deleteSvgId={SpriteId.blackCruce}
                        deleteItSelf={deleteFilter}
                        onClearSvgClick={clearSapIdInput}
                    />
                }
                {availableFilters.includes(FilterName.duration) &&
                    <Duration deleteItSelf={deleteFilter} />
                }
                {availableFilters.includes(FilterName.flexibleSearch) &&
                    <FlexibleSearch deleteItSelf={deleteFilter} />
                }
                {availableFilters.includes(FilterName.registrationDate) &&
                    <DateRangePicker
                        dates={workWithRequestsFilters.registrationDate}
                        label={FilterName.registrationDate}
                        handleDate={handleRegistrationDate}
                        deleteItSelf={deleteFilter}
                    />
                }
                {availableFilters.includes(FilterName.stepTime) &&
                    <DateRangePicker
                        dates={workWithRequestsFilters.stepTime}
                        label={FilterName.stepTime}
                        handleDate={handleStepTime}
                        deleteItSelf={deleteFilter}
                    />
                }
                {availableFilters.includes(FilterName.process) &&
                    <Dropdown
                        isRemovable
                        filterName={FilterName.process}
                        value={workWithRequestsFilters.process}
                        setValue={setProcess}
                        selectOptions={processSelectOptions}
                        deleteItSelf={deleteFilter}
                    />
                }
                {availableFilters.includes(FilterName.processStep) &&
                    <Dropdown
                        isMulti
                        isRemovable
                        filterName={FilterName.processStep}
                        value={workWithRequestsFilters.processSteps}
                        setValue={setProcessStep}
                        selectOptions={processStepSelectOptions}
                        isDisabled={!workWithRequestsFilters.process}
                        placeholder={!workWithRequestsFilters.process ? 'Нужно выбрать процесс' : 'Выберите'}
                        deleteItSelf={deleteFilter}
                    />
                }
                {availableFilters.includes(FilterName.processStatus) &&
                    <Dropdown
                        isMulti
                        isRemovable
                        filterName={FilterName.processStatus}
                        value={workWithRequestsFilters.processStatuses}
                        setValue={setProcessStatus}
                        selectOptions={statusSelectOptions}
                        deleteItSelf={deleteFilter}
                    />
                }
                {availableFilters.includes(FilterName.stepStatus) &&
                    <Dropdown
                        isMulti
                        isRemovable
                        filterName={FilterName.stepStatus}
                        value={workWithRequestsFilters.stepStatuses}
                        setValue={setStepStatuses}
                        selectOptions={stepStatusSelectOptions}
                        deleteItSelf={deleteFilter}
                    />
                }
                {availableFilters.includes(FilterName.stepErrorCode) &&
                    <Dropdown
                        isMulti
                        isRemovable
                        filterName={FilterName.stepErrorCode}
                        value={workWithRequestsFilters.stepErrorCodes}
                        setValue={setStepErrorCodes}
                        selectOptions={stepErrorCodeOptions}
                        deleteItSelf={deleteFilter}
                    />
                }
            </div>

            {mainLayoutState === MainLayoutState.transactionLog &&
                <div className={transactionLogFiltersClass}>
                    <Input
                        blockClass={ROOT_CLASS}
                        label={FilterName.operationId}
                        onChange={handleOperationIdInput}
                        type={InputType.Text}
                        placeHolder={'Ввести'}
                        value={transactionLogFilters.operationId}
                        onClearSvgClick={clearOperationIdInput}
                    />
                    <Dropdown
                        filterName={FilterName.operationType}
                        value={transactionLogFilters.operationType}
                        setValue={setOperationType}
                        selectOptions={operationTypesSelectOptions}
                    />
                    <Input
                        blockClass={ROOT_CLASS}
                        label={FilterName.requestId}
                        onChange={handleTransactionLogRequestIdInput}
                        type={InputType.Text}
                        placeHolder={'Ввести'}
                        value={transactionLogFilters.requestId}
                        onClearSvgClick={clearTransactionLogRequestIdInput}
                    />
                </div>
            }
        </form>
    );
}
