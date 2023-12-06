const Sequelize=require('sequelize');

const sequelize=new Sequelize('node-complete','root','Ace@1535',{
    dialect:'mysql',
    host:'localhost'
})



module.exports=sequelize