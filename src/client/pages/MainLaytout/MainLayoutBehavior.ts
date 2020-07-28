import React, { useState } from 'react';

import { MainLayoutTemplate } from './MainLayoutTemplate';

export function MainLayoutBehavior(): JSX.Element {
    const [isFiltersOpen, toggleFilters] = useState(true);

    function onToggleFilters(): void {
        toggleFilters(!isFiltersOpen);
    }

    return React.createElement(MainLayoutTemplate, {
        isFiltersOpen,
        onToggleFilters,
    });
}
