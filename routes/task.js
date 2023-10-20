// routes/customers.js

const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");

// Route to get all customers
router.get("/task", taskController.getTask);

router.get("/taskPending", taskController.getPendingTasks);

router.put("/task", taskController.updateTask);

router.delete("/taskDelete", taskController.deletePendingTasksById);

router.put("/taskDate", taskController.updateTaskNewDueDate);
// Route to create a new customer
router.post("/task", taskController.createTask);

module.exports = router;
