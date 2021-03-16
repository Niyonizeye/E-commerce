const User = require('../models/user');
exports.getLogin = (req,res,next) => {
    // const isLoggedIn = req.get('Cookie').split('=')[1];
    console.log(req.session.isLoggedIn);
    res.render('auth/login',{ 
        path:'/login',
        pageTitle: "login",
        isAuthenticated: false
    })    
}
exports.postLogin = (req,res,next) => {
    User.findById("604d57cb4579f82c3aa92218")
    .then(user =>{ 
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save(err =>{
            console.log(err);
            res.redirect('/')
        })
    })
    .catch(err => console.log(err));   
    // req.session.isLoggedIn = true;
    // res.redirect('/');   
}
exports.getSignup = (req,res,next) =>{
    res.render('auth/signup',{
        path:'login',
        pageTitle:"logout",
        isAuthenticated: false
    })
};

exports.postSignup = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({email: email})
    .then(userDoc => {
        if(userDoc){
            return res.redirect('/signup');
        }
        const user = new USer({
            email:email,
            password:password,
            cart:{ items: []}
        });
        return user.save();
    })
    .then(result =>{
        res.redirect('/login');
    })
    .catch(err => {
        console.log(err);
    });
}; 

exports.postLogout = (req,res,next) =>{
  req.session.destroy(err => {
      console.log(err);
      res.redirect('/');
      
  })
};