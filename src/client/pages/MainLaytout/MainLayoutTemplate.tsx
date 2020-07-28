import React from 'react';

import { Header } from '../../components/Header';
import { Button } from '../../UI/button';
import { Filters } from '../../components/Filters';
import { Detalization } from '../../components/Detalization';
import { FiltrationResult } from '../../components/FiltrationResult';
import './MainLaytout.scss';

interface Props {
    isFiltersOpen: boolean
    onToggleFilters(): void
}

export function MainLayoutTemplate({ isFiltersOpen, onToggleFilters }: Props): JSX.Element {
    const ROOT_CLASS = 'main-layout';

    return (
        <div className={ROOT_CLASS}>
            <div className={`${ROOT_CLASS}__side-bar`}>
                <Button
                    svgId={'burger'}
                    className={`${ROOT_CLASS}__show-filters-button`}
                    onClick={onToggleFilters}
                />
            </div>
            <Header />
            <div className={`${ROOT_CLASS}__content`}>
                <Filters isFiltersOpen={isFiltersOpen} onToggleFilters={onToggleFilters} />
                <div className={`${ROOT_CLASS}__tables`}>
                    <FiltrationResult />
                    <Detalization />
                </div>
            </div>
        </div>
    );
}
