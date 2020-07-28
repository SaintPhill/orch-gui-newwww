import { RESTDataSource } from 'apollo-datasource-rest';

export class RestAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://192.168.102.43:8081/orch/rest/';
    }

    async getAllProcesses(): Promise<any> {
        return this.get('processes');
    }
}
