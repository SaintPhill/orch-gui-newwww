import { combineReducers } from 'redux';

import selectedFilters from './selectedFilters';
import filtersOptions from './filtersOptions';
import requests from './requests';
import visibility from './visibility';
import filtrationResult from './filtrationResult';
import massOperations from './massOperations';
import authorization from './authorization';

export const reducers = combineReducers({
    selectedFilters,
    filtersOptions,
    requests,
    visibility,
    filtrationResult,
    massOperations,
    authorization,
});

export type RootState = ReturnType<typeof reducers>;
