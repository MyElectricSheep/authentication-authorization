const { Pool, Client } = require('pg');

const pool = new Pool()

const client = new Client({

    connectionString: process.env.DATABASE_URL,
    ssl: {
    rejectUnauthorized: false
    }
})

client.connect();
module.exports = {
        query: (text, params, callback) => {
        return pool.query(text, params, callback)
        },
    }

module.exports = client;



// const { Pool } = require('pg');

// const connectionString = 'postgres://lbcmnxetaayywj:e43406e43061e8e196172f17f1e064473ab55cb2ad1b696f8057826e863c283d@ec2-54-75-199-252.eu-west-1.compute.amazonaws.com:5432/d1coaqmlghv91i'

// const pool = new Pool({
//   connectionString,

// })

// // const pool = new Pool();

// // let pool

// if (process.env.NODE_ENV === 'production') {
//     //const connectionString = 'postgres://lbcmnxetaayywj:e43406e43061e8e196172f17f1e064473ab55cb2ad1b696f8057826e863c283d@ec2-54-75-199-252.eu-west-1.compute.amazonaws.com:5432/d1coaqmlghv91i'

//     pool = new pool ({
//         connectionString
//     })
// } else {
//     pool = new pool()
// }


// module.exports =  {
//     query: (text, params, callback) => {
//         return pool.query(text, params, callback)

// },

// }





// This should be used if we want to use mongoose to store/call the data
//const mongoose = require('mongoose')

// mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Database connection successful!'))
//     .catch(err => console.error(err.message))

// const client = mongoose.connection

// client.on('error', (err) => {
//     console.error(err.message)
// })

//module.exports = client