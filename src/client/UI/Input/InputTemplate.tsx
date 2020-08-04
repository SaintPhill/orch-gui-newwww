import React from 'react';
import classnames from 'classnames';

import { InputBehaviourProps } from './InputBehavior';

interface Props extends InputBehaviourProps {
    inputRef: React.RefObject<HTMLInputElement>
}

export function InputTemplate({
    name,
    type,
    label,
    value,
    blockClass,
    errorMessage,
    inputRef,
    onChange,
    placeHolder,
    modifier,
    onBlur,
}: Props): JSX.Element {
    const inputClassName = classnames(
        `${blockClass}__item-input`,
        {
            [`${blockClass}__item-input_error`]: errorMessage,
            [`${blockClass}__item-input_${modifier}`]: modifier,
        },
    );

    return (
        <label className={`${blockClass}__item-block`}>
            <span className={`${blockClass}__item-label`}>{label}</span>
            <input
                onBlur={onBlur}
                className={inputClassName}
                type={type}
                name={name}
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
