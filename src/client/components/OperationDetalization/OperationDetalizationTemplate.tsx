import React from 'react';
import classNames from 'classnames';

import { SpriteId } from '../../UI/SvgIcon/SvgIconTemplate';
import { OperationDetalizationTable } from './OperationDetalizationTable';
import { SvgIcon } from '../../UI/SvgIcon';
import './OperationDetalization.scss';

interface Props {
    isOperationsTableHidden: boolean
    isOperationDetalizationTableHidden: boolean
    toggleTableVisibility(): void
}

export function OperationDetalizationTemplate({
    isOperationsTableHidden,
    isOperationDetalizationTableHidden,
    toggleTableVisibility,
}: Props): JSX.Element {
    const ROOT_CLASS = 'operation-detalization';

    const filtrationResultClass = classNames(
        ROOT_CLASS,
        {
            [`${ROOT_CLASS}_hidden`]: isOperationDetalizationTableHidden,
            [`${ROOT_CLASS}_full-screen`]: isOperationsTableHidden,
        }
    );
    const toggleIconClass = classNames(
        `${ROOT_CLASS}__toggle-icon`,
        {
            [`${ROOT_CLASS}__toggle-icon_up`]: isOperationDetalizationTableHidden,
        }
    );

    return (
        <div className={filtrationResultClass}>
            <div className={`${ROOT_CLASS}__header`}>
                <h1 className={`${ROOT_CLASS}__title`}>Детализация операции</h1>
                {!isOperationsTableHidden &&
                    <SvgIcon
                        onClick={toggleTableVisibility}
                        className={toggleIconClass}
                        spriteId={SpriteId.arrowLeft}
                    />
                }
            </div>

            {!isOperationDetalizationTableHidden && <OperationDetalizationTable />}
        </div>
    );
}
