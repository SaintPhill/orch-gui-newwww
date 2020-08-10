import React from 'react';

import { FiltersListBehavior } from './FiltersListBehavior';
import { useQuery, gql } from '@apollo/client';
import { GetFiltersValues } from '../../../apollo-query-types';

const FILTERS_QUERY = gql`
    query GetFiltersValues {
        processes {
            id
            alias
            name
            steps {
                alias
                name
                stepIndex
            }
        }
        statuses
    }
`;

export function FiltersListConnect(): JSX.Element {
    const { data } = useQuery<GetFiltersValues>(FILTERS_QUERY);
    return React.createElement(FiltersListBehavior, {
        filtersValuesQuery: data,
    });
}
