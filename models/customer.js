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
  static async update(
    id,
    { name, tax_id, password_afip, password_municipal, extras, responsable }
  ) {
    const query = `
      UPDATE customers 
      SET 
        name = $1,
        tax_id = $2,
        password_afip = $3,
        password_municipal = $4,
        extras = $5,
        responsable = $6
      WHERE id = $7
    `;
    const values = [
      name,
      tax_id,
      password_afip,
      password_municipal,
      extras,
      responsable,
      id,
    ];

    try {
      const { rowCount } = await pool.query(query, values);

      if (rowCount === 0) {
        throw new Error(`Cliente con ID ${id} no encontrado`);
      }

      return { success: true, message: "Cliente actualizado exitosamente" };
    } catch (error) {
      throw new Error(`Error al actualizar cliente: ${error.message}`);
    }
  }
}

module.exports = Customer;
