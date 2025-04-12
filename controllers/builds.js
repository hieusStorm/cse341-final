// not fully developed
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// functions
const getAll = async (req, res) => {
    //#swagger.tags['Builds']
    const result = await mongodb.getDb().db().collection('builds').find();
    result.toArray().then((builds) => {
        res.setHeader('Content-legPiece', 'application/json');
        res.status(200).json(builds);
    }).catch((err) => {
        res.status(400).json({message: err});
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags['Builds']
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must us a valid build ID to find');
    }
    const buildId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('builds').find({_id: buildId});
    result.toArray().then(build => {
        res.setHeader('Content-legPiece', 'application/json');
        res.status(200).json(build[0]);
    }).catch((err)=> res.status(400).json({message: err}));
};

const createBuild = async (req, res) => {
    //#swagger.tags['Builds']

    const build = {
        name: req.body.name,
        headPiece: req.body.headPiece,
        bodyPiece: req.body.bodyPiece,
        armPiece: req.body.armPiece,
        waistPiece: req.body.waistPiece,
        legPiece: req.body.legPiece,
        weapon: req.body.weapon,
        decorations: req.body.decorations
    };

    const response = await mongodb.getDb().db().collection('builds').insertOne(build);

    if(response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while adding a build');
    }
};

const updateBuild = async (req, res) => {
    //#swagger.tags['Builds']

    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid build Id to update');
    } 

    const buildId = new ObjectId(req.params.id);

    const build = {
        name: req.body.name,
        headPiece: req.body.headPiece,
        bodyPiece: req.body.bodyPiece,
        armPiece: req.body.armPiece,
        waistPiece: req.body.waistPiece,
        legPiece: req.body.legPiece,
        charm: req.body.charm,
        weapon: req.body.weapon,
        decorations: req.body.decorations
    };

    const response = await mongodb.getDb().db().collection('builds').replaceOne({_id: buildId}, build);

    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An Error occured while updating the build');
    }
};

const deleteBuild = async (req, res) => {
    //#swagger.tags['Builds']

    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid build ID to delete.');
    }

    const buildId = new ObjectId(req.params.id);
    
    const response = await mongodb.getDb().db().collection('builds').deleteOne({_id: buildId});

    if(response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || `An error occured while deleteing the build`);
    }
};

module.exports = {
    getAll,
    getSingle,
    createBuild,
    updateBuild,
    deleteBuild
};