import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Consultas Médicas API",
      version: "1.0.0",
      description: "API para gerenciamento de consultas médicas e prontuários",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: [
    path.resolve(process.cwd(), "src/main/swaggerSchemas.ts"),
    path.resolve(process.cwd(), "src/adapters/in/http/*.ts"),
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
