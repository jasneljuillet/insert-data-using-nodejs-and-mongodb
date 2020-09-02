const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const db = require('./config/db').dbConnection
const PORT = process.env.PORT || 9000;
const app = express();
const show = console.log;

// connect mongoose and use promise for control the connection
mongoose
    .connect(db)
    .then(()=> show('Connect to db'))
    .catch((err)=> show(err))
app.use(express.urlencoded({
    extended: false
}))

// create schema
var Schema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    message:{
        type: String,
        require: true
    }
})

// create model
var user = mongoose.model('user', Schema)

// send home file
app.get('/', (req, res)=>{
   res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

// insert data to db
app.post('/send', (req, res)=>{
    new user({
        name: req.body.name,
        message: req.body.message
    })
    .save((err, data)=>{
        if(err){
            send(err)
        }else{
           res.send('Successfully!')
        }  
    })
})

app.listen(PORT, ()=> show('Connect to '+PORT));