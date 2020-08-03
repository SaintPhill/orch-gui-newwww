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

    function validateLoginInformation() {
        if (!userLogin && !userPassword
            || userLogin && userLogin !== 'admin' && !userPassword
            || userPassword === 'password' && !userLogin
            || userPassword === 'password' && userLogin !== 'admin'
            || userPassword !== 'password' && !userLogin
            || userPassword !== 'password' && userLogin !== 'admin') {

            setErrorMessage('Неверное имя пользователя или пароль');
            setLoginError(true);
            setPasswordError(true);

        } else if (userLogin === 'admin' && !userPassword
            || userLogin === 'admin' && userPassword !== 'password') {

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

    function onToggleLoginButton(event: React.MouseEvent): void {
        event.preventDefault();
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
