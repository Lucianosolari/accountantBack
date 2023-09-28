// models/customer.js

const pool = require("../config/database"); // Importa la configuración de la conexión

class Customer {
  static async getAll() {
    const query = "SELECT * FROM customers";
    const { rows } = await pool.query(query);
    return rows;
  }

  static async create(name, tax_id) {
    const query = "INSERT INTO customers (name, tax_id) VALUES ($1, $2)";
    const values = [name, tax_id];
    await pool.query(query, values);
  }
}

module.exports = Customer;
