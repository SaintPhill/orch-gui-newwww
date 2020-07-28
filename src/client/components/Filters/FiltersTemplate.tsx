import React from 'react';
import classnames from 'classnames';

import { Button } from '../../UI/button';
import './Filters.scss';

interface Props {
    isFiltersOpen: boolean
    onToggleFilters(): void
}

export function FiltersTemplate({
    onToggleFilters,
    isFiltersOpen,
}: Props): JSX.Element {
    const ROOT_CLASS = 'filters';
    const filtersClassName = classnames(
        ROOT_CLASS,
        {
            [`${ROOT_CLASS}_closed`]: !isFiltersOpen,
        }
    );

    return (
        <div className={filtersClassName}>
            <div className={`${ROOT_CLASS}__title`}>
                Фильтры
                <Button
                    onClick={onToggleFilters}
                    className={`${ROOT_CLASS}__hide-filters-button`}
                    svgId={'arrow-left'}
                />
            </div>
        </div>
    );
}
