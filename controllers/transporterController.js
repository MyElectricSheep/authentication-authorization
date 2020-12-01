// const Transporter = require('../models/Transporter')  //========ACtivate this when using Mongoose========//

const bcrypt = require('bcrypt')
const client = require('./../database/client');



module.exports.createTransporter = async (req, res) => {
  const { name, first_name, last_name, email, city_id, picture } = req.body;

  if (!name || !first_name || !email || !city_id || !last_name )
    return res
      .status(400)
      .send("Please provide a full company name and location");

  try {
    const cityQuery = `
    SELECT * FROM city
    WHERE id=$1
    `;

    const { rows: cityRows } = await db.query(cityQuery, [city_id]);
    if (!cityRows.length)
      return res
        .status(404)
        .send("The company need to be associated with a valid city");

    const transporterQuery = `
    INSERT INTO  (name, first_name, last_name, email, tel_num, city_id)
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *
    `;

    const { rows: transporterRows } = await db.query(transporterQuery, [
      name,
      first_name,
      last_name,
      email,
      tel_num,
      city_id,
    ]);
    res.send(transporterRows);
  } catch (e) {
    console.log({ createCityError: e.message });
  }
};

  const getTransporter = async (id) => {
    const transporterQuery = `
    SELECT t.id AS transporter_id, t.name AS transporter_name, t.picture, ct.name AS city_name, ct.id AS city_id
    FROM transporter t 
    JOIN city ct ON ct.id = t.city_id
    WHERE r.id=$1
    `;
  try {
    const { rows: transporterRows } = await db.query(transporterQuery, [id]);
    console.log(transporterRows)
    if (!transporterRows.length) return "Transport Company not found";
    return transporterRows;
  } catch (e) {
    console.log({ getTransporterError: e.message });
  }
};

const getReview = async (id) => {
  const reviewQuery = `
    SELECT cm.id, cm.comment
    FROM comment cm
    JOIN transporter t ON t.id = cm.transporter_id
    WHERE t.id=$1
    `;
  try {
    const { rows: reviewRows } = await db.query(reviewsQuery, [id]);
    return reviewRows;
  } catch (e) {
    console.log({ getReviewsError: e.message });
  }
};

const readCategory = async (id) => {
  const categoryQuery = `
    SELECT cat.id, cat.name
    FROM category cat
    JOIN transporter_has_category thcat ON cat.id = thcat.category_id
    JOIN transporter t ON thcat.transporter_id = t.id 
    WHERE r.id=$1
    `;
  try {
    const { rows: categoryRows } = await db.query(categoryQuery, [id]);
    return categoryRows;
  } catch (e) {
    console.log({ getReviewError: e.message });
  }
};

module.exports.getOne = async (req, res) => {
  const { id } = req.params;

  const transporterData = await gettransporter(id);

  res.send({
    ...transporterData["0"],
    reviews: await getReviews(id),
    category: await getCategory(id),
  });
};

module.exports.getAll = async (req, res) => {
  const { limit = 25, offset = 0, reviews = true, category = true } = req.body;

  try {
    const { rows: transporterRows } = await db.query("SELECT * FROM transporter");

    const allTransportersPromises = transporterRows
      .slice(offset, limit)
      .map(async (transporter) => {
        const { id } = transporter;
        const transporterData = await gettransporter(id);
        const reviewsData = reviewss && (await getReviews(id));
        const categoryData = category && (await getCategory(id));
        return {
          ...transporterData["0"],
          reviews: reviewsData ? reviewsData : "Not requested",
          category: catheoryData ? categoryData : "Not requested",
        };
      });

    Promise.all(allTransportersPromises).then((data) => {
      // Timing: ~6.789ms to retrieve all restaurants data
      res.send(data);
    });
  } catch (e) {
    console.log({ getAllTransportersError: e.message });
  }
};

module.exports.updateTransporter = async (req, res) => {
  // To do - Not required in the exercise
  const { id } = req.params;
  res.send("This endpoint will update a specific transporter", id);
};

module.exports.deleteTransporter = async (req, res) => {
  // To do - Not required in the exercise
  const { id } = req.params;
  res.send("This endpoint will delete a specific transporter", id);
};


// ============= TEST VERSION =======================//








// ================ Using Mongoose, we can query the database this way =============================//

// exports.list_transporters = (req, res) => {
//   console.log(req.transporterPayload)
//     Transporter.find()
//       .then(data => res.json(data))
//       .catch(err => console.error(err.message))
//   }

// exports.find_transporter = (req, res) => {
//     const { id } = req.params
//     Transporter.findById(id).populate('transporters')
//       .then(data => res.json(data))
//       .catch(err => console.error(err.message))
//   }

// exports.create_transporter = async (req, res) => {
//     const { first_name, last_name, company_name, company_type, email, password } = req.body
 
//     try {
//       let transporter = await Transporter.findOne({ email })
//       if (transporter) return res.status(400).send('A company already exist with this email')
//       transporter = new Transporter({ first_name, last_name, company_name, company_type, email, password: await bcrypt.hash(password, 10) })

//       await transporter.save()
//       res.set('x-authorization-token', token).send({ _id: company._id, email: company.email})
//     } catch(e) {
//       console.error(e.message)
//     }
//   }

// exports.update_transporter = (req, res) => {
//     const { old_name, new_name } = req.body
//     Transporter.updateOne({ last_name: old_name }, { last_name: new_name })
//       .then(data => res.json(data))
//       .catch(err => console.error(err.message))
//   }

// exports.delete_transporter = (req, res) => {
//     const { id } = req.params
//     Transporter.deleteOne({ _id: id })
//       .then(data => res.json(data))
//       .catch(err => console.error(err.message))
//   }

// exports.delete_transporters = (req, res) => {
//     const { condition, value } = req.body
//     Tranporter.deleteMany({[condition]: value})
//       .then(data => res.json(data))
//       .catch(err => console.error(err.message))
// }