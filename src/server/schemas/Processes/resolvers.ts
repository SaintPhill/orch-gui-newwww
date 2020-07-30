import { toApolloError } from 'apollo-server-core';
import { Processes } from 'orch-backend-types';

type ProcessesType = Processes.Get_Processes;

export const resolvers = {
    Query: {
        async processes(_: undefined, __: undefined, { dataSources: { restAPI } }: any) {
            let processes: ProcessesType;
            try {
                processes = await restAPI.getProcesses();
            } catch (error) {
                throw toApolloError(error, error.code);
            }

            return processes;
        },
    },
};
