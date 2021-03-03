import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';

import { userApi } from '../RestApi/userApi';
import { UserInformation } from '../types/userLoginTypes';
import { StatusFetching } from './filtersOptions';

export enum AuthenticationErrorMessage {
    authenticationError = 'Неверное имя пользователя или пароль',
    networkError = 'Проверьте соединение с интернетом'
}

export interface AuthorizationState {
    userInfo: UserInformation | null
    statusAuthenticationFetching: StatusFetching
    authenticationErrorMessage: AuthenticationErrorMessage | null
}

const initialState: AuthorizationState = {
    userInfo: null,
    authenticationErrorMessage: null,
    statusAuthenticationFetching: StatusFetching.idle,
};

type AuthenticationData = {
    userName: string
    password: string
};

export const accessTokenName = 'access_token';

export const authentication = createAsyncThunk(
    'authentication',
    async (authenticationData: AuthenticationData) => {
        const { data } = await userApi.authentication(authenticationData.userName, authenticationData.password);

        localStorage.setItem(accessTokenName, data.access_token);

        return userApi.authenticationByToken(data.access_token);
    }
);

export const authenticationByToken = createAsyncThunk(
    'authenticationByToken',
    (token: string) => userApi.authenticationByToken(token)
);

function setRejectedAuthenticationError(state: AuthorizationState, error: SerializedError): void {
    state.statusAuthenticationFetching = StatusFetching.rejected;

    if (error.message === 'Network Error') {
        state.authenticationErrorMessage = AuthenticationErrorMessage.networkError;
    } else if (error.message === 'Request failed with status code 400') {
        state.authenticationErrorMessage = AuthenticationErrorMessage.authenticationError;
    }
}

const authorization = createSlice({
    name: 'authorization',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(authentication.pending, state => {
            state.statusAuthenticationFetching = StatusFetching.pending;
        });
        builder.addCase(authentication.fulfilled, (state, { payload: { data } }) => {
            state.userInfo = data;
            state.statusAuthenticationFetching = StatusFetching.fulfilled;
        });
        builder.addCase(authentication.rejected, (state, { error }) => {
            setRejectedAuthenticationError(state, error);
        });

        builder.addCase(authenticationByToken.pending, state => {
            state.statusAuthenticationFetching = StatusFetching.pending;
        });
        builder.addCase(authenticationByToken.fulfilled, (state, { payload: { data } }) => {
            state.userInfo = data;
            state.statusAuthenticationFetching = StatusFetching.fulfilled;
        });
        builder.addCase(authenticationByToken.rejected, (state, { error }) => {
            setRejectedAuthenticationError(state, error);
        });
    },
});

export default authorization.reducer;
