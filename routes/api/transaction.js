const express = require("express");

const router = express.Router();

const getByCode = require("../../transaction/getByCode");

router.get("/:code", getByCode);

// router.patch("/transaction");

module.exports = router;
