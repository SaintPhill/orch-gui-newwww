import React from 'react';

import { SvgIcon } from '../../../UI/SvgIcon';
import { SpriteId } from '../../../UI/SvgIcon/SvgIconTemplate';
import { StepDuration } from '../../../../store/StoreSlices/selectedFilters';
import './Duration.scss';

type Props = {
    stepDuration: StepDuration | null
    onSvgIconClick(): void
    setGreatOrEquals(event: React.ChangeEvent<HTMLInputElement>): void
    setLessOrEquals(event: React.ChangeEvent<HTMLInputElement>): void
    setEquals(event: React.ChangeEvent<HTMLInputElement>): void
};

export function DurationTemplate({
    stepDuration,
    onSvgIconClick,
    setGreatOrEquals,
    setLessOrEquals,
    setEquals,
}: Props): JSX.Element {
    const ROOT_CLASS = 'duration';

    return (
        <div className={ROOT_CLASS}>
            <div className={`${ROOT_CLASS}__title`}>
                Длительность
                <SvgIcon
                    onClick={onSvgIconClick}
                    className={`${ROOT_CLASS}__delete-svg`}
                    spriteId={SpriteId.blackCruce}
                />
            </div>
            <div className={`${ROOT_CLASS}__input-wrapper`}>
                <div>
                    {'>'}
                    <input
                        value={stepDuration?.ge ? String(stepDuration.ge) : ''}
                        onChange={setGreatOrEquals}
                        className={`${ROOT_CLASS}__input`}
                        placeholder={'Ввести'}
                    />
                </div>
                <div>
                    {'<'}
                    <input
                        value={stepDuration?.le ? String(stepDuration.le) : ''}
                        onChange={setLessOrEquals}
                        className={`${ROOT_CLASS}__input`}
                        placeholder={'Ввести'}
                    />
                </div>
                <div>
                    {'='}
                    <input
                        value={stepDuration?.eq ? String(stepDuration.eq) : ''}
                        onChange={setEquals}
                        className={`${ROOT_CLASS}__input`}
                        placeholder={'Ввести'}
                    />
                </div>
            </div>
        </div>
    );
}
