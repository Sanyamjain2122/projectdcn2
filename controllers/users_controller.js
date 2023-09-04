const User = require('../models/user');

module.exports.profile = function(req, res){
    console.log("profile params : ", req.params.id);
    User.findById(req.params.id).then(user=>{
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });

    }).catch(err=>{
        console.log("error aaya hai");
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: req.user
        })
    })

}


module.exports.update = function(req, res){
    
    
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body).then(user=>{
            return res.redirect('back');
        }).catch((err)=>{
        return res.status(401).send('Unauthorized');
    })
}
else
return res.redirect('back');
    
}


// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        console.log("Signup : ", req.user.id);
        return res.redirect('/users/profile/main');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
   
    if (req.isAuthenticated()){
        //req.flash('success','Already signed in');
        return res.redirect('/users/profile/main');
    }
   
     res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
    return;
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}).then((user)=>{
       if (!user){
            User.create(req.body).then(()=>{
                console.log("user created successfully")
                return res.redirect('/users/sign-in');

            }) 

               
            
        }
        else{
            conosle.log("user Already Exists")
            return res.redirect('back');
        }

    }).catch((err)=>{
        console.log(err);
    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','logged in succesffuly');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res,next){
    req.logout(function(err) {
        if (err) { return next(err); }
       req.flash('error','logout succesffuly');
       return res.redirect('/');
      });
   
}