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
/*
mongoose.Collection("ecommerce", (res, err) => {
    if(err){ res.send({message : 'Probleme collection'})}
    else{ res.send({message : 'collection ok'})}
})
*/
module.exports = mongoose.model('Produits', PostSchema);