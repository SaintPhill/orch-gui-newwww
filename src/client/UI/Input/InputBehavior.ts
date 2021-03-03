import React, { useEffect, useRef } from 'react';

import { InputTemplate } from './InputTemplate';
import { SpriteId } from '../SvgIcon/SvgIconTemplate';
import { FilterName } from '../../components/Filters/Dropdown/Dropdown';


export enum InputType {
    Text = 'text',
    Password = 'password',
}

export interface InputBehaviourProps {
    type: InputType
    label: string
    value: string
    blockClass: string
    errorMessage?: string
    isFocused?: boolean
    placeHolder?: string
    deleteSvgId?: SpriteId
    clearSvgId?: SpriteId
    onBlur?(): void
    deleteItSelf?(filterName: FilterName): void
    onClearSvgClick?(): void
    onChange(event: React.ChangeEvent<HTMLInputElement>): void
}

export function InputBehavior(props: InputBehaviourProps): JSX.Element {
    const inputRef = useRef<HTMLInputElement>(null);

    function onDeleteSvgClick(): void {
        if (props.deleteItSelf) {
            props.deleteItSelf(props.label as FilterName);
        }
    }
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => () => {
        onDeleteSvgClick();
    }, []);

    useEffect(() => {
        if (inputRef && inputRef.current && (props.isFocused || props.errorMessage)) {
            inputRef.current.focus();
        }
    }, [props.isFocused, props.errorMessage]);

    return React.createElement(InputTemplate, { ...props, inputRef, onDeleteSvgClick });
}
