const express = require('express');
const { default: mongoose } = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
require('dotenv/config');
const port = process.env.PORT || 4000;

const app = express();


// connect db test
mongoose.connect( process.env.DB_CONNECTION, () => {
    console.log("Connect to db");
});

//import routes
const postRoute = require('./route/posts');
const userRoute = require('./route/user');

//middleware
//app.use('/upload',express.static('upload'))
app.use(cors());
app.use(bodyparser.json());
app.use('/posts', postRoute);
app.use('/user', userRoute);


app.get('/',(req, res) => {
    res.send("We are on home");
});




//listen
app.listen(port);