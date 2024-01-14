const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    senderName: {
      type: String,
      required: true,
    },
    recipientName: {
      type: String,
      required: true,
    },
    transaction: {
      type: String,
      required: true,
    },
    sendMoneyCount: {
      type: String,
      required: true,
    },
    recipientMoneyCount: {
      type: String,
      required: true,
    },
    sender: { type: String, required: true },
    recipient: { type: String, required: true },
    recipientDetails: {
      type: String,
      required: true,
    },
    recipientPhone: {
      type: String,
      required: true,
    },
    coment: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    messages: {
      type: Array,
      required: false,
      expires: "24h",
    },
    chatId: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Transaction = model("transaction", transactionSchema);

module.exports = Transaction;
