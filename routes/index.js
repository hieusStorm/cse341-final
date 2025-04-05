const router = require("express").Router();

router.use("/", require("./swagger"));

router.use("/monsters", require("./monsters"));
router.use("/builds", require("./builds"));
router.use("/weapons", require("./weapons"));
router.use("/users", require("./users"));

router.get("/", (req, res) => res.send("Monster Hunter Wilds Builds and Monster Database"));

module.exports = router;