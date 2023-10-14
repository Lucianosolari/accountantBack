// models/customer.js

const pool = require("../config/database"); // Importa la configuración de la conexión

class Customer {
  static async getAll() {
    const query = "SELECT * FROM customers ORDER BY name";
    const { rows } = await pool.query(query);
    return rows;
  }

  static async create(
    name,
    tax_id,
    password_afip,
    password_municipal,
    extras,
    responsable
  ) {
    const query =
      "INSERT INTO customers (name, tax_id, password_afip, password_municipal, extras, responsable) VALUES ($1, $2, $3, $4, $5, $6)";
    const values = [
      name,
      tax_id,
      password_afip,
      password_municipal,
      extras,
      responsable,
    ];
    await pool.query(query, values);
  }
}

module.exports = Customer;
