import React from 'react';
import classnames from 'classnames';

import { Button } from '../../UI/Button';
import { FiltersList } from './FiltersList';
import { SpriteId } from '../../UI/SvgIcon/SvgIconTemplate';
import { Dropdown, FilterName, SelectOption } from './Dropdown/Dropdown';
import { ButtonTheme } from '../../UI/Button/ButtonTemplate';
import { MainLayoutState } from '../../../store/StoreSlices/visibility';
import './Filters.scss';

interface Props {
    isFiltersHidden: boolean
    isActionButtonsDisabled: boolean
    mainLayoutState: MainLayoutState
    allFilters: FilterName[]
    availableFilters: FilterName[]
    closeFilters(): void
    onClearButtonClick(): void
    onApplyButtonClick(): void
    addFilter(filters: SelectOption[]): void
}

export function FiltersTemplate({
    closeFilters,
    mainLayoutState,
    isActionButtonsDisabled,
    isFiltersHidden,
    onClearButtonClick,
    onApplyButtonClick,
    allFilters,
    addFilter,
    availableFilters,
}: Props): JSX.Element {
    const ROOT_CLASS = 'filters';
    const filtersClassName = classnames(
        ROOT_CLASS,
        {
            [`${ROOT_CLASS}_hidden`]: isFiltersHidden,
        }
    );
    const actionButtonsWrapperClass = classnames(
        `${ROOT_CLASS}__act-buttons-wrapper`,
        {
            [`${ROOT_CLASS}__act-buttons-wrapper_hidden`]: isFiltersHidden,
        }
    );

    return (
        <div className={filtersClassName}>
            <div className={`${ROOT_CLASS}__title`}>
                Фильтры
                <Button
                    onClick={closeFilters}
                    className={`${ROOT_CLASS}__close-filters-button`}
                    svgId={SpriteId.arrowLeft}
                />
            </div>

            {mainLayoutState === MainLayoutState.workWithRequests &&
                <div className={`${ROOT_CLASS}__head-filters`}>
                    <Dropdown
                        isMulti
                        value={availableFilters}
                        filterName={FilterName.addFilter}
                        setValue={addFilter}
                        selectOptions={allFilters}
                    />
                </div>
            }

            <FiltersList applyFilters={onApplyButtonClick} />

            <div className={actionButtonsWrapperClass}>
                <Button
                    onClick={onClearButtonClick}
                    className={`${ROOT_CLASS}__act-button`}
                    theme={ButtonTheme.white}
                    isDisabled={isActionButtonsDisabled}
                >
                    Очистить
                </Button>
                <Button
                    onClick={onApplyButtonClick}
                    className={`${ROOT_CLASS}__act-button`}
                    theme={ButtonTheme.blue}
                    isDisabled={isActionButtonsDisabled}
                >
                    Применить
                </Button>
            </div>
        </div>
    );
}
