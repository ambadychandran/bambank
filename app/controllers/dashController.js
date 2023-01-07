const db = require("../models");
var  Sequelize = require("sequelize");
const Transactions = db.transactions;
const User = db.user;

const userTransfers = (id, limit = 10) => {
  return Transactions.findAll({
    raw: true,
    limit: limit,
    order: [['createdAt', 'DESC']],
    where: {
      [db.Op.or]: [
        { senderid: id },
        { reciverid: id }
      ]
    },
    attributes: ['id',[Sequelize.fn('DATE_FORMAT', Sequelize.col('date'), '%m/%d/%Y'), 'formatted_date'], 'amount','status','senderid', 'reciverid']
  })
}

const getbalance = async (id) => {
  const transactions = await Transactions.findAll({
    where: {
      [db.Op.or]: [
        { senderid: id },
        { reciverid: id }
      ]
    }
  });
  let creditSum = 0;
  let debitSum = 0;

  // Sum up the credit and debit amounts
  transactions.forEach((transaction) => {
    creditSum += (transaction.reciverid == id) ? transaction.amount : 0;
    debitSum += (transaction.senderid == id) ? transaction.amount : 0;
  });

  // Calculate the balance
  const balance = creditSum - debitSum;
  return balance;
}

exports.dashboard = async (req, res) => {
    let fullName  =  `${req.user.firstname} ${req.user.lastname}`;
    await res.render('dashboard',{
            displayName: fullName,
            balance: await getbalance(req.user.id),
            transactions: await userTransfers(req.user.id),
            userId: req.user.id,
        })
};

module.exports.transfer = async (req, res) => {

  await User.findOne({
    where: {
      email: req.body.email
    }
  }).then(recipient => {
    if (recipient) {
      Transactions.create({
        amount: req.body.amount,
        reciverid: recipient.id,
        senderid: req.user.id
      })
    }
  })
  await res.redirect('/dashboard')
}
