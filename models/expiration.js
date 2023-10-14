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
    SELECT due_dates.id, due_dates.tax_id, taxes.name, due_dates.tax_termination, due_dates.due_day
    FROM due_dates
    INNER JOIN taxes ON due_dates.tax_id = taxes.id
    ORDER BY due_day
  `;
    const { rows } = await pool.query(query);
    return rows;
  }

  static async getAllDueDatesWithTaxesForCustomers() {
    const query = `
    SELECT
    main.id,
    main.tax_name,
    main.due_day,
    main.customer_id,
    main.customer_name,
    main.cuit
FROM
    (
        SELECT
            due_dates.id,
            taxes.name AS tax_name,
            due_dates.due_day,
            customers.id AS customer_id,
            customers.name AS customer_name,
            customers.tax_id AS cuit,
            CASE
                WHEN (
                    taxes.id = 1 AND
                    CAST(due_dates.tax_termination AS integer) = RIGHT(customers.tax_id::text, 1)::integer
                ) THEN
                    due_dates.tax_termination
                ELSE
                    NULL
            END AS calculated_termination
        FROM
            due_dates
        INNER JOIN
            taxes ON due_dates.tax_id = taxes.id
        INNER JOIN
            customer_tax ON taxes.id = customer_tax.tax_id
        INNER JOIN
            customers ON customer_tax.customer_id = customers.id
    ) AS main
WHERE
    main.calculated_termination IS NOT NULL
    OR main.tax_name != 'IVA'
    ORDER BY main.due_day;

  `;
    const { rows } = await pool.query(query);
    return rows;
  }

  static async updateExpiration(tax_id, tax_termination, due_dates) {
    const query =
      "UPDATE due_dates SET due_day = $3 WHERE tax_id = $1 and tax_termination = $2";
    const values = [tax_id, tax_termination, due_dates];
    await pool.query(query, values);
  }
}
module.exports = Expiration;
