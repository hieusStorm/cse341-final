const router = require("express").Router();
const controller = require("../controllers/skills");
const { isAuthenticated } = require('../middleware/authenticate');
const validate = require("../middleware/validate");

router.get("/", controller.getAll);
router.get("/:id", controller.getSingle);
router.post("/", isAuthenticated, validate.saveSkill, controller.createSkill);
router.put("/:id", isAuthenticated, validate.saveSkill, controller.updateSkill);
router.delete("/:id", isAuthenticated, controller.deleteSkill);

module.exports = router;