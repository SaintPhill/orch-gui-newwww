import React from 'react';
import classnames from 'classnames';

import { InputBehaviourProps } from './InputBehavior';
import { SvgIcon } from '../SvgIcon';
import { SpriteId } from '../SvgIcon/SvgIconTemplate';

interface Props extends InputBehaviourProps {
    inputRef: React.RefObject<HTMLInputElement>
    onDeleteSvgClick?(): void
}

export function InputTemplate({
    type,
    label,
    value,
    blockClass,
    errorMessage,
    inputRef,
    onChange,
    placeHolder,
    onBlur,
    deleteSvgId,
    onClearSvgClick,
    onDeleteSvgClick,
}: Props): JSX.Element {
    const inputClassName = classnames(
        `${blockClass}__input-field`,
        {
            [`${blockClass}__item-input_error`]: errorMessage,
        },
    );

    return (
        <label className={`${blockClass}__input-block`}>
            {onClearSvgClick &&
                <SvgIcon
                    onClick={onClearSvgClick}
                    spriteId={value ? SpriteId.clearIndicator : SpriteId.empty}
                    className={`${blockClass}__input-clear-svg`}
                />
            }
            <span className={`${blockClass}__input-label`}>
                {label}
                {deleteSvgId &&
                    <SvgIcon
                        onClick={onDeleteSvgClick}
                        spriteId={deleteSvgId}
                        className={`${blockClass}__input-delete-svg`}
                    />
                }
            </span>
            <input
                onBlur={onBlur}
                className={inputClassName}
                type={type}
                value={value}
                onChange={onChange}
                ref={inputRef}
                placeholder={placeHolder}
            />
            {errorMessage &&
                    <div className={`${blockClass}__error-message`}>{errorMessage}</div>
            }
        </label>
    );
}
