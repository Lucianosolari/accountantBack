// models/customer.js

const pool = require("../config/database"); // Importa la configuración de la conexión

class Expiration {
  static async getAll() {
    const query = "SELECT * FROM due_dates";
    const { rows } = await pool.query(query);
    return rows;
  }

  static async create(tax_id, tax_termination, due_dates) {
    const query =
      "INSERT INTO due_dates (tax_id, tax_termination, due_dates) VALUES ($1, $2, $3)";
    const values = [tax_id, tax_termination, due_dates];
    await pool.query(query, values);
  }

  static async getAllDueDatesWithTaxes() {
    const query = `
    SELECT due_dates.id, taxes.name, due_dates.tax_termination, due_dates.due_day
    FROM due_dates
    INNER JOIN taxes ON due_dates.tax_id = taxes.id
  `;
    const { rows } = await pool.query(query);
    return rows;
  }
}

module.exports = Expiration;
