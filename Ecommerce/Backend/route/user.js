const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {registerValidation,updateValidation, loginValidation} = require('../validation');
const jwt = require('jsonwebtoken');
const verify = require('../verifyToken')

//hash password and jwt token




//enregistrer user
router.post('/register', async (req,res) => {

    //VLIDATION AVANT ENREGISTREMENT
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send({message: error.details[0].message});

    //Eviter doublon email
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send({message : "Email existe déjà !"});

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
   

    //Créer utilisateur
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role
    });
    
    try{  
       const UserRegistration = await user.save();       
       res.send({message: "succes ! Nouvel utilisateur :" +UserRegistration.name});
              
    }catch(err){
        res.send({message: err});
    }
    
});

//login
router.post('/login', async (req, res) => {

    //validation avant login
    const {error} = loginValidation(req.body);
    if(error) return res.status(404).send({message: error.details[0].message})

    //validation email exist dans bdd
    const users = await User.findOne({email : req.body.email});
    if(!users) return res.status(400).send({message: "Email inexistant !"});

    //validation password is correct
    const validPassword = await bcrypt.compare(req.body.password, users.password);
    if(!validPassword) res.status(400).send({message : "Password invalide !"})
    
    //créer et assigner token
    const token = jwt.sign({_id: users._id}, process.env.SECRET_TOKEN)
    try{  
    res.header('auth-token',token).status(200).send({message:`Bienvenu ${users.name}`, role: users.role });

    }catch(err){
        res.send(err)
    }
});
//recuperer user
router.get('/', verify, async (req, res) => {

    try{
        const userRegistered = await User.find()
        res.status(200).json(userRegistered)
    }catch(err){
        res.send({message:err});
    }
});

//update user
router.patch('/update',verify, async (req,res)=>{

    try{
        
    const user = req.body;
    const {error, value} = updateValidation(user)
   if(error) return res.status(400).send({message : error.details[0].message});

        var myquery = {_id : user._id}
        var newValue = { $set: {
            name: user.name,
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
router.delete('/delete/:user_id',verify, async (req,res) => {
    try{
        const user_id = req.params.user_id;
        if(!user_id) return res.status(404).send({message: "Requête vide"});

        const deleteUser = await User.deleteOne({_id : user_id}) 
        res.status(200).send({message:`Utilisateur effacé avec succès `+ deleteUser.deletedCount})

    }catch(err){
        res.send({message: err})
    }
})

module.exports = router; 



