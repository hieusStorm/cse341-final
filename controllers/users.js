// not fully developed
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// functions
const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('users');
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    }).catch((err) => {
        res.status(400).json({message: err});
    });
};

const getSingle = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must us a valid user ID to find');
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('users').find({_id: userId});
    result.toArray().then(user => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user[0]);
    }).catch((err)=> res.status(400).json({message: err}));
};

const createUser = async (req, res) => {
    const user = {
        name: req.body.name,
        elementWeakness: req.body.elementWeakness,
        weakSpot: req.body.weakSpot,
        damageTypeWeak: req.body.damageTypeWeak,
        type: req.body.type
    };

    const response = await mongodb.getDb().db().collection('users').insertOne(user);

    if(response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while adding a user');
    }
};

const updateUser = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user Id to update');
    } 

    const userId = new ObjectId(req.params.id);

    const user = {
        name: req.body.name,
        elementWeakness: req.body.elementWeakness,
        weakSpot: req.body.weakSpot,
        damageTypeWeak: req.body.damageTypeWeak,
        type: req.body.type
    };

    const response = await mongodb.getDb().db().collection('users').replaceOne({_id: userId}, user);

    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An Error occured while updating the user');
    }
};

const deleteUser = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user ID to delete.');
    }

    const userId = new ObjectId(req.params.id);
    
    const response = await mongodb.getDb().db().collection('users').deleteOne({_id: userId});

    if(response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || `An error occured while deleteing the user`);
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};