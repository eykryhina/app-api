const app = require("./app");
const mongoose = require("mongoose");

// Подключите модуль 'node-telegram-bot-api'
const TelegramBot = require("node-telegram-bot-api");

// импортируем функцию для обработки сообщения в боте
const { messageInBot, buttonKlick } = require("./bot");

// Создайте бота, который использует 'polling' для получения новых обновлений
const bot = new TelegramBot(process.env.TG_BOT_TOKEN, {
  polling: true,
});

bot.on("callback_query", (callbackQuery) => {
  buttonKlick(bot, callbackQuery);
});

bot.on("message", (msg) => {
  messageInBot(bot, msg);
});

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log(
        "Server running. Use our API on port: 3000"
      );
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
