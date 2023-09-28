const pool = require("../config/database"); // Importa la configuración de la conexión

class Tax {
  static async getAll() {
    const query = "SELECT * FROM taxes";
    const { rows } = await pool.query(query);
    return rows;
  }

  static async create(name) {
    const query = "INSERT INTO taxes (name) VALUES ($1)";
    const values = [name];
    await pool.query(query, values);
  }
}

module.exports = Tax;
