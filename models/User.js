const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: { 
        type: String, 
        required
    },
    displayName: { 
        type: String, 
        required
    },
    firstName: { 
        type: String, 
        required
    },
    lastName: { 
        type: String, 
        required
    },
    image: { 
        type: String
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;