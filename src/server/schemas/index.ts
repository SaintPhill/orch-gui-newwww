import { mergeSchemas } from 'graphql-tools';

import { ProcessesSchema } from './Processes';

export const schema = mergeSchemas({
    schemas: [ProcessesSchema],
});
