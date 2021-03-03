import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DurationTemplate } from './DurationTemplate';
import { FilterName } from '../Dropdown/Dropdown';
import { workWithRequestsFilters, handleStepDuration } from '../../../../store/StoreSlices/selectedFilters';
import { isNumberOrEmptyString } from '../../../common/functions';

type Props = {
    deleteItSelf(filterName: FilterName): void
};

export enum StepDurationEnum {
    le = 'le',
    ge = 'ge',
    eq = 'eq',
}

export function DurationBehavior({ deleteItSelf }: Props): JSX.Element {
    const dispatch = useDispatch();
    const { stepDuration } = useSelector(workWithRequestsFilters);

    function onSvgIconClick(): void {
        deleteItSelf(FilterName.duration);
    }
    useEffect(() => () => {
        deleteItSelf(FilterName.duration);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function setGreatOrEquals(event: React.ChangeEvent<HTMLInputElement>): void {
        const { value } = event.target;
        if (isNumberOrEmptyString(value)) {
            dispatch(handleStepDuration({ durationName: StepDurationEnum.ge, value }));
        }
    }

    function setLessOrEquals(event: React.ChangeEvent<HTMLInputElement>): void {
        const { value } = event.target;
        if (isNumberOrEmptyString(value)) {
            dispatch(handleStepDuration({ durationName: StepDurationEnum.le, value }));
        }
    }

    function setEquals(event: React.ChangeEvent<HTMLInputElement>): void {
        const { value } = event.target;
        if (isNumberOrEmptyString(value)) {
            dispatch(handleStepDuration({ durationName: StepDurationEnum.eq, value }));
        }
    }

    return React.createElement(DurationTemplate, {
        stepDuration,
        setGreatOrEquals,
        setLessOrEquals,
        setEquals,
        onSvgIconClick,
    });
}
