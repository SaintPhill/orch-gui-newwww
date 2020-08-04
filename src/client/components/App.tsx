import React, { useState } from 'react';

import { Authorization } from '../pages/Authorization';
import { MainLayout } from '../pages/MainLaytout';

export default function App(): JSX.Element {
    const [isLogin, setIsLogin] = useState(true);

    const login = () => {
        setIsLogin(true);
    };

    return (
        <div className="App">
            {isLogin
                ? <MainLayout />
                : <Authorization
                    login={login}
                />
            }
        </div>
    );
}
