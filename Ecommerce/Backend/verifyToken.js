const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
   
    const token = req.header('token');
    if(!token) return res.status(400).send({message: "Accès refusé !"});
    
    try{
    const verified = jwt.verify(token, process.env.SECRET_TOKEN)
    req.user = verified;
    next();    

    }catch(err){
        res.status(400).send({message:"invalid token"})
    }
}