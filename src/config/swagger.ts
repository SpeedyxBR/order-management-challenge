import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Order Management API',
      version: '1.0.0',
      description: 'API for managing orders with authentication and state transitions',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            email: { type: 'string', example: 'test@example.com' },
            password: { type: 'string', example: '123456' },
          },
          required: ['email', 'password'],
        },
        Service: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Blood Test' },
            value: { type: 'number', example: 150 },
            status: { type: 'string', enum: ['PENDING', 'DONE'], example: 'PENDING' },
          },
        },
        Order: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            lab: { type: 'string', example: 'Lab ABC' },
            patient: { type: 'string', example: 'John Doe' },
            customer: { type: 'string', example: 'Hospital XYZ' },
            state: { type: 'string', enum: ['CREATED', 'ANALYSIS', 'COMPLETED'] },
            status: { type: 'string', enum: ['ACTIVE', 'DELETED'] },
            services: { type: 'array', items: { $ref: '#/components/schemas/Service' } },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        CreateOrder: {
          type: 'object',
          properties: {
            lab: { type: 'string', example: 'Lab ABC' },
            patient: { type: 'string', example: 'John Doe' },
            customer: { type: 'string', example: 'Hospital XYZ' },
            services: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  value: { type: 'number' },
                },
              },
              example: [
                { name: 'Blood Test', value: 150 },
                { name: 'X-Ray', value: 200 },
              ],
            },
          },
          required: ['lab', 'patient', 'customer', 'services'],
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
