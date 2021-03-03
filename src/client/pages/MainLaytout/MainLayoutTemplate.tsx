import React from 'react';

import { Header } from '../../components/Header';
import { Filters } from '../../components/Filters';
import { Detalization } from '../../components/Detalization';
import { FiltrationResult } from '../../components/FiltrationResult';
import { MainLayoutState } from '../../../store/StoreSlices/visibility';
import { SpriteId } from '../../UI/SvgIcon/SvgIconTemplate';
import { Button } from '../../UI/Button';
import { Operations } from '../../components/Operations';
import { OperationDetalization } from '../../components/OperationDetalization';
import RolesModule from '../../../roleModel/RolesModule/RolesModule';
import './MainLaytout.scss';

interface Props {
    isFiltersHidden: boolean
    mainLayoutState: MainLayoutState
    toggleFilters(): void
}

export function MainLayoutTemplate({
    isFiltersHidden,
    mainLayoutState,
    toggleFilters,
}: Props): JSX.Element {
    const ROOT_CLASS = 'main-layout';
    const isWorkWithRequestsLayout = mainLayoutState === MainLayoutState.workWithRequests;
    const isTransactionLogLayout = mainLayoutState === MainLayoutState.transactionLog;
    const isAdministrationLayout = mainLayoutState === MainLayoutState.administration;

    return (
        <div className={ROOT_CLASS}>
            <div className={`${ROOT_CLASS}__side-bar`}>
                {!isAdministrationLayout &&
                    <Button
                        svgId={SpriteId.burger}
                        className={`${ROOT_CLASS}__toggle-filters-button`}
                        onClick={toggleFilters}
                    />
                }
            </div>
            {isFiltersHidden &&
                <Button
                    svgId={SpriteId.burger}
                    className={`${ROOT_CLASS}__toggle-filters-button_absolute`}
                    onClick={toggleFilters}
                />
            }
            <Header />
            <div className={`${ROOT_CLASS}__content`}>
                {!isAdministrationLayout && <Filters/>}

                <div className={`${ROOT_CLASS}__tables`}>
                    {isWorkWithRequestsLayout &&
                        <>
                            <FiltrationResult/>
                            <Detalization/>
                        </>
                    }
                    {isTransactionLogLayout &&
                        <>
                            <Operations/>
                            <OperationDetalization />
                        </>
                    }
                    {isAdministrationLayout && <RolesModule />}
                </div>
            </div>
        </div>
    );
}
