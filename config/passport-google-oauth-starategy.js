const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto =require('crypto')
const User =require('../models/user');

passport.use(new googleStrategy({
    clientID:"941531115889-rankbcn1p07dqj2l3bgm1j4l1thucal5.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
},
function(accessToken, refreshToken, profile,done){
    //find a user
    User.findOne({email:profile.emails[0].value}).exec().then((user)=>{
        
        console.log(profile);
        if(user){
            return done(null,user)
        }
        else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            }).then(user=>{
                return done(null,user);
            }).catch(err=>{
                if(err){console.log('error in google-strategy-passport', err);return;}
            })
        }
    }).catch(err=>{
        if(err){console.log('error in google-strategy-passport', err);return;}
    })
}
))