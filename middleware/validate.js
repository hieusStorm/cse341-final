const validator = require("../helpers/validate");

const saveMonster = (req, res, next) => {
    const validationRule = {
        name: "required|string",
        elementWeakness: "required|string",
        weakSpot: "required|string",
        damageTypeWeak: "required|string",
        type: "required|string"
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if(!status) {
            res.status(412).send({
                success: false,
                message: "Validation Failed",
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveMonster
}