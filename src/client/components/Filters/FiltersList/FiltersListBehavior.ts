import React, { useEffect, useState } from 'react';

import { FiltersListTemplate } from './FiltersListTemplate';
import { SelectOption } from '../FilterItem/FiltersItem';
import { GetFiltersValues } from '../../../apollo-query-types';
import { RequestsParams } from '../../../../server/schemas/Requests/resolvers';
import './FiltersList.scss';

interface Props {
    filtersValuesQuery?: GetFiltersValues
}

export function FiltersListBehavior({
    filtersValuesQuery,
}: Props): JSX.Element {
    const [requestParams, setRequestParameter] = useState<RequestsParams>({
        process: null,
        status: null,
        step: {
            alias: null,
            status: null,
        },
    });
    console.log(requestParams);

    const [process, setProcess] = useState('');
    const [processStatus, setProcessStatus] = useState('');
    useEffect(() => {
        const processParameter = filtersValuesQuery?.processes?.find(queryProcess =>
            queryProcess.name === process && queryProcess);
        setRequestParameter(params => (
            { ...params, process: processParameter ? processParameter.alias : null }
        ));
    }, [process, filtersValuesQuery]);
    useEffect(() => {
        setRequestParameter(params => (
            { ...params, status: processStatus || null }
        ));
    }, [processStatus]);

    const [processSelectValues, setProcessSelectValues] = useState<SelectOption[]>();
    const [processStatusSelectValues, setProcessStatusSelectValues] = useState<SelectOption[]>();
    useEffect(() => {
        setProcessSelectValues(filtersValuesQuery?.processes?.map(process =>
            ({ value: process.name, label: process.name })));
        setProcessStatusSelectValues(filtersValuesQuery?.statuses?.map(status =>
            ({ value: status, label: status })));
    }, [filtersValuesQuery]);

    function serializeFilterValue(filterValue: string): SelectOption | null {
        return filterValue ? { value: filterValue, label: filterValue } : null;
    }

    return React.createElement(FiltersListTemplate, {
        processSelectValues,
        processStatusSelectValues,
        setProcess,
        setProcessStatus,
        process: serializeFilterValue(process),
        processStatus: serializeFilterValue(processStatus),
    });
}
