import React, { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Select, { IndicatorProps, ValueType } from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { SvgIcon } from '../../../UI/SvgIcon';
import { SpriteId } from '../../../UI/SvgIcon/SvgIconTemplate';
import { workWithRequestsFilters } from '../../../../store/StoreSlices/selectedFilters';
import './customStyles.scss';
import './customStylesMultiSelect.scss';

export interface SelectOption {
    label: string
    value: string
    alias?: string
}

export enum FilterName {
    process = 'Процесс',
    processStatus = 'Статус процесса',
    processStep = 'Шаг процесса',
    addFilter = 'Добавить фильтр',
    registrationDate = 'Дата регистрации',
    smartCardId = 'Id смарт карты',
    requestId = 'Id заявки',
    sapId = 'SAP id',
    stepTime = 'Дата / время шага',
    stepStatus = 'Статус шага',
    stepErrorCode = 'Код ошибки шага',
    duration = 'Длительность',
    flexibleSearch = 'Гибкий поиск',
    operationId = 'Id операции',
    operationType = 'Тип операции',
    initiator = 'Инициатор',
}

interface Props {
    filterName: FilterName
    value: string | string[]
    placeholder?: string
    selectOptions: SelectOption[] | string[]
    isMulti?: boolean
    isCreatable?: boolean
    isDisabled?: boolean
    isRemovable?: boolean
    isHasCheckbox?: boolean
    setValue(value: string | SelectOption[]): void
    onCreateOption?(value: string): void
    deleteItSelf?(filterName: FilterName): void
}

// eslint-disable-next-line
export function Dropdown({
    filterName,
    value,
    setValue,
    placeholder,
    selectOptions,
    isMulti,
    isDisabled,
    isCreatable,
    isRemovable,
    onCreateOption,
    deleteItSelf,
}: Props): JSX.Element {
    const [isMenuOpen, toggleMenu] = useState(false);
    const [isRedPlaceholder, togglePlaceholder] = useState(false);
    const { process } = useSelector(workWithRequestsFilters);

    const clearIndicator = useCallback(
        (props: IndicatorProps<any>) => {
            const {
                children = <SvgIcon className={'Select__clear-indicator'} spriteId={SpriteId.clearIndicator} />,
                innerProps: { ref, ...restInnerProps },
            } = props;
            return (
                <div{...restInnerProps} ref={ref}>
                    {children}
                </div>
            );
        },
        [],
    );

    function handleSelectChanges(event: ValueType<SelectOption>): void {
        const value = event as SelectOption;

        if (isMulti) {
            const value = event as SelectOption[];
            setValue(value);
        } else if (!value) {
            setValue('');
        } else {
            setValue(value.value);
        }
    }

    function onDeleteSvgClick(): void {
        if (deleteItSelf) {
            deleteItSelf(filterName);
        }
    }
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => onDeleteSvgClick, []);

    function onMenuOpen(): void {
        toggleMenu(true);
    }

    useEffect(() => {
        if (isMenuOpen) {
            const multiSelectMenu = document.querySelector('.Multi-select__menu');
            const selectMenu = document.querySelector('.Select__menu');
            if (multiSelectMenu) {
                multiSelectMenu.scrollIntoView();
            }
            if (selectMenu) {
                selectMenu.scrollIntoView();
            }
        }
    }, [isMenuOpen]);

    function onMenuClose(): void {
        toggleMenu(false);
    }

    function showNoOptionsMessage(): string {
        return 'Нет совпадений';
    }

    function showCreateIfNoOptionsMessage(): string {
        return 'Добавить тип поиска';
    }

    function serializeValue(value: string | string[]): SelectOption | SelectOption[] | null {
        if (Array.isArray(value)) {
            return value.map(item => ({ value: item, label: item }));
        }
        if (value) {
            return { value, label: value };
        }

        return null;
    }

    function serializeOptions(options: string[] | SelectOption[]): SelectOption[] {
        if (typeof options[0] === 'string') {
            return (options as string[]).map((option: string) => (
                {
                    value: option,
                    label: option,
                }));
        }

        return (options as SelectOption[]).map(option => (
            {
                value: option.label,
                label: option.label,
                alias: option.value,
            }));
    }

    function formatOptionLabel({ value, alias }: SelectOption): JSX.Element {
        return (
            <span className="option-label" title={alias ? alias : ''}>{value}</span>
        );
    }

    function onProcessStepFilterClick(): void {
        if (isDisabled) {
            togglePlaceholder(true);
        }
    }

    useEffect(() => {
        if (filterName === FilterName.processStep && process && isRedPlaceholder) {
            togglePlaceholder(false);
        } else if (filterName === FilterName.processStep && !process) {
            toggleMenu(false);
        }
    }, [process]);

    const selectClassName = isMulti ? 'Multi-select-container' : 'Select-container';
    const selectPrefixName = isMulti ? 'Multi-select' : 'Select';
    const styles = {
        placeholder: (defaultStyles: any) => ({
            ...defaultStyles,
            color: isRedPlaceholder ? '#C8140A' : '#B6BFD0',
        }),
    };

    return (
        <label
            className={'Select__label'}
            // eslint-disable-next-line no-undefined
            onClick={filterName === FilterName.processStep ? onProcessStepFilterClick : undefined}
        >
            <div className={'Select__title'}>
                {filterName}
                {isRemovable &&
                    <SvgIcon
                        onClick={onDeleteSvgClick}
                        spriteId={SpriteId.blackCruce}
                        className={'Select__delete-select-icon'}
                    />
                }
                {isCreatable &&
                    <div className={'Select__save-button'}>
                        Сохранить параметры
                    </div>
                }
            </div>
            {isCreatable ?
                <CreatableSelect
                    onCreateOption={onCreateOption}
                    components={{
                        IndicatorSeparator: null,
                        ClearIndicator: clearIndicator,
                    }}
                    className={selectClassName}
                    classNamePrefix={selectPrefixName}
                    options={serializeOptions(selectOptions)}
                    value={serializeValue(value)}
                    placeholder={placeholder || 'Начните вводить текст'}
                    menuIsOpen={isMenuOpen}
                    onChange={handleSelectChanges}
                    onMenuOpen={onMenuOpen}
                    onMenuClose={onMenuClose}
                    noOptionsMessage={showNoOptionsMessage}
                    formatCreateLabel={showCreateIfNoOptionsMessage}
                    isMulti={false}
                    closeMenuOnSelect={!isMulti}
                    isSearchable={true}
                    isClearable={true}
                    isDisabled={isDisabled}
                    blurInputOnSelect={false}
                    hideSelectedOptions={false}
                /> :
                <Select
                    components={{
                        IndicatorSeparator: null,
                        ClearIndicator: clearIndicator,
                    }}
                    className={selectClassName}
                    classNamePrefix={selectPrefixName}
                    options={serializeOptions(selectOptions)}
                    value={serializeValue(value)}
                    placeholder={placeholder || 'Выбрать'}
                    menuIsOpen={isMenuOpen}
                    onChange={handleSelectChanges}
                    onMenuOpen={onMenuOpen}
                    onMenuClose={onMenuClose}
                    noOptionsMessage={showNoOptionsMessage}
                    isMulti={isMulti}
                    closeMenuOnSelect={!isMulti}
                    isSearchable={true}
                    isClearable={true}
                    isDisabled={isDisabled}
                    blurInputOnSelect={false}
                    hideSelectedOptions={false}
                    formatOptionLabel={formatOptionLabel}
                    styles={styles}
                />
            }
        </label>
    );
}

