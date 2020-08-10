import { toApolloError } from 'apollo-server-core';
import { Request } from 'orch-backend-types';

type RequestsType = Request.List[];
type RequestByIdType = Request.Get;

export interface RequestsParams {
    process: string | null
    status: string | null
    step: Step
    period?: Period
    parameter?: Parameter
    reverse_order?: boolean
    limit?: number
}

interface Step {
    alias: string | null
    status: string | null
}

interface Period {
    from: number
    to: number
}

interface Parameter {
    name: string
    value: string
}

export const resolvers = {
    Query: {
        async requests(
            _: undefined,
            params: RequestsParams,
            { dataSources: { requestsAPI } }: any
        ) {
            let requests: RequestsType;
            try {
                requests = await requestsAPI.findRequests(params);
            } catch (error) {
                throw toApolloError(error, error.code);
            }

            return requests;
        },

        async requestById(
            _: undefined,
            params: { id: number },
            { dataSources: { requestsAPI } }: any
        ) {
            let request: RequestByIdType;
            try {
                request = await requestsAPI.findRequestById(params.id);
            } catch (error) {
                throw toApolloError(error, error.code);
            }

            return request;
        },
    },
};
