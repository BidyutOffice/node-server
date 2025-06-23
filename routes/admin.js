const router = require("express").Router();
const { index, dashboard } = require("../controller/adminController");

router
    .get("/dashboard", dashboard)
    .get("/", index);

module.exports = router