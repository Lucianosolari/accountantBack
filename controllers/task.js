// controllers/customer.js

const Task = require("../models/task");

// Controlador para obtener todos los clientes
exports.getTask = async (req, res) => {
  try {
    const task = await Task.getAll();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving task" });
  }
};

// Controlador para crear un nuevo cliente
exports.createTask = async (req, res) => {
  try {
    const { customerId, taxId, dueDate, notes } = req.body;
    await Task.create(customerId, taxId, dueDate, notes);
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating a Task" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { taskId, present, paid, dueDate, notes } = req.body;
    await Task.updateTask(taskId, present, paid, dueDate, notes);
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating a Task" });
  }
};
