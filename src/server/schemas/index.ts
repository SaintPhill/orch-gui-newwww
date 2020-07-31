import { mergeSchemas } from 'graphql-tools';

import { FiltersSchema } from './Filters';

export const schema = mergeSchemas({
    schemas: [FiltersSchema],
});
