/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';

import { Authorization } from '../pages/Authorization';
import Layout from './Layout';

export default function App(): JSX.Element {
    const [isLogin, setIsLogin] = useState(false);

    function login(): void{
        setIsLogin(true);
    }

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
