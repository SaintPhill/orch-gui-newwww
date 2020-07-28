import { ApolloServer } from 'apollo-server';

import { schema } from './schemas';
import { RestAPI } from './datasources/RestAPI';

const server = new ApolloServer({
    schema,
    dataSources: () => ({
        restAPI: new RestAPI(),
    }),
});

// eslint-disable-next-line promise/catch-or-return,promise/always-return
server.listen().then(({ url }) => {
    // eslint-disable-next-line
    console.log(`🚀 Server ready at ${url}`);
});
