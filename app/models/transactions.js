module.exports = function(sequelize, Sequelize) {
    var User = sequelize.define('transactions', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        balance: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: new Date(),
            allowNull: false
        }
    });
    return User;
}