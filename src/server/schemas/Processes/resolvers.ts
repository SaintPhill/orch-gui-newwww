import { ApolloError } from 'apollo-server-errors';

export const resolvers = {
    Query: {
        async processes(_: undefined, __: undefined, { dataSources }: any) {
            let processes: any;
            try {
                processes = await dataSources.restAPI.getAllProcesses();
            } catch (error) {
                if (error instanceof ApolloError && ('FORBIDDEN' === error.extensions.code
                    || error.message.startsWith('404:'))) {
                    return null;
                }
                throw error;
            }

            return processes;
        },
    },
};
