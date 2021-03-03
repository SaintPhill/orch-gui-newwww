import React from 'react';

import { SvgIcon } from '../../../UI/SvgIcon';
import { SpriteId } from '../../../UI/SvgIcon/SvgIconTemplate';
import './FlexibleSearch.scss';

type Props = {
    parameterName: string
    parameterValue: string
    setParameterName(event: React.ChangeEvent<HTMLInputElement>): void
    setParameterValue(event: React.ChangeEvent<HTMLInputElement>): void
    onDeleteSvgClick(): void
};

export function FlexibleSearchTemplate({
    parameterName,
    parameterValue,
    onDeleteSvgClick,
    setParameterName,
    setParameterValue,
}: Props): JSX.Element {
    const ROOT_CLASS = 'flexible-search';

    return (
        <div className={ROOT_CLASS}>
            <div className={`${ROOT_CLASS}__title`}>
                Гибкий поиск
                <SvgIcon
                    onClick={onDeleteSvgClick}
                    spriteId={SpriteId.blackCruce}
                    className={`${ROOT_CLASS}__delete-svg`}
                />
            </div>
            <label className={`${ROOT_CLASS}__label`}>
                Названиа атрибута
                <input
                    className={`${ROOT_CLASS}__input`}
                    value={parameterName}
                    onChange={setParameterName}
                    placeholder={'Введите'}
                />
            </label>
            <label className={`${ROOT_CLASS}__label`}>
                Значение атрибута
                <input
                    className={`${ROOT_CLASS}__input`}
                    value={parameterValue}
                    onChange={setParameterValue}
                    placeholder={'Введите'}
                />
            </label>
        </div>
    );
}
