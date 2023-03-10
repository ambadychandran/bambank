"use strict";
var fs = require("fs");
var path = require("path");
var  { Sequelize, Op } = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};
fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function (file) {
        var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });
Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

// Hook to credit bonus after sign in
db.user.addHook('afterCreate', (user) => {
    db.transactions.create({ amount: 100,reciverid: user.id,status:'credit'})
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op
module.exports = db;