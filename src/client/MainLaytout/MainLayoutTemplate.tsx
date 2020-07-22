import React from 'react';

import { Header } from '../Header';

export function MainLayoutTemplate(): JSX.Element {
    const ROOT_CLASS = 'main-layout';

    return (
        <div className={ROOT_CLASS}>
            <Header />
        </div>
    );
}
