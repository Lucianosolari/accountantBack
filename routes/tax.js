// routes/customers.js

const express = require("express");
const router = express.Router();
const taxController = require("../controllers/tax");

// Route to get all customers
router.get("/taxes", taxController.getTaxes);

// Route to create a new customer
router.post("/taxes", taxController.createTaxes);

// Other routes for updating and deleting customers
// ...

module.exports = router;
