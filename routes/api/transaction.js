const express = require("express");

const router = express.Router();

const getByCode = require("../../transaction/getByCode");
const setMessage = require("../../transaction/setMessage");

router.get("/:code", getByCode);

router.post("/:code", setMessage);

module.exports = router;
