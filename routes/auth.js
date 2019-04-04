const db = require('../models/dbcon');
const bcrypt = require('bcrypt');

module.exports = (passport) =>{
    let exp = {};


    exp.register = (req,res) =>{
        db.query('SELECT * FROM Users WHERE email = ? OR username = ?',[req.body.email,req.body.username],(err,result)=>{
            if(err){
                console.log(err);
                return res.status(500).send('Internal Server Error');
            }
            if(result.length == 1){
                if(result[0].email === req.body.email)
                    return res.status(400).send('A user with this email already exists');
                else if(result[0].username === req.body.username)
                    return res.status(400).send('The username is already taken');
            }
            if(req.body.password !== req.body.password_confirm)
                return res.status(400).send('Passwords do not match');
            
            //Salting and Hashing
            bcrypt.genSalt(10, (err,salt)=>{
                bcrypt.hash(req.body.password,salt,(err,hash)=>{
                    db.query('INSERT INTO Users (name,username,password,email,organisation) VALUES (?,?,?,?,?)',[req.body.name,req.body.username,hash,req.body.email,req.body.organisation],(err,ins)=>{
                        if(err){
                            console.log(err);
                            return res.status(500).send('Internal Server Error');
                        }
                        return res.status(200).send('User Registered Successfully');
                    });
                });
            });
        });
    }

    exp.login = passport.authenticate('local',{
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: false
    });

    exp.isLoggedIn = (req, res, next) => {
        if(req.isAuthenticated())
            return next();
        else
            return res.redirect('/');
    };

    exp.logout = (req, res) => {
        req.logout();
        return res.redirect('/');
    };

    return exp;
}