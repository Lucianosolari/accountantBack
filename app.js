// app.js

const express = require("express");

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// Import the database configuration
require("./config/database");

// Middleware for processing JSON in requests
app.use(bodyParser.json());

const corsOptions = {
  origin: "http://127.0.0.1:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
// Import API routes related to customers
const customerRoutes = require("./routes/customer");
const taxRoutes = require("./routes/tax");
const expirationRoutes = require("./routes/expiration");
const customerTaxRoutes = require("./routes/customerTax");

// Configure routes
app.use("/api", customerRoutes, taxRoutes, expirationRoutes, customerTaxRoutes);

// Configure the port where the server will listen
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
