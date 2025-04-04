const router = require("express").Router();
const controller = require("../controllers/weapons");
const validate = require("../middleware/validate");

router.get("/", controller.getAll);
router.get("/:id", controller.getSingle);
router.post("/", validate.saveWeapon, controller.createWeapon);
router.put("/:id", validate.saveWeapon, controller.updateWeapon);
router.delete("/:id", controller.deleteWeapon);

module.exports = router;