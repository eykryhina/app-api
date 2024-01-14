const Transaction = require("../models/transaction");

const findTransaction = async (code, bot, chatId) => {
  try {
    const transaction = await Transaction.findOne({
      transaction: code,
    });
    if (transaction) {
      bot.sendMessage(
        chatId,
        `
        отправитель - ${transaction.senderName}
      получатель - ${transaction.recipientName}
      отправляемая сумма - ${transaction.sendMoneyCount}
      получаемая сума - ${transaction.recipientMoneyCount}
      страна отправителя - ${transaction.sender}
      страна получателя - ${transaction.recipient}
      карта получателя - ${transaction.recipientDetails}
      номер получателя - ${transaction.recipientPhone}
      коментарий - ${transaction.coment}

      код трансакции - ${transaction.transaction}
      
      messages - ${transaction.messages?.join("|| -- ||")}

      transaction.`
      );
    } else {
      bot.sendMessage(chatId, "транзакция ненайдена");
    }
  } catch (error) {
    console.log(error);
    bot.sendMessage(chatId, error.message);
  }
};

module.exports = findTransaction;
