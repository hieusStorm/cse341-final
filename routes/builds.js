const router = require("express").Router();
const controller = require("../controllers/builds");
const validate = require("../middleware/validate");

router.get("/", controller.getAll);
router.get("/:id", controller.getSingle);
router.post("/", validate.saveBuild, controller.createBuild);
router.put("/:id", validate.saveBuild, controller.updateBuild);
router.delete("/:id", controller.deleteBuild);

module.exports = router;