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
      tel: {
        type: String,
        required : true,
        min: 6,
        max: 200,
        default: "1234567"
      },
      etat: {
        type: String,
        default: "offline"
       
      },
      adresse: {
        type: String,
        required : true,
        min: 6,
        max: 200,
        default: "casablanca"
      },
      ville: {
        type: String,
        required : true,
        min: 6,
        max: 200,
        default: "casablanca"
      },
      codepostal: {
        type: String,
        required : true,
        min: 3,
        max: 10,
        default: "1234"
      },
      reference: {
        type: String,
        min: 2,
        max: 200,
        default: "xxxxx"
      },
    role: {
        type: String,
        default: "utilisateur"
    },
    datecreation: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model('User', Userschema);
