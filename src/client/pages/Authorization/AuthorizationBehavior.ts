import React, { useState } from 'react';
import AuthorizationTemplate from './AuthorizationTemplate';

interface Props {
    loginHandler(): void
}

export function AuthorizationBehavior({ loginHandler }: Props): JSX.Element {
    const [user, setUser] = useState({
        login: '',
        password: '',
    });

    const [error, setError] = useState({
        errorText: '',
        login: false,
        password: false,
    });

    function login(event: React.MouseEvent): void {
        event.preventDefault();

        if (!user.login && !user.password
            || user.login && user.login !== 'admin' && !user.password
            || user.password === 'password' && !user.login
            || user.password === 'password' && user.login !== 'admin'
            || user.password !== 'password' && !user.login
            || user.password !== 'password' && user.login !== 'admin') {
            setError({
                errorText: 'Неверное имя пользователя или пароль',
                login: true,
                password: true,
            });
        } else if (user.login === 'admin' && !user.password
            || user.login === 'admin' && user.password !== 'password') {
            setError({
                errorText: 'Пароль не соответствует требованиям',
                login: false,
                password: true,
            });
        } else {
            setError({
                errorText: '',
                login: false,
                password: false,
            });
            loginHandler();
        }
    }

    function onChangeUser(event: React.ChangeEvent<HTMLInputElement>): void {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    }

    const ROOT_CLASS = 'authorization';

    return React.createElement(AuthorizationTemplate, {
        ROOT_CLASS,
        error,
        onChangeUser,
        user,
        login,
    });
}