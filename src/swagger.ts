import swaggerAutogen from 'swagger-autogen';
import path from 'path';

const outputFile = path.resolve(__dirname, '../dist/swagger.output.json');
const endpointsFiles = [
    path.resolve(__dirname, './interfaces/routers/index.js'),
];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles);
