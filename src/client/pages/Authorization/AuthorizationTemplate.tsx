import React, { useState } from 'react';

import './Authorization.scss';
import { Button } from '../../UI/button';
import { SvgIcon } from '../../UI/SvgIcon';

export function AuthorizationTemplate(props: any): JSX.Element {
    const [user, setUser] = useState({
        login: '',
        password: '',
    });

    const [error, setError] = useState({
        errorText: '',
        login: false,
        password: false,
    });

    function login(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        e.preventDefault();

        if (!user.login && !user.password || user.login && user.login !== 'admin' && !user.password
            || user.password === 'password' && !user.login || user.password === 'password' && user.login !== 'admin') {
            setError({
                errorText: 'Неверное имя пользователя или пароль',
                login: true,
                password: true,
            });
        } else if (user.login === 'admin' && !user.password || user.login === 'admin' && user.password !== 'password') {
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
            props.login();
        }
    }

    function onChangeUser(e: React.ChangeEvent<HTMLInputElement>): void {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    }

    const ROOT_CLASS = 'authorization';
    return (
        <div className={ROOT_CLASS}>
            <header className={`${ROOT_CLASS}__header`}>
                <SvgIcon
                    spriteId="tricolor"
                    className={`${ROOT_CLASS}__logo`}
                />
                <SvgIcon
                    spriteId="iflex"
                    className={`${ROOT_CLASS}__logo`}
                />
            </header>
            <h1 className={`${ROOT_CLASS}__title`}>
                Вход в систему управления оркестрационными процессами
            </h1>
            <form className={`${ROOT_CLASS}-form`}>
                <div className={`${ROOT_CLASS}-form__item`}>
                    <label className={`${ROOT_CLASS}-form__label`}>Пользователь</label>
                    <input
                        type="text"
                        className={`${ROOT_CLASS}-form__input ${error.login ? 'form__error' : null}`}
                        name="login"
                        onChange={onChangeUser}
                        value={user.login}
                    />
                </div>
                <div className={`${ROOT_CLASS}-form__item`}>
                    <label className={`${ROOT_CLASS}-form__label`}>Пароль</label>
                    <input
                        type="password"
                        className={`${ROOT_CLASS}-form__input ${error.password ? 'form__error' : null}`}
                        name="password"
                        onChange={onChangeUser}
                        value={user.password}
                    />
                    <div className={`${ROOT_CLASS}-form__error`}>
                        {error.errorText}
                    </div>
                </div>
                <Button isPrimary onClick={login}>Вход</Button>
            </form>
        </div>
    );
}
