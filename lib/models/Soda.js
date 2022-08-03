const pool = require('../utils/pool');

class Soda {
  id;
  name;
  country;
  color;
  image;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.country = row.country;
    this.color = row.color;
    this.image = row.image;
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * from sodas;
    `);
    return rows.map((row) => new Soda(row));
  }
}

module.exports = { Soda };