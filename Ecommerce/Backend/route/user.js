const express = require('express');
const User = require('../models/user');
const router = express.Router();


//hash pssword and validation
//enregistrer user
router.post('/registered', async (req,res) => {

    try{
       
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });
        if(!user) return res.status(400).send({message: "succes"});
     
        const UserRegistration = await user.save();       
        res.send({message: "succes :" + UserRegistration});
              
    }catch(err){
        res.send({message: err});
    }
    
});

//recuperer user
router.get('/', async (req, res) => {

    try{
        const userRegistered = await User.find()
        res.status(200).json(userRegistered)


    }catch(err){
        res.send({message:err});
    }
})

//update user
router.patch('/update', async (req,res)=>{
    try{
        const user = req.body;
        if(!user) return res.status(400).send({message : "Votre requete est vide"});
        
        var myquery = {_id : user._id}
        var newValue = { $set: {
            email : user.email,
            password : user.password,
            role: user.role
        }}
        const updateUser = await User.updateOne(myquery,newValue)
        res.status(200).send({message: "Update effectué avec succès "+updateUser.modifiedCount})

    }catch(err){
        res.send({message:err})
    }
})
//delete user
router.delete('/delete/:user_id', async (req,res) => {
    try{
        const user_id = req.params.user_id;
        if(!user_id) return res.status(404).send({message: "Requête vide"});

        const deleteUser = await User.deleteOne({_id : user_id}) 
        res.status(200).send({message:"Utilisateur effacé avec succès "+ deleteUser.deletedCount})

    }catch(err){
        res.send({message: err})
    }
})

module.exports = router; 



