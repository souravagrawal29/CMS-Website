require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const db = require('./models/dbcon')


db.connect((err) =>{
    if(err){
        console.log(err);
        return;
    }
    console.log('Database Connected');
});

const app = express();

app.use(session({
    secret: 'cmswebsite',
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
app.use('/',require('./routes')(passport));

const port = process.env.PORT || 3000;

app.listen(port, err =>{
    if(err){
        console.log(err);
        res.sendStatus(404);
    }
    else 
        console.log(`Listening on ${port}`);
})