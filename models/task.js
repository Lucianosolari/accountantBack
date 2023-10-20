const pool = require("../config/database");
class Task {
  // ... Otras funciones del modelo ...
  static async getAllDueDatesWithTaxesForCustomersIVA(customerId, taxId) {
    const query = `
    SELECT DD.due_day
FROM due_dates DD
INNER JOIN customer_tax CT ON DD.tax_id = CT.tax_id
INNER JOIN customers C ON CT.customer_id = C.id
WHERE C.id = $1
  AND CT.tax_id = $2
  AND SUBSTRING(C.tax_id, LENGTH(C.tax_id))::integer = DD.tax_termination;
    `;

    const values = [customerId, taxId];
    const { rows } = await pool.query(query, values);
    return rows;
  }

  static async getAllDueDatesWithTaxesForCustomersNoIVA(taxId) {
    const query = `
    SELECT
    due_dates.id,
    due_dates.tax_id,
    due_dates.due_day
FROM
    due_dates

WHERE
    due_dates.tax_id = $1
ORDER BY
    due_dates.due_day;
    `;

    const values = [taxId];
    const { rows } = await pool.query(query, values);
    return rows;
  }

  static async create(customerId, taxId, notes) {
    const present = false; // Establecer present en falso por defecto
    const paid = false; // Establecer paid en falso por defecto

    // Obtener la lista de fechas de vencimiento
    let dueDates;

    if (taxId == 1) {
      dueDates = await Task.getAllDueDatesWithTaxesForCustomersIVA(
        customerId,
        taxId
      );
    } else {
      dueDates = await Task.getAllDueDatesWithTaxesForCustomersNoIVA(taxId);
    }

    if (dueDates.length > 0) {
      // Utiliza la primera fecha de vencimiento de la lista
      const dueDate = dueDates[0].due_day;

      const query = `
            INSERT INTO tasks (customer_id, tax_id, present, paid, due_date, notes)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id;
        `;

      const values = [customerId, taxId, present, paid, dueDate, notes];

      const { rows } = await pool.query(query, values);
      return rows[0];
    } else {
      throw new Error("No se encontraron fechas de vencimiento disponibles.");
    }
  }

  static async updateTask(id, present, paid, notes) {
    const query = `
        UPDATE tasks
        SET present = $2, paid = $3, notes = $4
        WHERE id = $1;
      `;
    const values = [id, present, paid, notes];

    await pool.query(query, values);
  }

  static async createPendingTask(due_date, tax_id) {
    const query = `
      INSERT INTO pending_tasks (customer_id, tax_id, present, paid, due_date, notes)
      SELECT customer_id, tax_id, present, paid, due_date, notes
      FROM tasks
      WHERE due_date = $1 AND tax_id = $2 AND (present = false OR paid = false);
    `;

    const values = [due_date, tax_id];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      // Manejar el error de manera apropiada
      console.error(error);
      throw error;
    }
  }

  static async updateTaskNewDueDate(new_due_date, due_date, tax_id) {
    let pendingTaskCreated = false;

    try {
      // Llamar a createPendingTask antes de la actualización
      await Task.createPendingTask(due_date, tax_id);
      pendingTaskCreated = true;

      const query = `
        UPDATE tasks
        SET due_date = $1, present = false, paid = false, notes = 'sin nota'
        WHERE due_date = $2 and tax_id = $3;
      `;

      const values = [new_due_date, due_date, tax_id];

      await pool.query(query, values);
    } catch (error) {
      // Si se produce un error, eliminar la tarea pendiente creada si es necesario
      if (pendingTaskCreated) {
        // Agregar código para eliminar la tarea pendiente si la actualización falla
      }

      // Manejar el error de manera apropiada
      console.error(error);
      throw error;
    }
  }

  static async getAll() {
    const query = `SELECT t.id, c.name, c.tax_id, tx.name namei, t.present, t.paid, t.notes, t.due_date
    FROM tasks t
    INNER JOIN customers c ON t.customer_id = c.id
    INNER JOIN taxes tx ON t.tax_id = tx.id
    ORDER BY t.due_date`;

    const { rows } = await pool.query(query);
    return rows;
  }

  static async getAllPendingTask() {
    const query = `SELECT t.id, c.name, c.tax_id, tx.name namei, t.present, t.paid, t.notes, t.due_date
    FROM pending_tasks t
    INNER JOIN customers c ON t.customer_id = c.id
    INNER JOIN taxes tx ON t.tax_id = tx.id
    ORDER BY c.name`;

    const { rows } = await pool.query(query);
    return rows;
  }

  static async deletePendingTasksById(id) {
    const query = `
      DELETE FROM public.pending_tasks
      WHERE id = $1;
    `;

    const values = [id];

    try {
      const result = await pool.query(query, values);
      return result.rowCount; // Devuelve el número de filas eliminadas (debería ser 1 si se encuentra y elimina un registro)
    } catch (error) {
      // Manejar el error de manera apropiada
      console.error(error);
      throw error;
    }
  }
}

module.exports = Task;
