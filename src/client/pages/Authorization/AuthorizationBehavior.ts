import React, { useState } from 'react';
import AuthorizationTemplate from './AuthorizationTemplate';

interface Props {
    successfulLogin(): void
}

export function AuthorizationBehavior({ successfulLogin }: Props): JSX.Element {
    const [userLogin, setUserLogin] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const [errorText, setErrorText] = useState('');
    const [errorLogin, setErrorLogin] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    function validateLoginInformation() {
        if (!userLogin && !userPassword
            || userLogin && userLogin !== 'admin' && !userPassword
            || userPassword === 'password' && !userLogin
            || userPassword === 'password' && userLogin !== 'admin'
            || userPassword !== 'password' && !userLogin
            || userPassword !== 'password' && userLogin !== 'admin') {

            setErrorText('Неверное имя пользователя или пароль');
            setErrorLogin(true);
            setErrorPassword(true);

        } else if (userLogin === 'admin' && !userPassword
            || userLogin === 'admin' && userPassword !== 'password') {

            setErrorText('Пароль не соответствует требованиям');
            setErrorLogin(false);
            setErrorPassword(true);

        } else {
            setErrorText('');
            setErrorLogin(false);
            setErrorPassword(false);

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
        errorText,
        errorLogin,
        errorPassword,
        handleChangeUserLogin,
        handleChangeUserPassword,
        onToggleLoginButton,
    });
}
