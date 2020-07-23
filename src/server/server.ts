import { ApolloServer } from 'apollo-server';

import { MvrpAPI } from './datasources/MvrpAPI';
import { schema } from './schemas';

const server = new ApolloServer({
    schema,
    dataSources: () => ({
        mvrpAPI: new MvrpAPI(),
    }),
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
