import React from 'react';

import { Header } from '../Header';
import { Filters } from '../Filters';
import { FiltrationResult } from '../FiltrationResult';
import { Detalization } from '../Detalization';
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
