const express = require('express');
const { default: mongoose } = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const app = express();


//import routes
const postRoute = require('./route/posts');

//middleware
app.use(cors());
app.use(bodyparser.json());
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