import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

//OAS3 open api standard 3

//definicion de swagger
const swaggerDefinition: OAS3Definition = {
    openapi: '3.0.0', //
    //informacio sobre la doc hecha por swagger
    info: {
        title: 'Documentacion api de eventos',
        version: '1.0.0',
    },
    // los server a los cuales puede probar mis enpoind
    servers: [
        {
            url: 'http://localhost:4000',
        },
        {
            url: 'https://timecheck.up.railway.app',
        }
    ],
}

//opciones de swagger
const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts']

}

export default swaggerJSDoc(swaggerOptions);