const { Pool } = require('pg');
const pool = new Pool();

let pool

if (process.env.NODE_ENV === 'production') {
    const connectionString = process.env.DATABASE_URL

    pool = new pool ({
        connectionString
    })
} else {
    pool = new pool()
}


module.exports =  {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)

},

}





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