const express = require('express');
const path = require('path');
const router = express.Router();

module.exports = (passport) =>{
    
    const auth = require('./auth')(passport);


    router.get('/',(req,res)=>{
        return res.status(200).send("In the login page");
    })

    //auth routes 
    router.post('/register',auth.register);
    router.post('/login', auth.login);
    router.get('/logout',auth.logout);


    router.get('/home',(req,res)=>{
        return res.send(req.user);
    })


    return router;
}