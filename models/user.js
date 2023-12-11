const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const User=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    Name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    Email:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports=User;