const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require('../models/student');
const Class = require('../models/class');
const User = require('../models/user');




router.post('/', (req, res, next) => {
    Class.findById(req.body.classId)
        .then(classe => {
            if (!classe) {
                return res.status(404).json({
                    message: 'classe not Found!',
                    reason: 'Cant find a classe with this id.' + req.body.classId
                });
            }
            User.findById(req.body.userId)
                .then(user => {
                    if (!user) {
                        return res.status(404).json({
                            message: 'user not Found!',
                            reason: 'Cant find a user with this id.' + req.body.userId
                        });
                    }
                })
            const student = new Student({
                _id: new mongoose.Types.ObjectId(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                class: req.body.classId,
                account: req.body.userId
            });
            return student.save();
        })
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'student stored!',
                createdstudent: {
                    _id: result.id,
                    lastName: result.lastName,
                    firstName: result.firstName,
                    class: result.class,
                    account: result.account
                },
                requests: [
                    {
                        type: 'GET',
                        url: 'http://localhost:4000/students/' + result._id
                    },
                    {
                        type: 'GET',
                        url: 'http://localhost:4000/users' + result.account._id
                    },
                    {
                        type: 'GET',
                        url: 'http://localhost:4000/classes/' + result.class
                    }
                ]
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


router.get('/', (req, res, next) => {
    Student.find()
        .select('firstName lastName _id classId')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                students: docs.map(doc => {
                    return {
                        firstName: doc.firstName,
                        lastName: doc.lastName,
                        classId: doc.classId,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/students/' + doc._id
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

router.get('/:studentId', (req, res, next) => {
    const id = req.params.studentId;
    Student.findById(id)
        .select('firstName lastName _id classId')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    classe: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_student => URL_UNDER',
                        url: 'http://localhost:4000/students'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for student id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.patch('/:studentId', (req, res, next) => {
    const id = req.params.studentId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Student.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'student Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/students/' + id
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

router.delete('/:studentId', (req, res, next) => {
    const id = req.params.studentId
    Student.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'student deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/classes/',
                    body: {
                        firstName: 'String',
                        lastName: 'String'
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