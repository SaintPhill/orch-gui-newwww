import React from 'react';

import { Header } from '../Header';
import { SideBar } from '../SideBar';
import './MainLaytout.scss';

export function MainLayoutTemplate(): JSX.Element {
    const ROOT_CLASS = 'main-layout';

    return (
        <div className={ROOT_CLASS}>
            <Header />
            <div className={`${ROOT_CLASS}__content`}>
                <SideBar />
            </div>
        </div>
    );
}
