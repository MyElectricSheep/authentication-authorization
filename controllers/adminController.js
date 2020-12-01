
const bcrypt = require('bcrypt')
const client = require('./../database/client')

// const Admin = require('../models/Admin') // Used in Mongoose version

// const { router } = require('../app')
/* const { db } = require('../models/Admin') */  // Mongoose version


// Routes that were used to call data in mongoose 
// adminRouter.get('/', authorizeAdmin, adminController.list_admins)
// adminRouter.get('/:id', authorizeAdmin, adminController.find_admin)
// adminRouter.post('/', authorizeAdmin, adminController.create_admin)
// adminRouter.put('/', authorizeAdmin, adminController.update_admin)
// adminRouter.delete('/all', authorizeAdmin, adminController.delete_admins)
// adminRouter.delete('/:id', authorizeAdmin, adminController.delete_admin)

module.exports.getAll= (req,res) => {
  client
  .query('SELECT NOW()')
  .then(data => res.send(data.rows[0]))
  .catch(err => res.sendStatus(500))
}



module.exports.getAll = (req,res) => {
  client
  .query('SELECT * FROM admin')
  .then(data => res.json(data.rows))
  .catch(err => console.error(err.message))
}



module.exports.getOne=(req, res) =>{
  const { id } = req.params;
  client
  db.query('SELECT * FROM admin WHERE id=$1', [id])
  .then((data)=> {
    if (!data.rows.length) res.status(404).send('There is no user with that ID')
    res.status(200).json(data.rows)
  })
  .catch((err)=> console.error(err.message))
}



module.exports.createAdmin= async (req, res)=> {
  const { first_name, last_name, email, password } = req.body;

  try {
    db.query('SELECT * FROM admins WHERE email=$1' [email])
    if (admin) return res.status(400).send('One admin already exist with this email')
    const text=
    "INSERT INTO ADMINS(first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *";
    password: await bcrypt.hash(password, 10)
    const values = [first_name, last_name, email, password];

    client
    .query(text, values)
    .then(data => res.json(data.rows))
    res.set('x-authorization-token', token).send({ _id: admin._id, email: admin.email})
  } catch(e
    ) {
    console.error(e.message)
  }
} 

module.exports.updateAdmin=(req, res) => {
  const { id } = req.params
  const { first_name, last_name, email } = req.body
  const text =
  "UPDATE admins SET first_name=$1, last_name=$2, email=$3 WHERE id=$4 RETURNING *";
  const values = [first_name, last_name, email];
  client
    .query(text, values)
    .then(data => res.json(data.rows))
    .catch(err => console.error(err))
}



module.exports.deleteAdmin=(req, res) => {
  const { id } = req.params;
  client
  .query("DELETE FROM admin WHERE id=$1 RETURNING *", [id])
  .then((data)=> res.json(data.rows))
  .catch((err)=> console.error(err));
}





// Mongoose version

// exports.list_admins = (req, res) => {
//   console.log(req.userPayload)
//     Admin.find()
//       .then(data => res.json(data))
//       .catch(err => console.error(err.message))
//   }

// exports.find_admin = (req, res) => {
//     const { id } = req.params
//     Admin.findById(id).populate('profiles')
//       .then(data => res.json(data))
//       .catch(err => console.error(err.message))
//   }

// exports.create_admin = async (req, res) => {
//     const { first_name, last_name, email, password } = req.body
 
//     try {
//       let admin = await admin.findOne({ email })
//       if (admin) return res.status(400).send('One admin already exist with this email')
//       admin = new Admin({ first_name, last_name, email, password: await bcrypt.hash(password, 10) })

//       await admin.save()
//       res.set('x-authorization-token', token).send({ _id: admin._id, email: admin.email})
//     } catch(e) {
//       console.error(e.message)
//     }
//   }


// exports.update_admin = (req, res) => {
//     const { old_name, new_name } = req.body
//     Admin.updateOne({ last_name: old_name }, { last_name: new_name })
//       .then(data => res.json(data))
//       .catch(err => console.error(err.message))
//   }

// exports.delete_admin = (req, res) => {
//     const { id } = req.params
//     Admin.deleteOne({ _id: id })
//       .then(data => res.json(data))
//       .catch(err => console.error(err.message))
//   }

// exports.delete_admins = (req, res) => {
//     const { condition, value } = req.body
//     Admin.deleteMany({[condition]: value})
//       .then(data => res.json(data))
//       .catch(err => console.error(err.message))
// }