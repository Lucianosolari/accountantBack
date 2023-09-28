const Tax = require("../models/tax");

// Controlador para obtener todos los clientes
exports.getTaxes = async (req, res) => {
  try {
    const taxes = await Tax.getAll();
    res.json(taxes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving taxes" });
  }
};

// Controlador para crear un nuevo cliente
exports.createTaxes = async (req, res) => {
  try {
    const { name } = req.body;
    await Tax.create(name);
    res.status(201).json({ message: "Tax created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating a tax" });
  }
};
