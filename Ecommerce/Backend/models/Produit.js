const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({

    name : {
        type : String ,
        required : true
    },
    prix : Number ,
    photo: String ,
    description: String,
    allergene :  Array,
    favori : String,
    categorie : String,
    discount  : Number

});

module.exports = mongoose.model('Produits', PostSchema);