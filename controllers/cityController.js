const db = require("./../dabatase/client");

module.exports.create = async (req, res) => {
  const { name } = req.body;
  if (!name) res.status(400).send("Please provide a valid city name");

  try {
    const {
      rows: cityRows,
    } = await db.query("INSERT INTO city (name) VALUES ($1) RETURNING *", [
      name,
    ]);
    res.send(cityRows);
  } catch (e) {
    console.log({ createCityError: e.message });
  }
};

module.exports.getOne = async (req, res) => {
  const { id } = req.params;
  if (!id)
    res
      .status(400)
      .send("Please provide an id to read the information about a city");

  const cityQuery = `
  SELECT * FROM city
  WHERE id=$1
  `;

  const transporterQuery = `
  SELECT t.id AS transporter_id,
  t.name AS transporter_name,
  t.picture
  FROM city c
  JOIN transporter t ON t.city_id = c.id
  WHERE c.id=$1
  `;

  try {
    const { rows: cityRows } = await db.query(cityQuery, [id]);
    if (!cityRows.length) return res.status(404).send("No city with that ID");

    const { rows: transporterRows } = await db.query(transporterQuery, [id]);

    res.send({
      city_name: cityRows[0].name,
      city_id: cityRows[0].id,
      transporters: transporterRows,
    });
  } catch (e) {
    console.log({ getOneCityError: e.message });
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const { rows: cityRows } = await db.query("SELECT * FROM city");
    res.send(cityRows);
  } catch (e) {
    console.log({ getAllCityError: e.message });
  }
};

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name || !id)
    res
      .status(400)
      .send("Please provide necessary id and name to update a city");
  try {
    const {
      rows: cityRows,
    } = await db.query("UPDATE city SET name=$1 WHERE id=$2 RETURNING *", [
      name,
      id,
    ]);
    res.send(cityRows);
  } catch (e) {
    console.log({ updateCityError: e.message });
  }
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      rows: cityRows,
    } = await db.query("DELETE FROM city WHERE id=$1 RETURNING *", [id]);
    res.send(cityRows);
  } catch (e) {
    console.log({ deleteCityError: e.message });
  }
};



module.exports = cityController;