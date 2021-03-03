import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { authentication } from '../../../store/StoreSlices/authorization';
import { RootState } from '../../../store/StoreSlices';
import AuthenticationTemplate from './AuthenticationTemplate';


export function AuthenticationBehavior(): JSX.Element {
    const dispatch = useDispatch();
    const [userName, toggleUserName] = useState('');
    const [password, togglePassword] = useState('');
    const [isAuthenticationError, setAuthenticationError] = useState(false);
    const authenticationErrorMessage = useSelector((state: RootState) =>
        state.authorization.authenticationErrorMessage);

    useEffect(() => {
        if (authenticationErrorMessage) {
            setAuthenticationError(true);
        }
    }, [authenticationErrorMessage, setAuthenticationError]);

    function onToggleLoginButton(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        dispatch(authentication({ userName, password }));
    }

    function handleUserName(event: React.ChangeEvent<HTMLInputElement>): void {
        toggleUserName(event.target.value);

        if (isAuthenticationError) {
            setAuthenticationError(false);
        }
    }
    function handlePassword(event: React.ChangeEvent<HTMLInputElement>): void {
        togglePassword(event.target.value);

        if (isAuthenticationError) {
            setAuthenticationError(false);
        }
    }

    return React.createElement(AuthenticationTemplate, {
        userName,
        password,
        isAuthenticationError,
        authenticationErrorMessage,
        handleUserName,
        handlePassword,
        onToggleLoginButton,
    });
}
