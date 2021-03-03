import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MainLayoutTemplate } from './MainLayoutTemplate';
import { toggleFiltersVisibility } from '../../../store/StoreSlices/visibility';
import { RootState } from '../../../store/StoreSlices';

export function MainLayoutBehavior(): JSX.Element {
    const dispatch = useDispatch();
    const mainLayoutState = useSelector((state: RootState) => state.visibility.mainLayoutState);
    const isFiltersHidden = useSelector((state: RootState) => state.visibility.isFiltersHidden);

    function toggleFilters(): void {
        dispatch(toggleFiltersVisibility());
    }

    return React.createElement(MainLayoutTemplate, {
        mainLayoutState,
        isFiltersHidden,
        toggleFilters,
    });
}
