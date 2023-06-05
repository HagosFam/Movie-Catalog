require("dotenv").config();
require("./api/data/dbconnection");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const routes = require("./api/routes");

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description: "My Movie API documentation for Express API",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["app.js", "/routes/index.js"] // Files that contain api routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use(bodyParser.json());

// Serve the Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use("/api", routes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log("Server running on", process.env.PORT);
});
