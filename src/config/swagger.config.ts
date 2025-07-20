
// @ts-ignore
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express, Request, Response } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Avila Tek E-commerce API',
            description:
                'API REST para plataforma de comercio electrónico. Permite la autenticación de usuarios mediante JWT, gestión de productos, procesamiento de pedidos, y administración de inventarios, garantizando seguridad, escalabilidad y un manejo eficiente de datos.',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                BearerToken: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [ { BearerToken: [],}, ],
    },
    apis: ['src/docs/*.ts'], 
};

const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app: Express, port?: number): void {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}