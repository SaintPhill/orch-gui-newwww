import { mergeSchemas } from 'graphql-tools';

import { ProcessesSchema } from './Processes';
import { ProcessErrorsSchema } from './ProcessErrors';

export const schema = mergeSchemas({
    schemas: [ProcessesSchema, ProcessErrorsSchema],
});
