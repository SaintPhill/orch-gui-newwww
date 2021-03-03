import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FlexibleSearchTemplate } from './FlexibleSearchTemplate';
import { FilterName } from '../Dropdown/Dropdown';
import { handleParameter, workWithRequestsFilters } from '../../../../store/StoreSlices/selectedFilters';

type Props = {
    deleteItSelf(filterName: FilterName): void
};

export enum ParameterEnum {
    name = 'name',
    value = 'value',
}

export function FlexibleSearchBehavior({ deleteItSelf }: Props): JSX.Element {
    const dispatch = useDispatch();
    const parameterName = useSelector(workWithRequestsFilters).flexibleSearch?.name || '';
    const parameterValue = useSelector(workWithRequestsFilters).flexibleSearch?.value || '';

    function onDeleteSvgClick(): void {
        deleteItSelf(FilterName.flexibleSearch);
    }
    useEffect(() => () => {
        deleteItSelf(FilterName.flexibleSearch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function setParameterName(event: React.ChangeEvent<HTMLInputElement>): void {
        const { value } = event.target;
        dispatch(handleParameter({ parameterField: ParameterEnum.name, value }));
    }

    function setParameterValue(event: React.ChangeEvent<HTMLInputElement>): void {
        const { value } = event.target;
        dispatch(handleParameter({ parameterField: ParameterEnum.value, value }));
    }

    return React.createElement(FlexibleSearchTemplate, {
        parameterName,
        parameterValue,
        setParameterName,
        setParameterValue,
        onDeleteSvgClick,
    });
}
