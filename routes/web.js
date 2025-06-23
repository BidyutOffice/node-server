const { index, about } = require("../controller/homeController");

const router = require("express").Router();

router
    .get("/", index)
    .get("/about-us", about)

module.exports = router;