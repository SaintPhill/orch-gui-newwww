import React, { useEffect } from 'react';

import { FilterName } from '../Dropdown/Dropdown';
import { DateRangePickerTemplate } from './DateRangePickerTemplate';
import { dateRange } from '../../../../store/StoreSlices/selectedFilters';

type Props = {
    dates: dateRange | null
    label: FilterName
    handleDate(dates: any): void
    deleteItSelf(filterName: FilterName): void
};

export function DateRangePickerBehavior({
    dates,
    label,
    handleDate,
    deleteItSelf,
}: Props): JSX.Element {
    function onDeleteSvgClick(): void {
        deleteItSelf(label);
    }
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => () => {
        deleteItSelf(label);
    }, []);

    return React.createElement(DateRangePickerTemplate, {
        dates,
        label,
        handleDate,
        onDeleteSvgClick,
    });
}
