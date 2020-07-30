import { RESTDataSource } from 'apollo-datasource-rest';
import { Processes } from 'orch-backend-types';

export class RestAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://192.168.102.43:8081/orch/rest/';
    }

    async getProcesses(): Promise<Processes.Get> {
        return this.get('processes');
    }

    async getProcessErrors(): Promise<Processes.Errors> {
        return this.get('errors');
    }
}
