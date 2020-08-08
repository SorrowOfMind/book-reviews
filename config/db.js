const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`db connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1)
    }
    
}

module.exports = connectDb;