const Transaction = require("../models/transaction");

const deleteTransaction = async (code, bot, chatId) => {
  try {
    const deleted = await Transaction.findOneAndDelete({
      transaction: code,
    });
    if (deleted) {
      bot.sendMessage(
        chatId,
        `
      отправитель - ${deleted.senderName}
      получатель - ${deleted.recipientName}
      отправляемая сумма - ${deleted.sendMoneyCount}
      получаемая сума - ${deleted.recipientMoneyCount}
      страна отправителя - ${deleted.sender}
      страна получателя - ${deleted.recipient}
      карта получателя - ${deleted.recipientDetails}
      номер получателя - ${deleted.recipientPhone}
      коментарий - ${deleted.coment}

      код трансакции - ${deleted.transaction}
      
      deleted.`
      );
    } else {
      bot.sendMessage(
        chatId,
        "не удалось удалить, проверьте код и попробуйте снова."
      );
    }
  } catch (error) {
    console.log(error);
    bot.sendMessage(chatId, error.message);
  }
};

module.exports = deleteTransaction;
