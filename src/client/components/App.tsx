import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Authorization } from '../pages/Authorization';
import Layout from './Layout';

export default function App(): JSX.Element {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route component={Authorization} path='/' exact/>
                    <Route component={Layout} path='/layout' exact/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}