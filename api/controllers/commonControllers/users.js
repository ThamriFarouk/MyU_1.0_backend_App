const mongoose = require('mongoose');
const User = require('../../models/commonModels/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// add a User/ signUp
exports.SignUp = (req, res, next) => {
    User.find({ login: req.body.login })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Login already exists'
                })
            } else {
                bcrypt.hash(req.body.password, 5, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            login: req.body.login,
                            password: hash,
                            type: req.body.type
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'Created User Successfully!',
                                    createdUser: {
                                        login: result.login,
                                        password: result.password,
                                        type: result.type,
                                        _id: result.id
                                    },
                                    request: {
                                        type: 'GET',
                                        url: 'http://localhost:4000/users' + result._id
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
                });
            }
        })
}

// Login with a User
exports.Login = (req, res, next) => {
    console.log(req.body);
    User.find({ login: req.body.login })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            } else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'Auth failed'
                        });
                    }
                    if (result) {
                        const token = jwt.sign(
                            {
                                login: user[0].login,
                                userId: user[0]._id
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "240h"
                            }
                        );
                        return res.status(200).json({
                            message: 'Auth Successful',
                            type: user[0].type,
                            user_id: user[0]._id,
                            token: token
                        })
                    }
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}


// get all Users
exports.Get_All_Users = (req, res, next) => {
    User.find()
        .select('login password _id lastConnexion type')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                users: docs.map(doc => {
                    return {
                        login: doc.login,
                        password: doc.password,
                        type: doc.type,
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
}

// get specific User
exports.get_Scpecific_User = (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .select('login password _id lastConnexion')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    user: doc,
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
}

// update User
exports.Update_User = (req, res, next) => {
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
}

// delete User
exports.Delete_User = (req, res, next) => {
    const id = req.params.userId
    User.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/users/',
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
}