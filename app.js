const path = require('path');

const http = require('http');

const bodyParser = require('body-parser'); 

const errorController = require('./controllers/error')
const express = require('express');

const app = express();

app.set('view engine','ejs');
app.set('views','views');
const adminRoutes = require('./routes/admin'); 
const shopRoutes = require('./routes/shop');
const sequelize =require('./helpers/database');
// database select
app.use(bodyParser.urlencoded({extended: false})); 
app.use(express.static(path.join(__dirname,'public')));
app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

const server=http.createServer(app);

sequelize
.sync()
.then(result =>{
    // console.log(result);
    server.listen(3000);
})
.catch(err=>{
    console.log(err);
})

