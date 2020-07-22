import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import { MainLayout } from './client/MainLaytout';

ReactDOM.render(
    <React.StrictMode>
        <MainLayout />
    </React.StrictMode>,
    document.getElementById('root')
);

