require("dotenv").config();
require("./api/data/dbconnection");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./api/routes");
const express = require("express");
const app = express();
app.use(cors({
  origin:['*', 'http://localhost:4200','http://127.0.0.1:4200'],
  credentials:false
}));
app.use(bodyParser.json());
app.use("/api", routes)
// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log("Server running on", process.env.PORT);
});
