const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');




router.post('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        login: req.body.login,
        password: req.body.password,
    });
    user
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created User Successfully!',
                createdUser: {
                    login: result.login,
                    password: result.password,
                    _id: result.id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:4000/users' + result._id
                    }
                }
            })
        })
        .catch(err => console.log(err));
});


router.get('/', (req, res, next) => {
    User.find()
        .select('login password _id lastConnexion')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                users: docs.map(doc => {
                    return {
                        login: doc.login,
                        password: doc.password,
                        lastConnexion: doc.lastConnexion,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/users/' + doc._id
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
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .select('login password _id lastConnexion')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_USER => URL_UNDER',
                        url: 'http://localhost:4000/users'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for user id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    User.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'User Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/users/' + id
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId
    User.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/products/',
                    body: {
                        login: 'String',
                        password: 'String'
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
});

module.exports = router;