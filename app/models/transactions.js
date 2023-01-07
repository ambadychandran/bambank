module.exports = function(sequelize, Sequelize) {
    var Transactions = sequelize.define('transactions', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        reciverid: {
            type: Sequelize.UUID
        },
        senderid: {
            type: Sequelize.UUID
        },
        amount: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: new Date(),
            allowNull: false
        }
    });
    return Transactions;
}