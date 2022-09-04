const express = require('express');
const router = express.Router();
const Produit = require('../models/Produit');

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


//SUBMIT A POST
router.post('/', async (req,res) => {
    
    const produit = new Produit({
        name  : req.body.name,
        prix  : req.body.prix,
        photo : req.body.photo,
        description : req.body.description,
        allergene : req.body.allergene,
        favori    : req.body.favori,
        categorie : req.body.categorie,
        discount  : req.body.discount
    });

    try{
    const savedProduit = await produit.save();
    res.status(200).json(savedProduit);
    }catch(err){
        res.json({message: err});
    }
});


//REMOVE POST
router.delete('/:produitID', async (req, res) => {
    try{
        const removedProduit = await Produit.remove({_id : req.params.produitID});
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