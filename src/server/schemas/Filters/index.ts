import { join } from 'path';
import { readFileSync } from 'fs';
import { makeExecutableSchema } from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = readFileSync(join(__dirname, 'typeDefs.graphql'), { encoding: 'utf-8' });

export const FiltersSchema = makeExecutableSchema({ typeDefs, resolvers });
