const { Router } = require("express");

const { getTravels } = require("../controllers/travel.js");
const router = Router();

router.get("/", getTravels);

module.exports = router;
