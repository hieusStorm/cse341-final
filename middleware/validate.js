const validator = require("../helpers/validate");

const saveMonster = (req, res, next) => {
    const elements = ['fire', 'water', 'thunder', 'ice', 'dragon', 'none'];
    const damageTypes = ['slash', 'impact', 'shot', 'none'];
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
    const elementTypes = ['fire', 'water', 'thunder', 'ice', 'dragon', 'poison', 'paraylis', 'blast', 'sleep', 'none'];
    const damageTypes = ['slash', 'impact', 'shot'];
    const weaponTypes = ['great sword', 'long sword', 'sword and shield', 'dual blades', 'hammer', 'hunting horn', 'lance', 'gunlance', 'switch axe', 'charge blade', 'insect glaive', 'light bowgun', 'heavy bowgun', 'bow'];

    const validationRule = {
        name: "required|string",
        elementType: {inclusion: elementTypes},
        elementValue: "required|integer",
        damageType: {inclusion: damageTypes},
        attackValue: "required|integer",
        weaponType: {inclusion: weaponTypes}
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
        headPiece: {inclusion: elements},
        bodyPiece: "required|string",
        armPiece: "required|string",
        legPiece: "required|string",
        weapon: "required|string",
        decorations: "required|string"
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
const saveSkill = (req, res, next) => {
    const validationRule = {
        name: "required|string",
        effect: "required|string",
        levelCap: "required|integer"
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
    saveSkill
}