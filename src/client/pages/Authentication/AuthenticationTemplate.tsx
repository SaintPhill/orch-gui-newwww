import React, { FormEvent } from 'react';

import { Button } from '../../UI/Button';
import { SvgIcon } from '../../UI/SvgIcon';
import { SpriteId } from '../../UI/SvgIcon/SvgIconTemplate';
import { ButtonTheme } from '../../UI/Button/ButtonTemplate';
import { InputType } from '../../UI/Input/InputBehavior';
import { Input } from '../../UI/Input';
import { AuthenticationErrorMessage } from '../../../store/StoreSlices/authorization';
import './Authorization.scss';

interface Props {
    userName: string
    password: string
    isAuthenticationError: boolean
    authenticationErrorMessage: AuthenticationErrorMessage | null
    handleUserName(event: React.ChangeEvent<HTMLInputElement>): void
    handlePassword(event: React.ChangeEvent<HTMLInputElement>): void
    onToggleLoginButton(e: FormEvent<HTMLFormElement>): void
}

export default function AuthenticationTemplate({
    userName,
    password,
    isAuthenticationError,
    authenticationErrorMessage,
    handleUserName,
    handlePassword,
    onToggleLoginButton,
}: Props): JSX.Element {
    const ROOT_CLASS = 'authentication';

    return (
        <div className={ROOT_CLASS}>
            <header className={`${ROOT_CLASS}__header`}>
                <SvgIcon spriteId={SpriteId.tricolor} className={`${ROOT_CLASS}__logo`} />
                <SvgIcon spriteId={SpriteId.iflex} className={`${ROOT_CLASS}__logo`} />
            </header>
            <h1 className={`${ROOT_CLASS}__title`}>
                Вход в систему управления оркестрационными процессами
            </h1>
            <form className={`${ROOT_CLASS}-form`} onSubmit={onToggleLoginButton}>
                <Input
                    blockClass={`${ROOT_CLASS}-form`}
                    label={'Пользователь'}
                    onChange={handleUserName}
                    type={InputType.Text}
                    placeHolder={'Ввести'}
                    value={userName}
                    errorMessage={isAuthenticationError ? ' ' : ''}
                />
                <Input
                    blockClass={`${ROOT_CLASS}-form`}
                    label={'Пароль'}
                    onChange={handlePassword}
                    type={InputType.Password}
                    placeHolder={'Ввести'}
                    value={password}
                    errorMessage={isAuthenticationError && authenticationErrorMessage ?
                        authenticationErrorMessage : ''}
                />
                <Button
                    className={`${ROOT_CLASS}__confirm-button`}
                    theme={ButtonTheme.blue}
                    onClick={onToggleLoginButton}
                    isDisabled={!(userName && password)}
                >
                    Вход
                </Button>
            </form>
        </div>
    );
}
