const express = require('express');
const router = express.Router();
const Produit = require('../models/Produit');
const fs = require('fs');
const csvtojson = require('csvtojson')
let cheminProduit = null;
let cheminFile = null;

//console.log(cheminProduit);


const multer = require('multer');
const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, '../src/assets/img/upload');
    },
    filename : function(req, file, cb){

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
   /* cb(null, file.fieldname + '-' + uniqueSuffix)*/
        cb(null, uniqueSuffix+ '-' +file.originalname);
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



//ENREGISTRE fiche excel DANS DOSSIER
router.post('/uploadexcel', uploadxlsx.single('excelFile') ,async (req,res) => {
    cheminFile = req.file.path;
  // console.log(req.file);
  
      try{
     /* const savedProduit = await produit.save();*/
    // console.log("file upload successfully")
      res.status(200).send({message: "Fichier upload successfully",path:cheminFile, filename: req.file.originalname});
      }catch(err){
          res.json({message: err});
      }
  });


//ENREGISTRE UNE IMAGE DANS DOSSIER
router.post('/upload', upload.single('produitImage') , (req,res) => {
 
    try{
    cheminProduit = req.file.path;
    if(!cheminProduit) return res.status(400).send({message:"Chemin produit inexistant"})
      
    res.status(200).send({message: "Image upload successfully", filename: req.file.originalname});
    }catch(err){
        res.json({message: err});
    }
});

//ENREGISTRE UN POST AVEC IMAGE
router.post('/', upload.single('produitImage') ,async (req,res) => {
  
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
//Import produits


//ENREGISTRE UN POST associe a file excel
router.post('/import', (req,res) => {
    try{   

        if(!cheminFile) return res.status(400).send({message: "Chemin file inexistant"})
        csvtojson()
        .fromFile(cheminFile)
        .then(csvData => {
            //console.log(csvData);
          /* const doublon = Produit.findOne({name : csvData.name});
           if(doublon) return res.status(400).send({message:"doublon"})
           next();
*/
            Produit.insertMany(csvData)
            .then(() => {
                res.status(200).send({message: " <br>Insertion réussie !"})
            })
            .then(() => {
                
              //supprimer la photo
              fs.unlink(cheminFile, (err )=>{
              if(err) throw err;
              res.send({message:"<br>Le fichier excel a été effacé"})
               });
                
            })
            .catch(err => {
                res.status(400).send({message: err})
            })
        })

    }catch(err){
        res.json({message: err+" Erreur"});
    }
});


router.post('/uploadmultipleimg', uploadmultiImg.array('multifiles'), (req,res) => {
    //res.redirect('/');
   // console.log(req.body);
   // console.log(req.files);
    res.status(200).send({message : "Upload multiple image reussi !"})
})


/*
//REMOVE PHOTO
router.delete('/deleteimg/:produitID', async (req,res) => {

    try{
        const pathproduit = await Produit.findById(req.params.produitID);
       
       //supprimer la photo
       fs.unlink(pathproduit.photo, (err )=>{
       if(err) throw err;
       res.send({message:"La photo a été effacé"})
});
    }catch(err){  res.json({message: err});}
})
*/



//REMOVE POST
router.delete('/delete/:produitID', async (req, res) => {
    
   
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

        }
       )
        res.status(200).json({message : "Produit supprimé avec succès !"});

    }catch(err){
        res.json({message: err});
    }
});

//UPDATE PRODUIT
router.patch('/update', async (req, res) => {
    console.log(req.body)
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
    try{
        const updatedProduit = await Produit.updateOne(myquery, newvalues) 
      
            res.send({message : " Mise à jour produit effectuée avec succès! "});
           
       
    }catch(err){
        res.json({message: err});
    }
});

router.patch('/updatephoto', upload.single('produitImage') , async (req,res) =>{
    
    try{
    
    const myquery = { _id : req.body._id};
    const changes = { $set : { photo : cheminProduit}};
   // console.log(req.body);
    const updatephoto = await Produit.updateOne(myquery, changes);
    res.status(200).send({message: "Photo mise à jour avec succès"});
    }catch(err){
        res.send({message : err})
    }
})

router.patch('/updateallergene', async (req,res) =>{
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