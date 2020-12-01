// const User = require('../models/User'); // This was used for Mongoose version (Activate when using Mongoose)
const bcrypt = require('bcrypt');
const client = require('./../database/client');


  module.exports.getAll= (req, res) => {
    client
      .query("SELECT * FROM users")
      .then((data) => res.json(data.rows))
      .catch((e) => console.log(e));
  }

  module.exports.getOne= (req, res) => {
    const { id } = req.params
    client
    .query('SELECT * FROM users WHERE id=$1', [id])
    .then((data)=> {
      if (!data.rows.length) res.status(404).send('There is no user with that ID')
      res.status(200).json(data.rows)
    })
    .catch((err)=> console.error(err.message))
  }


    module.exports.createUser= async(req, res)=> {
      const { first_name, last_name, email, tel_num, address, post_code, city, state, country, password } = req.body;
  
    try {
      db.query('SELECT * FROM users WHERE email=$1' [email])
      if (user) return res.status(400).send('A user already exist with this email')
      const sqlQuery= `
      INSERT INTO users(first_name, last_name, email, tel_num, address, post_code, city, state, country, password) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
      RETURNING *
      `;

      const password= await bcrypt.hash(password, 10)
      const values = [first_name, last_name, email, tel_num, address, post_code, city, state, country, password];
  
      client
      .query(sqlQuery, values)
      .then(data => res.json(data.rows))
      res.set('x-authorization-token', token).send({ _id: user._id, email: user.email})
    } catch(e) {
      console.error(e.message)
    }
  }
  
  module.exports.updateUser= (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, address, city, country, tel_num, email } = req.body;

    if (!first_name || !last_name || !email ) return res.sendStatus(400);

    const sqlQuery = `
    UPDATE users 
    SET first_name=$1, 
    last_name=$2,
    email=$3,
    address=$4,
    city=$5,
    country=$6,
    tel_num=$7,
    WHERE id=$8
    RETURNING *
    `;

    const values = [first_name, last_name, address, city, country, tel_num, id];

    client
      .query(sqlQuery, values)
      .then((data) => res.json(data.rows))
      .catch((e) => {
        console.log(e);
        res.sendStatus(500);
      });
  }


    module.exports.deleteUser= (req, res) => {
    const { id } = req.params;

    const sqlQuery = `
    DELETE FROM users 
    WHERE id=$1
    RETURNING *
    `;

    client
      .query(sqlQuery, [id])
      .then((data) => res.json(data.rows))
      .catch((e) => {
        res.sendStatus(500);
        console.log(e);
      });
  }

  module.exports.getAll= (req, res) => {
    const { id } = req.params;
    db.query(`
    SELECT u.first_name, u.last_name, bid.price, contract.date
    FROM users u
    JOIN contract c
    ON u.id = c.user_id
    WHERE u.id = $1
    `, [id])
    .then(data => res.json(data.rows))
    .catch(err => console.error(err))
}





// ------- TEST VERSIONN ---------------//////






//--------------Mongoose version---------------------------//

// exports.list_users = (req, res) => {
//   console.log(req.userPayload)
//     User.find()
//       .then(data => res.json(data))
//       .catch(err => console.error(err.message))
//   }

// exports.find_user = (req, res) => {
//     const { id } = req.params
//     User.findById(id).populate('profiles')
//       .then(data => res.json(data))
//       .catch(err => console.error(err.message))
//   }

// exports.create_user = async (req, res) => {
//     const { first_name, last_name, email, password } = req.body
 
//     try {
//       let user = await User.findOne({ email })
//       if (user) return res.status(400).send('A user already exist with this email')
//       user = new User({ first_name, last_name, email, password: await bcrypt.hash(password, 10) })

//       await user.save()
//       res.set('x-authorization-token', token).send({ _id: user._id, email: user.email})
//     } catch(e) {
//       console.error(e.message)
//     }
//   }

// exports.update_user = (req, res) => {
//     const { old_name, new_name } = req.body
//     User.updateOne({ last_name: old_name }, { last_name: new_name })
//       .then(data => res.json(data))
//       .catch(err => console.error(err.message))
//   }

// exports.delete_user = (req, res) => {
//     const { id } = req.params
//     User.deleteOne({ _id: id })
//       .then(data => res.json(data))
//       .catch(err => console.error(err.message))
//   }

// exports.delete_users = (req, res) => {
//     const { condition, value } = req.body
//     User.deleteMany({[condition]: value})
//       .then(data => res.json(data))
//       .catch(err => console.error(err.message))
// }