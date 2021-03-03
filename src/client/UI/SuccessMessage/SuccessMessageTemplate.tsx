import React from 'react';
import classnames from 'classnames';

import { SvgIcon } from '../SvgIcon';
import { SpriteId } from '../SvgIcon/SvgIconTemplate';
import './SuccessMessage.scss';

type Props = {
    blockClass: string
    isVisible: boolean
};

export function SuccessMessageTemplate({ blockClass, isVisible }: Props): JSX.Element | null {
    const ROOT_CLASS = 'success-message';
    const wrapperClass = classnames(
        ROOT_CLASS,
        {
            [`${blockClass}__success-message`]: !!blockClass,
        }
    );

    return isVisible ?
        <div className={wrapperClass}>
            <SvgIcon
                className={`${ROOT_CLASS}__icon`}
                spriteId={SpriteId.success}
            />
            <span className={`${ROOT_CLASS}__text`}>
                    Операция выполнена успешно
            </span>
        </div>
        : null;
}
