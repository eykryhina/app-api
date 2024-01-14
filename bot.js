const createTransaction = require("./transaction/craeteTransaction");
const deleteTransaction = require("./transaction/deleteTransaction");
const findToDeleteTransaction = require("./transaction/findToDeleteTransaction");
const findTransaction = require("./transaction/findTransaction");

let comand;
let step = 0;
let data = {};
let code;

const regex = /^[0-9]+\s[A-Z]{3}$/;

function getRandomThreeDigitNumber() {
  return Math.floor(Math.random() * (999 - 100 + 1)) + 100;
}

const create = (i, bot, msg) => {
  data.transaction = `${getRandomThreeDigitNumber()}${getRandomThreeDigitNumber()}${getRandomThreeDigitNumber()}`;
  const chatId = msg.chat.id;

  switch (i) {
    case 0:
      bot.sendMessage(chatId, "имя отправителя");
      break;
    case 1:
      data.senderName = msg.text.trim();
      bot.sendMessage(chatId, "имя получателя");
      break;
    case 2:
      data.recipientName = msg.text.trim();
      bot.sendMessage(
        chatId,
        "введите сколько отправляеться в формате: '12345 USD' "
      );
      break;
    case 3:
      if (!regex.test(msg.text)) {
        step -= 1;
        bot.sendMessage(
          chatId,
          "введите отправляемую сумму в правильном формате - '1345 USD'"
        );
      } else {
        data.sendMoneyCount = msg.text;
        bot.sendMessage(
          chatId,
          "введите сумму которую ''получит'' мамонт в формате '12345 USD'"
        );
      }
      break;
    case 4:
      if (!regex.test(msg.text)) {
        step -= 1;
        bot.sendMessage(
          chatId,
          "введите сумму в правильном формате - '1345 USD'"
        );
      } else {
        data.recipientMoneyCount = msg.text;
        bot.sendMessage(
          chatId,
          "введите коментарий к транзакции"
        );
      }
      break;
    case 5:
      data.coment = msg.text;
      bot.sendMessage(chatId, "введите страну отправителя");
      break;
    case 6:
      data.sender = msg.text;
      bot.sendMessage(chatId, "введите страну получателя");
      break;
    case 7:
      data.recipient = msg.text;
      bot.sendMessage(
        chatId,
        "введите реквизиты получателя(номер карты)"
      );
      break;
    case 8:
      if (!validateCardNumber(msg.text)) {
        step -= 1;
        bot.sendMessage(chatId, "Номер карты введен с ошибкой или являеться недействительным. Введите правельный номер карты.")
      } else {
        data.recipientDetails = msg.text;
        bot.sendMessage(chatId, "введите номер получателя. Вводите так кака он должен отображаться в приложении.");
      }
      break;
  }

  step += 1;
};

const messageInBot = (bot, msg) => {
  const chatId = msg.chat.id;

  switch (msg.text) {
    case "/start":
      bot.sendMessage(chatId, "hello");
      break;
    case "/create":
      comand = "create";
      data = {};
      create(0, bot, msg);
      break;
    case "/link":
      bot.sendMessage(
        chatId,
        "https:// link to ''googlplay'' "
      );
      break;
    case "/delete":
      comand = "delete";
      bot.sendMessage(
        chatId,
        "введите код транзакции которую хотите удалить"
      );
      break;
    case "/transaction":
      comand = "transaction";
      bot.sendMessage(chatId, "введите код транзакции");
      break;
    default:
      if (comand && comand === "create") {
        if (step === 9) {
          data.recipientPhone = msg.text;
          bot.sendMessage(
            chatId,
            `проверь данные:
      отправитель - ${data.senderName}
      получатель - ${data.recipientName}
      отправляемая сумма - ${data.sendMoneyCount}
      получаемая сума - ${data.recipientMoneyCount}
      страна отправителя - ${data.sender}
      страна получателя - ${data.recipient}
      карта получателя - ${data.recipientDetails}
      номер получателя - ${data.recipientPhone}
      коментарий - ${data.coment}

      код трансакции - ${data.transaction}
      
      нажми подтвердить чтоб создать транзакцию`,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "подтвердить",
                      callback_data: "подтвердить",
                    },
                  ],
                  [
                    {
                      text: "отменить",
                      callback_data: "отменить",
                    },
                  ],
                ],
              },
            }
          );
        } else {
          create(step, bot, msg);
        }
      } else if (comand && comand === "delete") {
        code = msg.text;
        findToDeleteTransaction(msg.text, bot, chatId);
      } else if (comand && comand === "transaction") {
        findTransaction(msg.text, bot, chatId);
        comand = null;
        code = null;
      } else {
        bot.sendMessage(chatId, "its not a comand");
      }
  }
};

const buttonKlick = (bot, callbackQuery) => {
  const message = callbackQuery.message;
  const callbackData = callbackQuery.data;

  switch (callbackData) {
    case "подтвердить":
      bot.editMessageText(
        `Вы нажали кнопку: ${callbackData}, транзакция создаеться... подождите.`,
        {
          chat_id: message.chat.id,
          message_id: message.message_id,
        }
      );

      createTransaction(
        {
          ...data,
          chatId: message.chat.id,
        },
        bot,
        message.chat.id
      );
      comand = null;
      step = 1;
      data = {};
      break;
    case "отменить":
      comand = null;
      data = {};
      step = 1;
      bot.editMessageText(
        `
      Вы нажали кнопку: ${callbackData}
      операция успешно отменена`,
        {
          chat_id: message.chat.id,
          message_id: message.message_id,
        }
      );
      break;
    case "удалить":
      bot.editMessageText(
        `
      Вы нажали кнопку: ${callbackData}
      транзакция удаляеться.. подождите`,
        {
          chat_id: message.chat.id,
          message_id: message.message_id,
        }
      );
      deleteTransaction(code, bot, message.chat.id);
      code = null;
      break;
    default:
      bot.editMessageText(
        `
      Вы нажали кнопку: ${callbackData}
      вопрос, откуда она у вас...
      попробуйте нажать чтото другое`,
        {
          chat_id: message.chat.id,
          message_id: message.message_id,
        }
      );
  }
};

function validateCardNumber(number) {
  const regex = /^[0-9]{16}$/;
  if (!regex.test(number)) return false;

  return luhnCheck(number);
}

function luhnCheck(val) {
  let sum = 0;
  for (let i = 0; i < val.length; i++) {
    let intVal = parseInt(val.substr(i, 1));
    if (i % 2 === 0) {
      intVal *= 2;
      if (intVal > 9) {
        intVal = 1 + (intVal % 10);
      }
    }
    sum += intVal;
  }
  return sum % 10 === 0;
}

module.exports = { messageInBot, buttonKlick };
