import { toApolloError } from 'apollo-server-core';
import { Processes } from 'orch-backend-types';

type ProcessesType = Processes.Get_Processes;
type ProcessErrorsType = Processes.Errors;
type ProcessStatusesType = Processes.Statuses;

export const resolvers = {
    Query: {
        async processes(_: undefined, __: undefined, { dataSources: { processesAPI } }: any) {
            let processes: ProcessesType;
            try {
                processes = await processesAPI.getProcesses();
            } catch (error) {
                throw toApolloError(error, error.code);
            }

            return processes;
        },

        async processErrors(_: undefined, __: undefined, { dataSources: { processesAPI } }: any) {
            let processErrors: ProcessErrorsType;
            try {
                processErrors = await processesAPI.getProcessErrors();
            } catch (error) {
                throw toApolloError(error, error.code);
            }

            return processErrors;
        },

        async processStatuses(_: undefined, __: undefined, { dataSources: { processesAPI } }: any) {
            let processStatuses: ProcessStatusesType;
            try {
                processStatuses = await processesAPI.getProcessStatuses();
            } catch (error) {
                throw toApolloError(error, error.code);
            }

            return processStatuses;
        },
    },
};
