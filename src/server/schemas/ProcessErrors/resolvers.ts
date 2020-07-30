import { toApolloError } from 'apollo-server-core';
import { Processes } from 'orch-backend-types';

type ProcessErrorsType = Processes.Get_Errors;

export const resolvers = {
    Query: {
        async processErrors(_: undefined, __: undefined, { dataSources: { restAPI } }: any) {
            let processErrors: ProcessErrorsType;
            try {
                processErrors = await restAPI.getProcessErrors();
            } catch (error) {
                throw toApolloError(error, error.code);
            }

            return processErrors;
        },
    },
};
