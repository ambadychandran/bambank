"use strict";
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
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

db.transactions.belongsTo(db.user, { as: 'sender' })
db.transactions.belongsTo(db.user, { as: 'receiver' })
db.user.belongsToMany(db.transactions, { through: 'usertransactions' })

// Extra Hooks
db.user.addHook('afterCreate', (user) => {
    db.transactions.create({ balance: 100,receiverIdentifier: user.identifier })
  })

// Extra Hooks
// Balance shouldn't actually be a direct property of users but a calculated and cached one. For now though, this is fine
db.transactions.addHook('afterCreate', (transactions) => {
db.user.findOne(
    { where: { identifier: transactions.receiverIdentifier } }
).then(user =>
    user.addTransfer(transactions)
)
if (transactions.senderIdentifier) {
    db.user.findOne(
    { where: { identifier: transactions.senderIdentifier } }
    ).then(user =>
    user.addTransfer(transactions)
    )
}
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;