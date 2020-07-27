/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';

import { Authorization } from '../pages/Authorization';
import Layout from './Layout';
import { type } from 'os';

export default function App(): JSX.Element {
    const [isLogin, setIsLogin] = useState(false);

    const login = () => {
        setIsLogin(true);
        return type;
    };

    return (
        <div className="App">
            {isLogin
                ? <Layout />
                : <Authorization
                    login={login}
                />
            }
        </div>
    );
}