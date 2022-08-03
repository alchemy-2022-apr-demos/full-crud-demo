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

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * from sodas
      WHERE id = $1
    `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Soda(rows[0]);
  }

  static async insert({ name, country, color, image }) {
    const { rows } = await pool.query(
      `
        INSERT INTO sodas (name, country, color, image)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      [name, country, color, image]
    );
    return new Soda(rows[0]);
  }

  static async updateById(id, newAttrs) {
    // get the current row from the database
    const soda = await Soda.getById(id);

    // if we can't find the row matching the id -- return null
    if (!soda) return null;

    // at this point
    // soda: {id: 1, name: 'Inca Kola', country: 'Peru', color: 'Golden', image: 'someurl'}
    // newAttrs: {color: 'Yellow'}
    // combine our old data with our new data (using spread)
    const updatedData = { ...soda, ...newAttrs };
    // call SQL update with the values

    const { rows } = await pool.query(
      `
      UPDATE sodas
      SET name = $2, color = $3, country = $4, image = $5
      WHERE id = $1
      RETURNING *;
    `,
      [
        id,
        updatedData.name,
        updatedData.color,
        updatedData.country,
        updatedData.image,
      ]
    );
    return new Soda(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE from sodas
      WHERE id = $1
      RETURNING *
    `,
      [id]
    );
    return new Soda(rows[0]);
  }
}

module.exports = { Soda };
