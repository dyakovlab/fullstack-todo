import swaggerJsDoc from "swagger-jsdoc";

const swaggerDefinition = {
  info: {
    title: "Todo list REST API",
    description: "Todo list REST API description",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "Development server",
    },
  ],
};

const options: swaggerJsDoc.Options = {
  swaggerDefinition,
  apis: ["./src/router/task.ts"],
};

export const swaggerDocs = swaggerJsDoc(options);
