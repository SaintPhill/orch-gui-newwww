export const resolvers = {
    Query: {
        car: (_: undefined, { plateNumber }: any, { dataSources }: any) =>
            dataSources.mvrpAPI.getACar(plateNumber),
        cars: (_: undefined, __: undefined, { dataSources }: any) => dataSources.mvrpAPI.getAllCars(),
    },
    Car: {
        vehicleStatus: () => status,
        yearOfManufacture: ({ productionYear }: any) => productionYear,
    },
};
