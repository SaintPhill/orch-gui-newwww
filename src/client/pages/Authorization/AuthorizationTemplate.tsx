 import React, { useState } from 'react';

import './Authorization.scss';
import { Button } from '../../UI/button';
import { SvgIcon } from '../../components/SvgIcon';

export function AuthorizationTemplate(props: any) {
    const [user, setUser] = useState({
        login: '',
        password: '',
    });

    const [error, setError] = useState({
        errorText: '',
        login: false,
        password: false,
    });

    const login = (e: any) => {
        e.preventDefault();

        if (!user.login && !user.password) {
            setError({
                errorText: 'Неверное имя пользователя или пароль',
                login: true,
                password: true,
            });
        }

        if (user.login && user.login !== 'admin' && !user.password) {
            setError({
                errorText: 'Неверное имя пользователя или пароль',
                login: true,
                password: true,
            });
        }

        if (user.login === 'admin' && !user.password) {
            setError({
                errorText: 'Пароль не соответствует требованиям',
                login: false,
                password: true,
            });
        }

        if (user.login === 'admin' && user.password !== 'password') {
            setError({
                errorText: 'Пароль не соответствует требованиям',
                login: false,
                password: true,
            });
        }

        if (user.login === 'admin' && user.password === 'password') {
            setError({
                errorText: '',
                login: false,
                password: false,
            });
            props.login();
        }
    };

    const onChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
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
            <form className={`${ROOT_CLASS}-form`} onSubmit={(e) => login(e)}>
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
                <Button
                    isPrimary={true}
                >
                    Вход
                </Button>
            </form>
        </div>
    );
}
