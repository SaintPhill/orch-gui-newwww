import React from 'react';

import { Header } from '../../components/Header';
import { Filters } from '../../components/Filters';
import { FiltrationResult } from '../../components/FiltrationResult';
import { Detalization } from '../../components/Detalization';
import './MainLaytout.scss';

export function MainLayoutTemplate(): JSX.Element {
    const ROOT_CLASS = 'main-layout';

    return (
        <div className={ROOT_CLASS}>
            <Header />
            <div className={`${ROOT_CLASS}__content`}>
                <Filters />
                <div className={`${ROOT_CLASS}__tables`}>
                    <FiltrationResult />
                    <Detalization />
                </div>
            </div>
        </div>
    );
}
