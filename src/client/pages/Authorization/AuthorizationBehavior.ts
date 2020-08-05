import React, { useState } from 'react';

import AuthorizationTemplate from './AuthorizationTemplate';

interface Props {
    successfulLogin(): void
}

export function AuthorizationBehavior({ successfulLogin }: Props): JSX.Element {
    const [userLogin, setUserLogin] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [loginError, setLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const USER_LOGIN = 'amdin';
    const USER_PASSWORD = 'password';

    function validateLoginInformation() {
        if (!userLogin && !userPassword
            || userLogin && userLogin !== USER_LOGIN && !userPassword
            || userPassword === USER_PASSWORD && !userLogin
            || userPassword === USER_PASSWORD && userLogin !== USER_LOGIN
            || userPassword !== USER_PASSWORD && !userLogin
            || userPassword !== USER_PASSWORD && userLogin !== USER_LOGIN) {

            setErrorMessage('Неверное имя пользователя или пароль');
            setLoginError(true);
            setPasswordError(true);

        } else if (userLogin === USER_LOGIN && !userPassword
            || userLogin === USER_LOGIN && userPassword !== USER_PASSWORD) {

            setErrorMessage('Пароль не соответствует требованиям');
            setLoginError(false);
            setPasswordError(true);

        } else {
            setErrorMessage('');
            setLoginError(false);
            setPasswordError(false);

            return true;
        }

        return false;
    }

    function onToggleLoginButton(): void {
        if (validateLoginInformation()) {
            successfulLogin();
        }
    }

    function handleChangeUserLogin(event: React.ChangeEvent<HTMLInputElement>): void {
        setUserLogin(event.target.value);
    }

    function handleChangeUserPassword(event: React.ChangeEvent<HTMLInputElement>): void {
        setUserPassword(event.target.value);
    }

    return React.createElement(AuthorizationTemplate, {
        userLogin,
        userPassword,
        errorMessage,
        loginError,
        passwordError,
        handleChangeUserLogin,
        handleChangeUserPassword,
        onToggleLoginButton,
    });
}
