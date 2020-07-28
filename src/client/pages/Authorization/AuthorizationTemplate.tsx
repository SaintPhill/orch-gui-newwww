import React from 'react';

import { Button } from '../../UI/button';
import { SvgIcon } from '../../UI/SvgIcon';

import classNames from 'classnames';

import './Authorization.scss';

interface Props {
    ROOT_CLASS: string
    error: Record<string, any>
    user: Record<string, any>
    onChangeUser(event: React.ChangeEvent<HTMLInputElement>): void
    login(event: React.MouseEvent): void
}

export default function AuthorizationTemplate({ ROOT_CLASS, error, onChangeUser, user, login }: Props): JSX.Element {
    const inputClassLogin = classNames(
        `${ROOT_CLASS}-form__input`,
        {
            'form__error': error.login,
        }
    );

    const inputClassPassword = classNames(
        `${ROOT_CLASS}-form__input`,
        {
            'form__error': error.password,
        }
    );

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
                        className={inputClassLogin}
                        name="login"
                        onChange={onChangeUser}
                        value={user.login}
                    />
                </div>
                <div className={`${ROOT_CLASS}-form__item`}>
                    <label className={`${ROOT_CLASS}-form__label`}>Пароль</label>
                    <input
                        type="password"
                        className={inputClassPassword}
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
