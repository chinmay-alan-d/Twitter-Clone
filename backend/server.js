const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
mongoose.connect('mongodb://127.0.0.1:27017/twitter');
const db = mongoose.connection;
const router = require('./Routes/Routes.js');
app.use(express.json());
app.use(
    cors({
        origin : "*"
    })
)

db.on('error',(error) =>{
    console.log(error);
} );

db.once('open',()=>{
    console.log('connected to database');
});

app.post('/signup', router);
app.post('/login', router);
app.post('/tweet',router);
app.put('/tweet',router);
app.get('/tweet/:name',router)
app.post('/search',router)
app.post('/follow',router);
app.post('/profile',router)
app.post('/loggeduser',router);

app.listen(4000, () =>{
    console.log('server running on port 4000');
} );