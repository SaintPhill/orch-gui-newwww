import React from 'react';

import { HeaderTemplate } from './HeaderTemplate';
import { useDispatch, useSelector } from 'react-redux';
import { MainLayoutState, switchMainLayout } from '../../../store/StoreSlices/visibility';
import { RootState } from '../../../store/StoreSlices';
import { accessTokenName } from '../../../store/StoreSlices/authorization';


export function HeaderBehavior(): JSX.Element {
    const dispatch = useDispatch();
    const mainLayoutState = useSelector((state: RootState) => state.visibility.mainLayoutState);
    const { first_name: firstName, last_name: lastName } =
        useSelector((state: RootState) => state.authorization.userInfo)!;

    function onWorkWithRequestsButtonClick(): void {
        if (mainLayoutState !== MainLayoutState.workWithRequests) {
            dispatch(switchMainLayout(MainLayoutState.workWithRequests));
        }
    }
    function onTransactionLogButtonClick(): void {
        if (mainLayoutState !== MainLayoutState.transactionLog) {
            dispatch(switchMainLayout(MainLayoutState.transactionLog));
        }
    }
    function onAdministrationButtonClick(): void {
        if (mainLayoutState !== MainLayoutState.administration) {
            dispatch(switchMainLayout(MainLayoutState.administration));
        }
    }

    function onLogoutButtonClick(): void {
        localStorage.removeItem(accessTokenName);
        document.location.reload();
    }

    return React.createElement(HeaderTemplate, {
        firstName,
        lastName,
        mainLayoutState,
        onLogoutButtonClick,
        onTransactionLogButtonClick,
        onAdministrationButtonClick,
        onWorkWithRequestsButtonClick,
    });
}
