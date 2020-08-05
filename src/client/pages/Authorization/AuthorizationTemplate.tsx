import React from 'react';
import classNames from 'classnames';

import { Button } from '../../UI/Button';
import { SvgIcon } from '../../UI/SvgIcon';
import './Authorization.scss';

interface Props {
    userLogin: string
    userPassword: string
    errorMessage: string
    loginError: boolean
    passwordError: boolean
    handleChangeUserLogin(event: React.ChangeEvent<HTMLInputElement>): void
    handleChangeUserPassword(event: React.ChangeEvent<HTMLInputElement>): void
    onToggleLoginButton(): void
}

export default function AuthorizationTemplate({
    userLogin,
    userPassword,
    errorMessage,
    loginError,
    passwordError,
    handleChangeUserLogin,
    handleChangeUserPassword,
    onToggleLoginButton,
}: Props): JSX.Element {
    const ROOT_CLASS = 'authorization';
    const inputClassLogin = classNames(
        `${ROOT_CLASS}-form__input`,
        {
            [`${ROOT_CLASS}-form__input_error`]: loginError,
        }
    );
    const inputClassPassword = classNames(
        `${ROOT_CLASS}-form__input`,
        {
            [`${ROOT_CLASS}-form__input_error`]: passwordError,
        }
    );

    return (
        <div className={ROOT_CLASS}>
            <header className={`${ROOT_CLASS}__header`}>
                <SvgIcon spriteId="tricolor" className={`${ROOT_CLASS}__logo`} />
                <SvgIcon spriteId="iflex" className={`${ROOT_CLASS}__logo`} />
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
                        onChange={handleChangeUserLogin}
                        value={userLogin}
                    />
                </div>
                <div className={`${ROOT_CLASS}-form__item`}>
                    <label className={`${ROOT_CLASS}-form__label`}>Пароль</label>
                    <input
                        type="password"
                        className={inputClassPassword}
                        name="password"
                        onChange={handleChangeUserPassword}
                        value={userPassword}
                    />
                    <div className={`${ROOT_CLASS}-form__message_error`}>
                        {errorMessage}
                    </div>
                </div>
                <Button isPrimary onClick={onToggleLoginButton}>Вход</Button>
            </form>
        </div>
    );
}
