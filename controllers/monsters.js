const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// functions
const getAll = async (req, res) => {
    //#swagger.tags['Monster']

    const result = await mongodb.getDb().db().collection('monster').find();
    result.toArray().then((monsters) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(monsters);
    }).catch((err) => {
        res.status(400).json({message: err});
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags['Monster']

    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must us a valid monster ID to find');
    }
    const monsterId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('monster').find({_id: monsterId});
    result.toArray().then(monster => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(monster[0]);
    }).catch((err)=> res.status(400).json({message: err}));
};

const createMonster = async (req, res) => {
    //#swagger.tags['Monster']

    const monster = {
        name: req.body.name,
        elementWeakness: req.body.elementWeakness,
        weakSpot: req.body.weakSpot,
        damageTypeWeak: req.body.damageTypeWeak,
        type: req.body.type
    };

    const response = await mongodb.getDb().db().collection('monster').insertOne(monster);

    if(response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while adding a monster');
    }
};

const updateMonster = async (req, res) => {
    //#swagger.tags['Monster']

    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid monster Id to update');
    } 

    const monsterId = new ObjectId(req.params.id);

    const monster = {
        name: req.body.name,
        elementWeakness: req.body.elementWeakness,
        weakSpot: req.body.weakSpot,
        damageTypeWeak: req.body.damageTypeWeak,
        type: req.body.type
    };

    const response = await mongodb.getDb().db().collection('monster').replaceOne({_id: monsterId}, monster);

    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An Error occured while updating the monster');
    }
};

const deleteMonster = async (req, res) => {
    //#swagger.tags['Monster']
    
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid monster ID to delete.');
    }

    const monsterId = new ObjectId(req.params.id);
    
    const response = await mongodb.getDb().db().collection('monster').deleteOne({_id: monsterId});

    if(response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || `An error occured while deleteing the monster`);
    }
};

module.exports = {
    getAll,
    getSingle,
    createMonster,
    updateMonster,
    deleteMonster
};