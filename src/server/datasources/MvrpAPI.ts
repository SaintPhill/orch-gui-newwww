import { RESTDataSource } from 'apollo-datasource-rest';

export class MvrpAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://mvrp.herokuapp.com/api/';
    }

    async getAllCars(): Promise<any> {
        return this.get('cars');
    }

    async getACar(plateNumber: any): Promise<any> {
        return this.get('car', {
            plateNumber,
        });
    }
}
