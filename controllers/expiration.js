// controllers/customer.js

const Expiration = require("../models/expiration");

// Controlador para obtener todos los clientes
exports.getExpiration = async (req, res) => {
  try {
    const expiration = await Expiration.getAll();
    res.json(expiration);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving expiration" });
  }
};

// Controlador para crear un nuevo cliente
exports.createExpiration = async (req, res) => {
  try {
    const { tax_id, tax_termination, due_day } = req.body;
    await Expiration.create(tax_id, tax_termination, due_day);
    res.status(201).json({ message: "Expiration created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating a Expiration" });
  }
};

exports.getExpirationWithTax = async (req, res) => {
  try {
    const expiration = await Expiration.getAllDueDatesWithTaxes();
    res.json(expiration);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving expiration" });
  }
};
