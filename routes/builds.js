const router = require("express").Router();
const controller = require("../controllers/builds");
const { isAuthenticated } = require('../middleware/authenticate');
const validate = require("../middleware/validate");

router.get("/", controller.getAll);
router.get("/:id", controller.getSingle);
router.post("/", validate.saveBuild, controller.createBuild);
router.put("/:id", isAuthenticated, validate.saveBuild, controller.updateBuild);
router.delete("/:id", isAuthenticated, controller.deleteBuild);

module.exports = router;