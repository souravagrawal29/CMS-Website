const express = require('express');
const path = require('path');
const router = express.Router();

module.exports = (passport) =>{
    
    const auth = require('./auth')(passport);
    const user = require('./user')(passport);


    router.get('/',(req,res)=>{
        return res.status(200).send("In the login page");
    })

    //auth routes 
    router.post('/register',auth.register);
    router.post('/login', auth.login);
    router.get('/logout',auth.logout);

    // user routes
    router.get('/home',auth.isLoggedIn,(req,res)=>{
        return res.send(req.user);
    })
    router.post('/addpost', auth.isLoggedIn, user.addpost);
    router.get('/posts',auth.isLoggedIn, user.getposts);
    router.get('/posts/:id',auth.isLoggedIn,user.postbyid);
    router.get('/editpost/:id',auth.isLoggedIn, user.editpost);
    router.post('/editpost/:id',auth.isLoggedIn, user.editpost);
    router.delete('/deletepost/:id',auth.isLoggedIn,user.deletepost);


    return router;
}