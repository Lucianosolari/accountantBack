// models/customer.js

const pool = require("../config/database"); // Importa la configuración de la conexión

class CustomerTax {
  static async create(customer_id, tax_id) {
    const query =
      "INSERT INTO customer_tax (customer_id, tax_id) VALUES ($1, $2)";
    const values = [customer_id, tax_id];
    await pool.query(query, values);
  }

  static async getAllCustomerTax() {
    const query =
      "SELECT customers.name as namecustomer, customers.tax_id, customers.extras, customers.responsable, taxes.name FROM customers INNER JOIN customer_tax ON customers.id = customer_tax.customer_id INNER JOIN taxes ON customer_tax.tax_id = taxes.id";
    const { rows } = await pool.query(query);
    return rows;
  }

  static async getTaxToCustomer(customerId) {
    const query = `
      SELECT customers.name as namecustomer, customers.tax_id, customers.extras, customers.responsable, taxes.name
      FROM customers
      INNER JOIN customer_tax ON customers.id = customer_tax.customer_id
      INNER JOIN taxes ON customer_tax.tax_id = taxes.id
      WHERE customers.id = $1`;

    const { rows } = await pool.query(query, [customerId]);
    return rows;
  }
}

module.exports = CustomerTax;
