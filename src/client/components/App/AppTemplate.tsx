import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store/StoreSlices';
import { MainLayout } from '../../pages/MainLaytout';
import { StatusFetching } from '../../../store/StoreSlices/filtersOptions';
import { Authentication } from '../../pages/Authentication';
import { accessTokenName, authenticationByToken } from '../../../store/StoreSlices/authorization';
import './App.scss';

export function AppTemplate(): JSX.Element {
    const dispatch = useDispatch();
    const isUserAuthorized = useSelector((state: RootState) => state.authorization.userInfo);
    const accessToken = localStorage.getItem(accessTokenName);
    const statusAuthenticationFetching = useSelector((state: RootState) =>
        state.authorization.statusAuthenticationFetching);

    const isSpinnerShown = (accessToken || statusAuthenticationFetching === StatusFetching.pending) &&
         statusAuthenticationFetching !== StatusFetching.rejected && !isUserAuthorized;

    useEffect(() => {
        if (!isUserAuthorized && accessToken) {
            dispatch(authenticationByToken(accessToken));
        }
    }, [accessToken, isUserAuthorized, dispatch]);

    return (
        <div className="app">
            {isSpinnerShown &&
                <div className={'app__spinner'}>
                    <Spin size={'large'} />
                </div>
            }

            {!(accessToken && isUserAuthorized) && statusAuthenticationFetching !== StatusFetching.pending &&
                <Authentication />
            }

            {isUserAuthorized &&
                <MainLayout />
            }
        </div>
    );
}

