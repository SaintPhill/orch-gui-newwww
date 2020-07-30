import { RESTDataSource } from 'apollo-datasource-rest';
import { Processes, ProcessErrors } from 'orch-backend-types';

export class RestAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://192.168.102.43:8081/orch/rest/';
    }

    async getProcesses(): Promise<Processes.Get> {
        return this.get('processes');
    }

    async getProcessErrors(): Promise<ProcessErrors.Get> {
        return this.get('errors');
    }
}
