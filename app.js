const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize=require('./util/database')
const Product=require('./models/product');
const User=require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
   //see video 15. Creating _ Managing a Dummy User for any doubts of this section
   User.findByPk(1)
   .then((user)=>{
      req.user=user;
      next();
   })
   .catch((err)=>{
      console.log(err);
   })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User,{contraints:true,onDelete:'CASCADE'});//on deletion of user products created by user will also be deleted
User.hasMany(Product);

sequelize
   .sync() //it syncs our models to the database by creating the appropriate tables and relations if we have them
   //force:true is used to reflect new changes after adding relations between tables. It is not used in production because we donot want to overide our
   .then((result)=>{
      return User.findByPk(1);
   
   })
   .then((user)=>{
      if(!user){
         return User.create({Name:'Max',Email:'test@test.com'});
      }
      return user;//this is returned wrapped in promise i.e.,Promise.resolve(user)
   })
   .then((user)=>{
      app.listen(3000);
   })
   .catch((err)=>{
    console.log(err)
   })


