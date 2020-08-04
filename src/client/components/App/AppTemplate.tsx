/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';

import { Authorization } from '../../pages/Authorization';
import { MainLayout } from '../../pages/MainLaytout';

export function AppTemplate(): JSX.Element {
    const [isLogin, setIsLogin] = useState(false);

    function login(): void{
        setIsLogin(true);
    }

    return (
        <div className="App">
            {isLogin
                ? <MainLayout />
                : <Authorization
                    successfulLogin={login}
                />
            }
        </div>
    );
}
