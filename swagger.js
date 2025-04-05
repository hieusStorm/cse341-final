const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Monsters Hunter Wilds Builds Api',
        description: 'Builds for Monster Hunter Wilds Api'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);