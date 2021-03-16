const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('../models/user');

const transporter =  nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));

exports.getLogin = (req,res,next) => {
    let message = req.flash('error');
    if (message.length > 0){
        message = message[0];
    }else{
        message = null;
    }
    res.render('auth/login',{ 
        path:'/login',
        pageTitle: "login",
        errorMessage: message
    })    
}
exports.postLogin = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email})
    .then(user =>{ 
        if(!user){
            req.flash('error','Invalid Email or Password!!!');
            return res.redirect('/login');
        }
        bcrypt.compare(password, user.password)
        .then(doMatch => {
            if(doMatch){
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(err =>{
                    console.log(err);
                    return res.redirect('/')
                })
            }
            req.flash('error','Invalid Email or Password!!!');
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/login');
        })
    })
    .catch(err => console.log(err));    
}
exports.getSignup = (req,res,next) =>{
    let message = req.flash('error');
    if (message.length > 0){
        message = message[0];
    }else{
        message = null;
    }
    res.render('auth/signup',{
        path:'signup',
        pageTitle:"Signup",
        errorMessage: message
    })
};

exports.postSignup = (req,res,next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password
    User.findOne({email: email})
    .then(userDoc => {
        if(userDoc){
            req.flash('error','Email already exist');
            return res.redirect('/signup');
        }
        return bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword,
                cart:{ items: []}
            });
            return user.save();
        })
        .then(result =>{
            res.redirect('/login');
          return transporter.sendMail({
                to: email,
                from: 'niyoeanpaul@gmail.com',
                subject: 'Signup succeeded!',
                html: '<h1> you successfully Signed Up !!!</h1>'
            });
            
        }).catch(err => {
            console.log(err);
        })     
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