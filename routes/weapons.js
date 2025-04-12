const router = require("express").Router();
const controller = require("../controllers/weapons");
const { isAuthenticated } = require('../middleware/authenticate');
const validate = require("../middleware/validate");

router.get("/", controller.getAll);
router.get("/:id", controller.getSingle);
router.post("/", isAuthenticated, validate.saveWeapon, controller.createWeapon);
router.put("/:id", isAuthenticated, validate.saveWeapon, controller.updateWeapon);
router.delete("/:id", isAuthenticated, controller.deleteWeapon);

module.exports = router;