const bcrypt = require('bcrypt');
const client = require('./../database/client');


  module.exports.getAll= (req, res) => {
    client
      .query("SELECT * FROM review")
      .then((data) => res.json(data.rows))
      .catch((e) => console.log(e));
  },

  module.exports.getOne= (req, res) => {
    const { id } = req.params
    client
    .query('SELECT * FROM review WHERE id=$1', [id])
    .then((data)=> {
      if (!data.rows.length) res.status(404).send('There is no existing review for this ID')
      res.status(200).json(data.rows)
    })
    .catch((err)=> console.error(err.message))
  },


    module.exports.createReview= async(req, res)=> {
      const { name, auction_id, description, rating } = req.body;
  
    try {
      db.query('SELECT * FROM auction WHERE auction_id=$1' [auction_id])
      if (auction) return res.status(400).send('A review already exist')
      const sqlQuery= `
      INSERT INTO review(name, auction_id, description, rating) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
      `;
      const values = [name, auction_id, description, rating]
  
      client
      .query(sqlQuery, values)
      .then(data => res.json(data.rows))
    } catch(e) {
      console.error(e.message)
    }
  }


    module.exports.deleteReview= (req, res) => {
    const { id } = req.params;

    const sqlQuery = `
    DELETE FROM review 
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


//module.exports = reviewController;
