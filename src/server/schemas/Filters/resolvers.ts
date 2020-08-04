import { toApolloError } from 'apollo-server-core';
import { Filters } from 'orch-backend-types';

type ProcessesType = Filters.Get_Processes[];
type ErrorsType = Filters.Errors[];
type StatusesType = Filters.Statuses;

export const resolvers = {
    Query: {
        async processes(_: undefined, __: undefined, { dataSources: { filtersAPI } }: any) {
            let processes: ProcessesType;
            try {
                processes = await filtersAPI.getProcesses();
            } catch (error) {
                throw toApolloError(error, error.code);
            }
            return processes;
        },

        async errors(_: undefined, __: undefined, { dataSources: { filtersAPI } }: any) {
            let errors: ErrorsType;
            try {
                errors = await filtersAPI.getErrors();
            } catch (error) {
                throw toApolloError(error, error.code);
            }

            return errors;
        },

        async statuses(_: undefined, __: undefined, { dataSources: { filtersAPI } }: any) {
            let statuses: StatusesType;
            try {
                statuses = await filtersAPI.getStatuses();
            } catch (error) {
                throw toApolloError(error, error.code);
            }

            return statuses;
        },
    },
};
