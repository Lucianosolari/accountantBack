// routes/customers.js

const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");

// Route to get all customers
router.get("/task", taskController.getTask);

router.put("/task", taskController.updateTask);
// Route to create a new customer
router.post("/task", taskController.createTask);

module.exports = router;
