const express = require('express');
const router = express.Router();
const Categorie = require('../models/Categorie');
const verify = require('../verifyToken');

//créer categorie

router.post("/post", async (req, res) => {

      try{const postCategorie = await Categorie.findOne({name: req.body.name});
      if(postCategorie) return res.send({message:"Categorie existant !"});
     
      const categories = new Categorie({
          name: req.body.name, 
          description: req.body.description,
          datecreation: req.body.datecreation
      });
  
      const saveCategorie = await categories.save();
  
      if(saveCategorie) return res.send({message:"Post success"});

    }catch(e){res.send(e);}
    
    
});

router.get("/", async (req, res)=>{
   
   try{
        const listCategorie = await Categorie.find();
        res.status(200).json(listCategorie)
    }catch(err){
        res.status(404).json({message : err});
    }
});

/*router.patch("/update", async (req, res) => {

    try{
        const data = req.body;
        const updatData = Categorie.
    }catch(e){
        res.send({message:e})
    }
})*/



module.exports = router; 