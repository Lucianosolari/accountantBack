// routes/customers.js

const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer");

// Route to get all customers
router.get("/customers", customerController.getCustomers);

// Route to create a new customer
router.post("/customers", customerController.createCustomer);

router.put("/customers/:id", customerController.updateCustomer);
// Other routes for updating and deleting customers
// ...

module.exports = router;
