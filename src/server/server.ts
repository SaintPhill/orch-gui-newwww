import { ApolloServer } from 'apollo-server';

import { MvrpAPI } from './datasources/MvrpAPI';
import { schema } from './schemas';

const server = new ApolloServer({
    schema,
    dataSources: () => ({
        mvrpAPI: new MvrpAPI(),
    }),
});

// eslint-disable-next-line promise/catch-or-return,promise/always-return
server.listen().then(({ url }) => {
    // eslint-disable-next-line
    console.log(`🚀 Server ready at ${url}`);
});
