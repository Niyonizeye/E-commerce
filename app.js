const path = require('path');

const http = require('http');

const bodyParser = require('body-parser'); 

const errorController = require('./controllers/error')
const sequelize =require('./helpers/database');
const Product = require('./models/product');
const User = require('./models/user')
const express = require('express');

const app = express();

app.set('view engine','ejs');
app.set('views','views');
const adminRoutes = require('./routes/admin'); 
const shopRoutes = require('./routes/shop');
// database select
app.use(bodyParser.urlencoded({extended: false})); 
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err=>console.log(err))
})

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

const server=http.createServer(app);

// relationship

Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Product)

sequelize
// .sync({force:true})
.sync()
.then(result =>{
    return User.findByPk(1);
    
})
.then(user=>{
    if(!user){
        return User.create({name:'Jeanpaul',email:'niyoeanpaul1996@gmail.com'})
    }
    return user;
})
.then(user=>{
    // console.log(user);
    server.listen(3000);
})
.catch(err=>{
    console.log(err);
})

