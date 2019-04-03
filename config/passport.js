const db = require('../models/dbcon');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = (passport) => {

    passport.serializeUser((User,done) => {
    	return done(null,User.uid);
    });
  
    passport.deserializeUser((uid,done) => {
        db.query('SELECT uid,name,username,email,access,organisation FROM Users where uid = ?',[uid],(err,rows) =>{
            return done(err,rows[0]);
        });
    });

    passport.use('local',new Strategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback:true
        },
        (req, username, password, done) =>{
            db.query('SELECT * FROM `Users` WHERE `username` = ?', [username], (err, result) =>{
                if (err) {
                    console.log('error:', err.stack);
                    return done(err);
                }
                if (result.length == 0) {
                    console.log('Invalid Details');
                    return done(null,false);
                }
                bcrypt.compare(password,result[0].password,(err,isMatch)=>{
                    if(isMatch){
                        return done(null,result[0]);
                    }
                    else{
                        console.log('Wrong Password');
                        return done(null,false);
                    }
                });
            });
        })
    );
}