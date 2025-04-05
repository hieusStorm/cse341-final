const validator = require("../helpers/validate");

const saveMonster = (req, res, next) => {
    const elements = ['fire', 'water', 'thunder', 'ice', 'dragon'];
    const damageTypes = ['slash', 'impact', 'shot'];
    const validationRule = {
        name: "required|string",
        elementWeakness: {inclusion: elements},
        weakSpot: "required|string",
        damageTypeWeak: {inclusion: damageTypes},
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
const saveWeapon = (req, res, next) => {
    const elementTypes = ['fire', 'water', 'thunder', 'ice', 'dragon', 'poison', 'paraylis', 'blast', 'sleep'];
    const damageTypes = ['slash', 'impact', 'shot'];
    const validationRule = {
        name: "required|string",
        elementType: {inclusion: elementTypes},
        elementValue: "required|integer",
        damageType: {inclusion: damageTypes},
        attackValue: "required|integer",
        weaponType: "required|string",
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
// Placeholders
const saveBuild = (req, res, next) => {
    const elements = ['fire', 'water', 'thunder', 'ice'];
    const validationRule = {
        name: "required|string",
        elementWeakness: {inclusion: elements},
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
const saveUser = (req, res, next) => {
    const elements = ['fire', 'water', 'thunder', 'ice'];
    const validationRule = {
        name: "required|string",
        elementWeakness: {inclusion: elements},
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
    saveMonster,
    saveWeapon,
    saveBuild,
    saveUser
}