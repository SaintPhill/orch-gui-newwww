import { ApolloServer } from 'apollo-server';

import { schema } from './schemas';
import { ProcessesAPI } from './datasources/ProcessesAPI';

const server = new ApolloServer({
    schema,
    dataSources: () => ({
        processesAPI: new ProcessesAPI(),
    }),
});

// eslint-disable-next-line promise/catch-or-return,promise/always-return
server.listen().then(({ url }) => {
    // eslint-disable-next-line
    console.log(`🚀 Server ready at ${url}`);
});
