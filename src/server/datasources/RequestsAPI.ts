import { RESTDataSource } from 'apollo-datasource-rest';
import { Request } from 'orch-backend-types';
import { RequestsParams } from '../schemas/Requests/resolvers';

export class RequestsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://192.168.102.43:8081/orch/rest/requests/';
    }

    async findRequestById(id: number): Promise<Request.Get> {
        return this.get(`/${id}/?show_executions=true&show_parameters=true`);
    }

    async findRequests(params: RequestsParams): Promise<Request.List> {
        return this.post('search', params);
    }
}
