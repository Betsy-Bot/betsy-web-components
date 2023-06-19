process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
module.exports = {
    api: {
        input: 'http://localhost:5000/swagger/v1/swagger.json',
        output: {
            workspace: './src/services/',
            target: './betsy-api-service.ts',
            client: false,
            schema: true,
        }
    },
};
