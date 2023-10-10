// controllers/customer.js

const Customer = require("../models/customer");

// Controlador para obtener todos los clientes
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.getAll();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving customers" });
  }
};

// Controlador para crear un nuevo cliente
exports.createCustomer = async (req, res) => {
  try {
    const {
      name,
      tax_id,
      password_afip,
      password_municipal,
      extras,
      responsable,
    } = req.body;
    await Customer.create(
      name,
      tax_id,
      password_afip,
      password_municipal,
      extras,
      responsable
    );
    res.status(201).json({ message: "Customer created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating a customer" });
  }
};
