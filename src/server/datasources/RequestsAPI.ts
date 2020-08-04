import { RESTDataSource } from 'apollo-datasource-rest';
import { Request } from 'orch-backend-types';
import { RequestsParams } from '../schemas/Requests/resolvers';

export class RequestsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://192.168.102.43:8081/orch/rest/requests/';
    }

    async findRequests(params: RequestsParams): Promise<Request.List> {
        return this.post('search', params);
    }
}
