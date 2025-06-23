const router = require("express").Router();
const { index, store, destroy, show } = require("../../controller/api/usersController");

router
    .get("/users", index)
    .post("/users", store)
    .get("/users/:id", show)
    .delete("/users/:id", destroy);

module.exports = router
