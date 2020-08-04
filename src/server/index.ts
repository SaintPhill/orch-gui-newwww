import { ApolloServer } from 'apollo-server';

import { schema } from './schemas';
import { FiltersAPI } from './datasources/FiltersAPI';
import { RequestsAPI } from './datasources/RequestsAPI';

const server = new ApolloServer({
    schema,
    dataSources: () => ({
        filtersAPI: new FiltersAPI(),
        requestsAPI: new RequestsAPI(),
    }),
});

// eslint-disable-next-line promise/catch-or-return,promise/always-return
server.listen().then(({ url }) => {
    // eslint-disable-next-line
    console.log(`🚀 Server ready at ${url}`);
});
