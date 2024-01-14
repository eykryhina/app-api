const Transaction = require("../models/transaction");

const getByCode = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOne({
      transaction: req.params.code,
    });

    if (transaction) {
      res.status(200).json(transaction);
    } else {
      console.log("qwerty");
      res
        .status(404)
        .json({ message: "transaaction not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(error.status).json(error.message);
  }
};

module.exports = getByCode;
