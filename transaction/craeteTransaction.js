const Transaction = require("../models/transaction");

const createTransaction = async (data, bot, chatId) => {
  try {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    const created = await Transaction.create({
      ...data,
      createdAt: formattedDate,
    });

    if (created) {
      bot.sendMessage(
        chatId,
        `код транзакции: \`${data.transaction}\``,
        { parse_mode: "Markdown" }
      );
    }
  } catch (error) {
    console.log(error);
    bot.sendMessage(chatId, error.message);
  }
};

module.exports = createTransaction;
