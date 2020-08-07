import React from 'react';

import { FilterName, FiltersItem, SelectOption } from '../FilterItem/FiltersItem';
import './FiltersList.scss';

const values = [
    { value: 'Обмен оборудования', label: 'Обмен оборудования' },
    { value: 'Расторжение абонентского договора', label: 'Расторжение абонентского договора' },
    { value: 'Закрепление абонента', label: 'Закрепление абонента' },
];

interface Props {
    process: SelectOption | null
    setProcess(value: string): void
}

export function FiltersListTemplate({
    process,
    setProcess,
}: Props): JSX.Element {
    const ROOT_CLASS = 'filters-list';

    return (
        <div className={ROOT_CLASS}>
            <FiltersItem
                name={FilterName.process}
                value={process}
                setValue={setProcess}
                selectOptions={values}
                isSearchable={true}
            />
        </div>
    );
}
