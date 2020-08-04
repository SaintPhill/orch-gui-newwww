import { toApolloError } from 'apollo-server-core';
import { Request } from 'orch-backend-types';

type RequestsType = Request.List[];

export interface RequestsParams {
    process?: string
    status?: string
    step?: Step
    period?: Period
    parameter?: Parameter
    reverse_order?: boolean
    limit?: number
}

interface Step {
    alias?: string
    error_code?: number
    status?: string
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
    },
};
