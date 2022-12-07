const express = require('express');
const router = express.Router();
const Produit = require('../models/Produit');
const verify = require('../verifyToken');

const fs = require('fs');
const csvtojson = require('csvtojson')
let cheminProduit = null;
let cheminFile = null;



const multer = require('multer');
const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, '../src/assets/img/upload');
    },
    filename : function(req, file, cb){

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
   /* cb(null, file.fieldname + '-' + uniqueSuffix)
        cb(null, uniqueSuffix+ '-' +file.originalname)
        */
        cb(null, file.originalname);
    }
});
const storagemulti = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, '../src/assets/img/upload');
    },
    filename : function(req,file,cb){
        cb(null, file.originalname);
    }

})
const storageExcel = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, '../src/assets/files');
    },
    filename : function(req, file, cb){
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype != 'image/jpg' && file.mimetype != 'image/jpeg' && file.mimetype != 'image/png'){
        cb(null, false);
    }else{
        cb(null, true);
    }
}

//const uploadxlsx  = multer({dest:'upload/'});
const uploadmultiImg = multer({
    storage : storagemulti
});
const uploadxlsx  = multer({
    storage : storageExcel
});
const upload  = multer({
    storage : storage,
    limits : { fileSize: 1024 * 1024 * 5},
    fileFilter:fileFilter
});

/* Routes get/delete/post/patch */

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


//ENREGISTRE fiche excel DANS DOSSIER
router.post('/uploadexcel',verify, uploadxlsx.single('excelFile') ,async (req,res) => {
    cheminFile = req.file.path;
 
      try{
      res.status(200).send({message: "Fichier upload successfully",path:cheminFile, filename: req.file.originalname});
      }catch(err){
          res.json({message: err});
      }
  });


//ENREGISTRE UNE IMAGE DANS DOSSIER change ici
router.post('/upload', upload.single('produitImage') , (req,res) => {
 
    try{
    cheminProduit = req.file.path;
    console.log(cheminProduit);
    if(!cheminProduit) return res.status(400).send({message:"Chemin produit inexistant"});
      
    res.status(200).send({message: "Image upload successfully", filename: req.file.originalname});
    console.log("Image upload successfully"+req.file.filename);
    }catch(err){
        res.json({message: err});
    }
});

//ENREGISTRE UN POST AVEC IMAGE
router.post('/',verify, upload.single('produitImage') ,async (req,res) => {
  
    if(!cheminProduit) return res.status(400).send({message:"Path produit inexistant"})
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
      // res.status(200).json(savedProduit);
       res.status(200).json({message: " Enregistrement effectué avec succès !"});

       }catch(err){
           res.json({message: err+" Erreur"});
       }
   });
 //Import produits /ENREGISTRE UN POST associe a file excel
router.post('/import',verify, (req,res) => {
    try{   

        if(!cheminFile) return res.status(400).send({message: "Chemin file inexistant"})
        csvtojson()
        .fromFile(cheminFile)
        .then(csvData => {
          
            Produit.insertMany(csvData)
            .then(() => {
                res.status(200).send({message: " <br>Insertion réussie !"})
            })
           
            .catch(err => {
                res.status(400).send({message: err})
            })
        })

    }catch(err){
        res.json({message: err+" Erreur"});
    }
});

//upload multiples images
router.post('/uploadmultipleimg',verify, uploadmultiImg.array('multifiles'), (req,res) => {
   
    res.status(200).send({message : "Upload multiple image reussi !"})
})

//REMOVE PHOTO
router.delete('/deleteimg/:produitID',verify, async (req,res) => {

    try{
        const pathproduit = await Produit.findById(req.params.produitID);
       
       //supprimer la photo
       fs.unlink(pathproduit.photo, (err )=>{
       if(err) throw err;
       res.send({message:"La photo a été effacé"})
});
    }catch(err){  res.json({message: err});}
})


//REMOVE POST
router.delete('/delete/:produitID',verify, async (req, res) => {
    
   
    try{       
       const removedProduit = await Produit.deleteOne({_id : req.params.produitID});

       removedProduit.then(
        () => {
        const pathproduit =  Produit.findById(req.params.produitID);
       
       //supprimer la photo
       fs.unlink(pathproduit.photo, (err )=>{
       if(err) throw err;
       res.send({message:"La photo a été effacé"})
         });

        })
        res.status(200).json({message : "Produit supprimé avec succès !"});

    }catch(err){
        res.json({message: err});
    }
});

//UPDATE PRODUIT change ici
router.patch('/update', async (req, res) => {
   
    var myquery = { _id: req.body._id};
    var newvalues = { $set: {
        name  : req.body.name,
        prix  : req.body.prix,
        photo : req.body.photo,
        description : req.body.description,
        allergene : req.body.allergene,
        favori    : req.body.favori,
        categorie : req.body.categorie,
        discount  : req.body.discount } };
        console.log(newvalues);
    try{
        const updatedProduit = await Produit.updateOne(myquery, newvalues) 
      
            res.send({message : " Mise à jour produit effectuée avec succès! "});
           
       
    }catch(err){
        res.json({message: err});
    }
});

//update photo
router.patch('/updatephoto',verify, upload.single('produitImage') , async (req,res) =>{
    
    try{
    if(cheminProduit === null) return res.status(404).send({message: "Désolé, photo non acceptée !"})
    const myquery = { _id : req.body._id};
    const changes = { $set : { photo : cheminProduit}};
   // console.log(req.body);
    const updatephoto = await Produit.updateOne(myquery, changes);
    res.status(200).send({message: "Photo mise à jour avec succès"});
    cheminProduit = null;

    }catch(err){
        res.send({message : err})
    }
})

//update allergene
router.patch('/updateallergene',verify, async (req,res) =>{
    try{

        const myquery = {_id : req.body._id}
        const changes = { $set:{ allergene : req.body.allergene}}
    
       // console.log(req.body);
        const updateAllergene = await Produit.updateOne(myquery, changes);
        res.status(200).send({message: "Mise à  jour allergène effectuée avec succès!"});

    }catch(err){
        res.status(404).send({message: err});
    }
   

})

module.exports = router;