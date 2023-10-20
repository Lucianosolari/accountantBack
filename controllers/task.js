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

exports.getPendingTasks = async (req, res) => {
  try {
    const task = await Task.getAllPendingTask();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error get task" });
  }
};

exports.deletePendingTasksById = async (req, res) => {
  try {
    const { id } = req.body;
    const rowsDeleted = await Task.deletePendingTasksById(id);

    if (rowsDeleted === 1) {
      res.json({ message: "Tarea eliminada exitosamente." });
    } else {
      res
        .status(404)
        .json({ message: "No se encontró la tarea o no se pudo eliminar." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la tarea" });
  }
};

// Controlador para crear un nuevo cliente
exports.createTask = async (req, res) => {
  try {
    const { customerId, taxId, notes } = req.body;
    await Task.create(customerId, taxId, notes);
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating a Task" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id, present, paid, notes } = req.body;
    await Task.updateTask(id, present, paid, notes);
    res.status(201).json({ message: "Task update successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating a Task" });
  }
};

exports.updateTaskNewDueDate = async (req, res) => {
  try {
    const { new_due_date, due_date, tax_id } = req.body;
    await Task.updateTaskNewDueDate(new_due_date, due_date, tax_id);
    res.status(201).json({ message: "Task Date successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating a Task" });
  }
};
