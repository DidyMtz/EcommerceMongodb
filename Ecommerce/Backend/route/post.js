const express = require('express');
const router = express.Router();

//Routes get/delete/post/patch

router.get('/',(req, res) => {
    res.send("We are on post");
});

router.get('/specific',(req, res) => {
    res.send("Specific post");
});





module.exports = router;