const db = require("./../database/client");

module.exports.create = async (req, res) => {
  const { name } = req.body;
  if (!name) res.status(400).send("Please provide a valid category keyword");

  const getAllCategoryQuery = `
    SELECT * FROM category;
  `;

  const createCategoryQuery = `
    INSERT INTO category (name) 
    VALUES ($1) RETURNING *;
  `;

  try {
    const { rows: allCategoryRow } = await db.query(getAllCategoryQuery);
    if (allCategoryRow.find((category) => category.name === name))
      return res.status(400).send("This category already exists");

    const { rows: categoryRows } = await db.query(createCategoryQuery, [category]);
    res.send(categoryRows);
  } catch (e) {
    console.log({ createCategoryError: e.message });
  }
};

const categoryTransporter = async (id) => {
  const categoryTransporterQuery = `
    SELECT
    t.name AS transporter_name,
    t.id AS transporter_id,
    t.city_id
    FROM category cat
    JOIN transporter_has_category thcat ON cat.id = thcat.category_id
    JOIN transporter t ON t.id = thcat.transporter_id
    WHERE t.id=$1
    `;
  try {
    const { rows: categoryTransporterRows } = await db.query(categoryTransporterQuery, [
      id,
    ]);
    return categoryTransporterRows;
  } catch (e) {
    console.log({ categoryTransporterError: e.message });
  }
};

module.exports.getOne = async (req, res) => {
  const { id } = req.params;
  if (!id) res.status(400).send("Please provide a keyword to check this category");

  const categoryQuery = `
    SELECT * FROM category WHERE id=$1
    `;

  try {
    const { rows: categoryRows } = await db.query(categoryQuery, [id]);
    if (!categoryRows.length) return res.status(404).send("Category not found");

    res.send({
      ...categoryRows["0"],
      transporter: await categoryTransporter(id),
    });
  } catch (e) {
    console.log({ getOneCategoryError: e.message });
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const { rows: categoryRows } = await db.query("SELECT * FROM category");

    const allCategoryPromises = categoryRows.map(async (category) => {
      const { id } = category;
      return {
        ...category,
        transporters: await categoryTransporter(id)
      };
    });

    Promise.all(allCategoryPromises).then((data) => {
      res.send(data);
    });
  } catch (e) {
    console.log({ getAllCategoryError: e.message });
  }
};

module.exports.update = async (req, res) => {
  // To do - Not required in the exercise
  const { id } = req.params;
  res.send("This endpoint will update a specific category", id);
};

module.exports.delete = async (req, res) => {
  // To do - Not required in the exercise
  const { id } = req.params;
  res.send("This endpoint will delete a specific category", id);
};


module.exports = CategoryController;