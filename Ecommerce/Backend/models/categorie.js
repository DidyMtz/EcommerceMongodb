const mongodb = require('mongoose');
const schemaCategorie = mongodb.Schema({
    name : {
        type : String ,
        required : true
    },
    description:String,
    datecreation:Date
});

module.exports = mongodb.model("Categorie", schemaCategorie);