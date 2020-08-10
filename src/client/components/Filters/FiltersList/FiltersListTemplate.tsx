import React from 'react';

import { FilterName, FiltersItem, SelectOption } from '../FilterItem/FiltersItem';

interface Props {
    process: SelectOption | null
    processStatus: SelectOption | null
    processSelectValues?: SelectOption[]
    processStatusSelectValues?: SelectOption[]
    setProcess(value: string): void
    setProcessStatus(value: string): void
}

export function FiltersListTemplate({
    process,
    processStatus,
    processSelectValues,
    processStatusSelectValues,
    setProcessStatus,
    setProcess,
}: Props): JSX.Element {
    const ROOT_CLASS = 'filters-list';

    return (
        <div className={ROOT_CLASS}>
            <FiltersItem
                name={FilterName.process}
                value={process}
                setValue={setProcess}
                isSearchable={true}
                selectOptions={processSelectValues}
            />

            <FiltersItem
                name={FilterName.processStatus}
                value={processStatus}
                setValue={setProcessStatus}
                isSearchable={true}
                isMulti={true}
                selectOptions={processStatusSelectValues}
            />
        </div>
    );
}
