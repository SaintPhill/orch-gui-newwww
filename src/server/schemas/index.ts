import { mergeSchemas } from 'graphql-tools';

import { CarsSchema } from './Car';

export const schema = mergeSchemas({
    schemas: [CarsSchema],
});
