const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
    email: {
        type: String,
        required : true
       },
    password: String,
    role: {
        type: String,
        default: "client"
    },
    datelogin: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', Userschema);
