import React from 'react';
import classNames from 'classnames';

import { Button } from '../../UI/Button';
import { SvgIcon } from '../../UI/SvgIcon';
import { SpriteId } from '../../UI/SvgIcon/SvgIconTemplate';
import { MainLayoutState } from '../../../store/StoreSlices/visibility';
import './Header.scss';

type Props = {
    firstName: string
    lastName: string
    mainLayoutState: MainLayoutState
    onLogoutButtonClick(): void
    onTransactionLogButtonClick(): void
    onAdministrationButtonClick(): void
    onWorkWithRequestsButtonClick(): void
};

export function HeaderTemplate({
    firstName,
    lastName,
    mainLayoutState,
    onLogoutButtonClick,
    onTransactionLogButtonClick,
    onWorkWithRequestsButtonClick,
    onAdministrationButtonClick,
}: Props): JSX.Element {
    const ROOT_CLASS = 'header';

    const workWithRequestsButton = classNames(
        `${ROOT_CLASS}__button`,
        {
            [`${ROOT_CLASS}__button_active`]: mainLayoutState === MainLayoutState.workWithRequests,
        }
    );
    const transactionLogButton = classNames(
        `${ROOT_CLASS}__button`,
        {
            [`${ROOT_CLASS}__button_active`]: mainLayoutState === MainLayoutState.transactionLog,
        }
    );
    const administrationButton = classNames(
        `${ROOT_CLASS}__button`,
        {
            [`${ROOT_CLASS}__button_active`]: mainLayoutState === MainLayoutState.administration,
        }
    );

    return (
        <header className={ROOT_CLASS}>
            <SvgIcon spriteId={SpriteId.tricolor} className={`${ROOT_CLASS}__tricolor-icon`} />
            <div className={`${ROOT_CLASS}__wrapper`}>
                <div className={`${ROOT_CLASS}__buttons-wrapper`}>
                    <Button
                        onClick={onWorkWithRequestsButtonClick}
                        className={workWithRequestsButton}
                    >
                        {MainLayoutState.workWithRequests}
                    </Button>
                    <Button onClick={onTransactionLogButtonClick} className={transactionLogButton}>
                        {MainLayoutState.transactionLog}
                    </Button>
                    <Button onClick={onAdministrationButtonClick} className={administrationButton}>
                        {MainLayoutState.administration}
                    </Button>
                </div>
                <div className={`${ROOT_CLASS}__login-information`}>
                    <div className={`${ROOT_CLASS}__user-name`}>
                        {firstName} / {lastName}
                    </div>
                    <Button
                        onClick={onLogoutButtonClick}
                        svgId={SpriteId.logout}
                        className={`${ROOT_CLASS}__logout-button`}
                    >
                        Выход
                    </Button>
                </div>
            </div>
        </header>
    );
}
