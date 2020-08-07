import React, { useState } from 'react';
import Select, { IndicatorProps, ValueType } from 'react-select';

import { SvgIcon } from '../../../UI/SvgIcon';
import './customStyles.scss';
import './customStylesMultiSelect.scss';

export interface SelectOption {
    label: string
    value: string
}

export enum FilterName {
    process = 'Процесс'
}

interface Props {
    name: string
    value: SelectOption | SelectOption[] | null
    placeholder?: string
    selectOptions?: SelectOption[]
    isMulti?: boolean
    isSearchable: boolean
    closeMenuOnSelect?: boolean
    setValue(value: string | SelectOption[], index?: number): void
}

export function FiltersItem({
    name,
    value,
    setValue,
    placeholder,
    selectOptions,
    closeMenuOnSelect,
    isMulti,
    isSearchable,
}: Props): JSX.Element {
    const [isOpen, toggleDropdown] = useState(false);

    function onHandleSelectChanges(event: ValueType<SelectOption>): void {
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

    function onMenuOpen(): void {
        toggleDropdown(true);
    }

    function onMenuClose(): void {
        toggleDropdown(false);
    }

    function showNoOptionsMessage(): string {
        return 'Нет совпадений';
    }

    function getClearIndicator(props: IndicatorProps<any>): JSX.Element {
        const {
            children = <SvgIcon className={'Select__clear-indicator'} spriteId={'clear-indicator'}/>,
            innerProps: { ref, ...restInnerProps },
        } = props;
        return (
            <div{...restInnerProps} ref={ref}>
                {children}
            </div>
        );
    }


    const selectClassName = isMulti ? 'Multi-select-container' : 'Select-container';
    const selectPrefixName = isMulti ? 'Multi-select' : 'Select';

    return (
        <label className={'Select__label'}>
            <div className={'Select__title'}>
                {name}
                <SvgIcon spriteId={'black-cruce'} className={'Select__delete-select-icon'}/>
            </div>
            <Select
                components={{
                    IndicatorSeparator: null,
                    ClearIndicator: getClearIndicator,
                }}
                className={selectClassName}
                classNamePrefix={selectPrefixName}
                options={selectOptions}
                value={value}
                placeholder={placeholder || 'Выбрать'}
                menuIsOpen={isOpen}
                isSearchable={isSearchable}
                onChange={onHandleSelectChanges}
                onMenuOpen={onMenuOpen}
                onMenuClose={onMenuClose}
                noOptionsMessage={showNoOptionsMessage}
                isMulti={isMulti}
                isClearable={true}
                closeMenuOnSelect={!closeMenuOnSelect}
                blurInputOnSelect={false}
                hideSelectedOptions={false}
            />
        </label>
    );
}

