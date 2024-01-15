const Transaction = require("../models/transaction");

const bot = require("../server");

const setMessage = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOne({
      transaction: req.params.code,
    });
    await Transaction.findOneAndUpdate(
      { transaction: req.params.code },
      {
        message: transaction.transaction.push(
          req.body.message
        ),
      }
    );

    bot.sendMessage(transaction.chatId, `${req.body.message}  || transaction code --  ${transaction.transaction}`);
  } catch (error) {
    console.log(error);
    res.status(error.status).json(error.message);
  }
};

module.exports = setMessage;
