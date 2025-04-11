// not fully developed
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// functions
const getAll = async (req, res) => {
    //#swagger.tags['Skills']

    const result = await mongodb.getDb().db().collection('skills').find();
    result.toArray().then((skills) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(skills);
    }).catch((err) => {
        res.status(400).json({message: err});
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags['Skills']

    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must us a valid skill ID to find');
    }
    const skillId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('skills').find({_id: skillId});
    result.toArray().then(skill => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(skill[0]);
    }).catch((err)=> res.status(400).json({message: err}));
};

const createSkill = async (req, res) => {
    //#swagger.tags['Skills']

    const skill = {
        name: req.body.name,
        effect: req.body.effect,
        levelCap: req.body.levelCap
    };

    const response = await mongodb.getDb().db().collection('skills').insertOne(skill);

    if(response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while adding a skill');
    }
};

const updateSkill = async (req, res) => {
    //#swagger.tags['Skills']

    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid skill Id to update');
    } 

    const skillId = new ObjectId(req.params.id);

    const skill = {
        name: req.body.name,
        effect: req.body.effect,
        levelCap: req.body.levelCap,
        damageTypeWeak: req.body.damageTypeWeak,
        type: req.body.type
    };

    const response = await mongodb.getDb().db().collection('skills').replaceOne({_id: skillId}, skill);

    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An Error occured while updating the skill');
    }
};

const deleteSkill = async (req, res) => {
    //#swagger.tags['Skills']
    
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid skill ID to delete.');
    }

    const skillId = new ObjectId(req.params.id);
    
    const response = await mongodb.getDb().db().collection('skills').deleteOne({_id: skillId});

    if(response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || `An error occured while deleteing the skill`);
    }
};

module.exports = {
    getAll,
    getSingle,
    createSkill,
    updateSkill,
    deleteSkill
};