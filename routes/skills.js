const router = require("express").Router();
const controller = require("../controllers/skills");
const validate = require("../middleware/validate");

router.get("/", controller.getAll);
router.get("/:id", controller.getSingle);
router.post("/", validate.saveSkill, controller.createSkill);
router.put("/:id", validate.saveSkill, controller.updateSkill);
router.delete("/:id", controller.deleteSkill);

module.exports = router;