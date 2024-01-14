const Transaction = require("../models/transaction");

const findToDeletTransaction = async (
  code,
  bot,
  chatId
) => {
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
        
        вы уверены что хотите удалить эту транзакцию?`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "удалить",
                  callback_transaction: "удалить",
                },
              ],
              [
                {
                  text: "отменить",
                  callback_transaction: "отменить",
                },
              ],
            ],
          },
        }
      );
    } else {
      bot.sendMessage(chatId, "нет такой транзакции");
    }
  } catch (error) {
    console.log(error);
    bot.sendMessage(chatId, error.message);
  }
};

module.exports = findToDeletTransaction;
