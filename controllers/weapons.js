const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// functions
const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('weapons');
    result.toArray().then((weapons) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(weapons);
    }).catch((err) => {
        res.status(400).json({message: err});
    });
};

const getSingle = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must us a valid weapon ID to find');
    }
    const weaponId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('weapons').find({_id: weaponId});
    result.toArray().then(weapon => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(weapon[0]);
    }).catch((err)=> res.status(400).json({message: err}));
};

const createWeapon = async (req, res) => {
    const weapon = {
        name: req.body.name,
        elementType: req.body.elementType,
        elementValue: req.body.elementValue,
        damageType: req.body.damageType,
        attackValue: req.body.attackValue,
        weaponType: req.body.weaponType
    };

    const response = await mongodb.getDb().db().collection('weapons').insertOne(weapon);

    if(response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while adding a weapon');
    }
};

const updateWeapon = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid weapon Id to update');
    } 

    const weaponId = new ObjectId(req.params.id);

    const weapon = {
        name: req.body.name,
        elementType: req.body.elementType,
        elementValue: req.body.elementValue,
        damageType: req.body.damageType,
        attackValue: req.body.attackValue,
        weaponType: req.body.weaponType
    };

    const response = await mongodb.getDb().db().collection('weapons').replaceOne({_id: weaponId}, weapon);

    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An Error occured while updating the weapon');
    }
};

const deleteWeapon = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid weapon ID to delete.');
    }

    const weaponId = new ObjectId(req.params.id);
    
    const response = await mongodb.getDb().db().collection('weapons').deleteOne({_id: weaponId});

    if(response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || `An error occured while deleteing the weapon`);
    }
};

module.exports = {
    getAll,
    getSingle,
    createWeapon,
    updateWeapon,
    deleteWeapon
};