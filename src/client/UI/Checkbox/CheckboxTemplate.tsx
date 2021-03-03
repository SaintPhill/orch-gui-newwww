import React from 'react';

import { SvgIcon } from '../SvgIcon';
import { SpriteId } from '../SvgIcon/SvgIconTemplate';
import classNames from 'classnames';
import './Checkbox.scss';

export enum CheckboxTheme {
    blue = 'blue',
    intermediate = 'intermediate',
    hasNoTheme = '',
}

interface Props {
    isChecked: boolean
    theme?: CheckboxTheme
    blockName?: string
    isDisabled?: boolean
    onClick?(): void
}

export function CheckboxTemplate({
    isChecked,
    onClick,
    blockName,
    theme,
}: Props): JSX.Element {
    const ROOT_CLASS = 'checkbox';
    const checkboxClass = classNames(
        ROOT_CLASS,
        {
            [`${ROOT_CLASS}_${theme}`]: !!theme,
            [`${blockName}__${ROOT_CLASS}`]: !!blockName,
        }
    );
    const iconClass = classNames(
        `${ROOT_CLASS}-icon`,
        {
            [`${ROOT_CLASS}-icon_${theme}`]: !!theme,
        }
    );

    return (
        <div className={checkboxClass} onClick={onClick}>
            <SvgIcon
                spriteId={isChecked ? SpriteId.checkbox : SpriteId.empty}
                className={iconClass}
            />
        </div>
    );
}
