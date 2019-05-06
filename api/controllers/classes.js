const mongoose = require('mongoose');
const Class = require('../models/class');

// add Classe
exports.Add_Class = (req, res, next) => {
    const classe = new Class({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        departementName: req.body.departementName,
    });
    classe
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created classe Successfully!',
                createdclasse: {
                    name: result.name,
                    departementName: result.departementName,
                    _id: result.id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:4000/classes' + result._id
                    }
                }
            })
        })
        .catch(err => console.log(err));
}

// get all classes
exports.Get_All_Classes = (req, res, next) => {
    Class.find()
        .select('name departementName _id ')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                classes: docs.map(doc => {
                    return {
                        name: doc.name,
                        departementName: doc.departementName,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/classes/' + doc._id
                        }
                    }
                })
            }
            if (docs.length >= 0) {
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: 'No entries found'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}

//get specific class
exports.Get_Specific_Class = (req, res, next) => {
    const id = req.params.classeId;
    Class.findById(id)
        .select('name departementName _id ')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    classe: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_classe => URL_UNDER',
                        url: 'http://localhost:4000/classes'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for classe id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

// update class
exports.Update_Class = (req, res, next) => {
    const id = req.params.classeId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Class.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'classe Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/classes/' + id
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}

// delete class
exports.Delete_Class = (req, res, next) => {
    const id = req.params.classeId
    Class.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'classe deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/products/',
                    body: {
                        name: 'String',
                        departementName: 'String'
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}
