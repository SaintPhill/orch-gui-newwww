import React, { useState } from 'react';

import { FiltersListTemplate } from './FiltersListTemplate';
import { SelectOption } from '../FilterItem/FiltersItem';
import './FiltersList.scss';

export function FiltersListBehavior(): JSX.Element {
    const [process, setProcess] = useState('');

    function serializeFilterValue(filterValue: string): SelectOption | null {
        return filterValue ? { value: filterValue, label: filterValue } : null;
    }

    return React.createElement(FiltersListTemplate, {
        process: serializeFilterValue(process),
        setProcess,
    });
}
