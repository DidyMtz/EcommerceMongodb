const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        min: 4,
        max: 200
    },
    email: {
        type: String,
        required : true,
        min: 6,
        max: 200
       },
    password: {
        type: String,
        required : true,
        min: 6,
        max: 200
      },
    role: {
        type: String,
        default: "client"
    },
    datecreation: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', Userschema);
