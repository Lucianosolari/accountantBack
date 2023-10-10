const CustomerTax = require("../models/customerTax");

// Controlador para obtener todos los clientes

// Controlador para crear un nuevo cliente
exports.createCustomerTax = async (req, res) => {
  try {
    const { customer_id, tax_id } = req.body;
    await CustomerTax.create(customer_id, tax_id);
    res.status(201).json({ message: "Customer created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating a customer" });
  }
};

exports.getCustomersTax = async (req, res) => {
  try {
    const customers = await CustomerTax.getAllCustomerTax();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving customers" });
  }
};

exports.getTaxCustomer = async (req, res) => {
  try {
    const customerId = req.params.customerId; // Obtener el ID del cliente de la solicitud
    const customerTaxes = await CustomerTax.getTaxToCustomer(customerId); // Pasar el ID del cliente
    res.json(customerTaxes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving customer taxes" });
  }
};
