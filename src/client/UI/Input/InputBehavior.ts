import React, { useEffect, useRef } from 'react';

import { InputTemplate } from './InputTemplate';


export enum InputType {
    Text = 'text',
    Password = 'password',
}

export interface InputBehaviourProps {
    type: InputType
    name: string
    label: string
    value: string
    blockClass: string
    errorMessage?: string
    isFocused?: boolean
    placeHolder?: string
    modifier?: string
    onBlur?(): void
    onChange(event: React.ChangeEvent<HTMLInputElement>): void
}

export function InputBehavior(props: InputBehaviourProps): JSX.Element {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (props.isFocused || props.errorMessage) {
            inputRef.current!.focus();
        }
    }, [props.isFocused, props.errorMessage]);

    return React.createElement(InputTemplate, { ...props, inputRef });
}
