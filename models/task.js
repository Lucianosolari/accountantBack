const pool = require("../config/database");
class Task {
  // ... Otras funciones del modelo ...

  static async create(customerId, taxId, dueDate, notes) {
    const present = false; // Establecer present en falso por defecto
    const paid = false; // Establecer paid en falso por defecto

    const query = `
          INSERT INTO tasks (customer_id, tax_id, present, paid, due_date, notes)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING id;
        `;
    const values = [customerId, taxId, present, paid, dueDate, notes];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async updateTask(taskId, present, paid, dueDate, notes) {
    const query = `
        UPDATE tasks
        SET present = $2, paid = $3, due_date = $4, notes = $5
        WHERE id = $1;
      `;
    const values = [taskId, present, paid, dueDate, notes];

    await pool.query(query, values);
  }

  static async getAll() {
    const query = "SELECT * FROM tasks";
    const { rows } = await pool.query(query);
    return rows;
  }
}

module.exports = Task;
