/*
 * @file: swagger-config.js
 * @description: It Contain swagger configrations.
 * @author: Jasdeep Singh
 */

import swaggerJsDocs from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Tiger test project apis",
      version: "1.0",
      description: "All api end points",
      contact: {
        name: "Jasdeep Singh"
      },
      servers: ["http://localhost:3000"]
    },
    produces: ["application/json"]
  },
  apis: ["./api/v1/*/*.js"]
};
export default swaggerJsDocs(swaggerOptions);
