// routes/customers.js

const express = require("express");
const router = express.Router();
const expirationController = require("../controllers/expiration");

// Route to get all customers
router.get("/due_dates", expirationController.getExpiration);

router.put("/due_dates", expirationController.updateExpiration);
// Route to create a new customer
router.post("/due_dates", expirationController.createExpiration);

router.get("/due_dates_with", expirationController.getExpirationWithTax);

router.get(
  "/due_dates_with_customers",
  expirationController.getExpirationWithTaxForCustomer
);
// Other routes for updating and deleting customers

// ...

module.exports = router;
