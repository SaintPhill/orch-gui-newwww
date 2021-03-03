import React from 'react';
import classNames from 'classnames';

import { SpriteId } from '../SvgIcon/SvgIconTemplate';
import { Button } from '../Button';
import { ButtonTheme } from '../Button/ButtonTemplate';
import './UpdateButton.scss';


interface Props {
    isDisabled: boolean
    isPulsing?: boolean
    blockClass?: string
    onClick(): void
}

export function UpdateButtonTemplate({
    isPulsing,
    isDisabled,
    onClick,
    blockClass,
}: Props): JSX.Element {
    const ROOT_CLASS = 'update-button';
    const buttonClass = classNames(
        `${ROOT_CLASS}`,
        {
            [`${ROOT_CLASS}_pulsing`]: isPulsing,
        }
    );
    const blockClassName = classNames(
        {
            [`${blockClass}__${ROOT_CLASS}`]: blockClass,
        }
    );

    return (
        <div className={blockClassName}>
            <Button
                isDisabled={isDisabled}
                theme={ButtonTheme.blue}
                className={buttonClass}
                svgId={SpriteId.update}
                onClick={onClick}
            />
        </div>
    );
}
