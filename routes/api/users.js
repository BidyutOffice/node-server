const router = require("express").Router();
const { index, store, destroy, show, edit } = require("../../controller/api/usersController");
const checkUserID = require("../../middleware/checkUserID");

router
    .get("/users", index)
    .post("/users", store)
    .get("/users/:id", checkUserID, show)
    .delete("/users/:id", checkUserID, destroy)
    .put("/users/:id", checkUserID, edit);

module.exports = router
