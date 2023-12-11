const Sequelize=require('sequelize'); //In Sequelize, most of the methods are asynchronous, therefore, return promises

const sequelize=require('../util/database');

const Product=sequelize.define('product',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allownull:false,
    primaryKey:true
  },
  title:Sequelize.STRING,
  price:{
    type:Sequelize.DOUBLE,
    allownull:false
  },
  imageUrl:{
    type:Sequelize.STRING,
    allownull:false
  },
  description:{
    type:Sequelize.STRING,
    allownull:false
  }
})

module.exports=Product;