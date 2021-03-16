const path = require('path');

const http = require('http');

const bodyParser = require('body-parser'); 

const mongoose = require('mongoose');

const errorController = require('./controllers/error')
const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://JeanPaul:dusabimana2019@cluster0.uwya5.mongodb.net/node-complete';
// const sequelize =require('./helpers/database');
// const Product = require('./models/product');

// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/order')
// const OrderItem = require('./models/order-item')
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})

app.set('view engine','ejs');
app.set('views','views');
 const adminRoutes = require('./routes/admin');  
 const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


// database select
app.use(bodyParser.urlencoded({extended: false})); 
app.use(express.static(path.join(__dirname,'public')));
app.use(
    session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
    })
);
app.use((req,res,next) => {
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id)
    .then(user =>{
        req.user = user;    
        next();
    })
    .catch(err => console.log(err));
});

app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404Page);

mongoose.connect(MONGODB_URI)
.then(result =>{
    User.findOne().then(user => {
        if(!user){
            const user = new User({
                name: 'Jean Paul',
                email:'JeanPaul@test.com',
                cart: {
                    items:[]
                }
            });
            user.save();
        }
    });    

    app.listen(3000); 
}).catch(err =>{
    console.log(err);
});  
// const server=http.createServer(app);

// relationship

// Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product,{through:CartItem});
// Product.belongsToMany(Cart,{through:CartItem});
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product,{through:OrderItem});

// sequelize
// .sync({force:true})
// .sync()
// .then(result =>{
//     return User.findByPk(1);
    
// })
// .then(user=>{
//     if(!user){
//         return User.create({
//             name:'Jeanpaul',
//             email:'niyoeanpaul1996@gmail.com',
//             cart:{
//                 items : []
//             }
//         })
//     }
//     return user;
// })
// .then(user=>{
//     // console.log(user);
//     return user.createCart();
// })
// .then(cart=>{
//     server.listen(3000);

// })
// .catch(err=>{
//     console.log(err);
// })

