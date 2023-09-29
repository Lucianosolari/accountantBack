// routes/customers.js

const express = require("express");
const router = express.Router();
const expirationController = require("../controllers/expiration");

// Route to get all customers
router.get("/due_dates", expirationController.getExpiration);

// Route to create a new customer
router.post("/due_dates", expirationController.createExpiration);

router.get("/due_dates_with", expirationController.getExpirationWithTax);

// Other routes for updating and deleting customers
// ...

module.exports = router;
