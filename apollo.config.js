module.exports = {
    client: {
        service: {
            name: 'Orch console',
            url: `http://localhost:4000/graphql`,
        },
        includes: [
            './src/**/*.ts',
        ],
    },
};
