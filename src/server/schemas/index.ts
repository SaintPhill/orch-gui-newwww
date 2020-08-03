import { mergeSchemas } from 'graphql-tools';

import { FiltersSchema } from './Filters';
import { RequestsSchema } from './Requests';

export const schema = mergeSchemas({
    schemas: [FiltersSchema, RequestsSchema],
});
