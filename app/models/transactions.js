module.exports = function(sequelize, Sequelize) {
    var User = sequelize.define('transactions', {
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
        },
        status: {
            type: Sequelize.STRING,
            notEmpty: true
        }
    });
    return User;
}