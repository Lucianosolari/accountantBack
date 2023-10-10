const express = require("express");
const router = express.Router();
const customerTaxController = require("../controllers/customerTax");

// Route to get all customers
router.post("/customerTax", customerTaxController.createCustomerTax);

router.get("/customerTax", customerTaxController.getCustomersTax);

router.get("/customerTax/:customerId", customerTaxController.getTaxCustomer);

// Route to create a new customere

// Other routes for updating and deleting customers
// ...

module.exports = router;
