const express = require('express');
const router = express.Router();
const Produit = require('../models/Produit');
let cheminProduit = null;

//console.log(cheminProduit);


const multer = require('multer');
const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, 'upload');
    },
    filename : function(req, file, cb){

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
   /* cb(null, file.fieldname + '-' + uniqueSuffix)*/
        cb(null, uniqueSuffix+ '-' +file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype != 'image/jpg' && file.mimetype != 'image/jpeg' && file.mimetype != 'image/png'){
        cb(null, false);
    }else{
        cb(null, true);
    }


}

//const upload  = multer({dest:'upload/'});
const upload  = multer({
    storage : storage,
    limits : { fileSize: 1024 * 1024 * 5},
    fileFilter:fileFilter
});

//Routes get/delete/post/patch

//get all the produits
router.get('/', async (req, res) => {
    try{
        const getProduits = await Produit.find();
        res.status(200).json(getProduits);

    }catch(err){
        res.status(404).json({message : err});
    }
});

//get a specifique post
router.get('/:produitID', async (req,res) => {

    try{
        const produit = await Produit.findById(req.params.produitID);
        res.status(200).json(produit);
    }catch(err){
        res.status(404).json({message : err});
    }
})


//SUBMIT AN IMAGE
router.post('/upload', upload.single('produitImage') ,async (req,res) => {
  cheminProduit = req.file.path;
 console.log(req.file);

    try{
   /* const savedProduit = await produit.save();*/
   console.log("Image upload successfully")
    res.status(200).send({message: "Image upload successfully"});
    }catch(err){
        res.json({message: err});
    }
});


router.post('/', upload.single('produitImage') ,async (req,res) => {
  
       const produit = new Produit({
           name  : req.body.name,
           prix  : req.body.prix,
           photo : cheminProduit,
           description : req.body.description,
           allergene : req.body.allergene,
           favori    : req.body.favori,
           categorie : req.body.categorie,
           discount  : req.body.discount
       });
   
       try{
       const savedProduit = await produit.save();
     // console.log(produit)
       res.status(200).json(produit);
       }catch(err){
           res.json({message: err});
       }
   });
   
//REMOVE POST
router.delete('/:produitID', async (req, res) => {
    try{
        //const removedProduit = await Produit.remove({_id : req.params.produitID});
        const removedProduit = await Produit.deleteOne({_id : req.params.produitID});
        res.status(200).json(removedProduit);

    }catch(err){
        res.json({message: err});
    }
});

//UPDATE PRODUIT
router.patch('/:produitID', async (req, res) => {
    try{
        const updatedProduit = await Produit.updateOne({_id : req.params.produitID}, { $set : { name : req.body.name}});
        res.status(200).json(updatedProduit);

    }catch(err){
        res.json({message: err});
    }
});



module.exports = router;