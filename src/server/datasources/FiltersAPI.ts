import { RESTDataSource } from 'apollo-datasource-rest';
import { Filters } from 'orch-backend-types';

export class FiltersAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://192.168.102.43:8081/orch/rest/';
    }

    async getProcesses(): Promise<Filters.Processes> {
        return this.get('processes');
    }

    async getErrors(): Promise<Filters.Errors> {
        return this.get('errors');
    }

    async getStatuses(): Promise<Filters.Statuses> {
        return this.get('statuses');
    }
}
