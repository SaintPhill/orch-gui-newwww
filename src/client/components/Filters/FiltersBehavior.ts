import React from 'react';

import { FiltersTemplate } from './FiltersTemplate';
import './Filters.scss';

interface Props {
    isFiltersOpen: boolean
    onToggleFilters(): void
}

export function FiltersBehavior({
    isFiltersOpen,
    onToggleFilters,
}: Props): JSX.Element {

    return React.createElement(FiltersTemplate, {
        isFiltersOpen,
        onToggleFilters,
    });
}
