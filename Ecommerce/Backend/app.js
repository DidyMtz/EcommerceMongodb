const express = require('express');
const { default: mongoose } = require('mongoose');
require('dotenv/config');

const app = express();


//import routes
const postRoute = require('./route/post');

//middleware
app.use('/posts', postRoute);


app.get('/',(req, res) => {
    res.send("We are on home");
});


//test connect db
mongoose.connect( process.env.DB_CONNECTION, () => {
    console.log("Connect to db");
})

//listen
app.listen(4000);