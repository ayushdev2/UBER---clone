const mongoose = require('mongoose');


function connectToDb() {
    const uri = process.env.DB_CONNECT;
    if (!uri) {
        console.warn('DB_CONNECT not set — skipping database connection (sockets will still work)');
        return Promise.resolve();
    }

    return mongoose.connect(uri)
    .then(() => {
        console.log('Connected to DB');
    })
    .catch(err => console.log(err));
    
}
module.exports = connectToDb;