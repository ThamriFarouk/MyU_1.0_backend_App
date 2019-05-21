const mongoose = require('mongoose');
const Student = require('../models/student');
const Class = require('../models/class');
const User = require('../models/user');


// add Student
exports.Add_Student = (req, res, next) => {
    Student.find({ CIN: req.body.CIN })
        .exec()
        .then(student => {
            if (student.length >= 1) {
                return res.status(409).json({
                    message: 'CIN of student already exists'
                })
            } else {
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
                            account: req.body.userId,
                            birthDate: req.body.birthDate,
                            birthPlace: req.body.birthPlace,
                            Nationality: req.body.Nationality,
                            CIN: req.body.CIN,
                            PassportNumber: req.body.PassportNumber,
                            SchoolName: req.body.SchoolName,
                            DepartmentName: req.body.DepartmentName,
                            email: req.body.email,
                            photo: req.file.photo
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
                                account: result.account,
                                birthDate: result.birthDate,
                                birthPlace: result.birthPlace,
                                Nationality: result.Nationality,
                                CIN: result.CIN,
                                PassportNumber: result.PassportNumber,
                                SchoolName: result.SchoolName,
                                DepartmentName: result.DepartmentName,
                                email: result.email,
                                photo: result.photo
                            },
                            requests: [
                                {
                                    type: 'GET',
                                    url: 'http://localhost:4000/students/' + result._id
                                },
                                {
                                    type: 'GET',
                                    url: 'http://localhost:4000/users/' + result.account._id
                                },
                                {
                                    type: 'GET',
                                    url: 'http://localhost:4000/classes/' + result.class
                                }
                            ]
                        })
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

//get all Students
exports.get_All_Students = (req, res, next) => {
    Student.find()
        .select('_id account firstName lastName class birthDate birthPlace Nationality CIN PassportNumber SchoolName DepartmentName email photo')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                students: docs.map(doc => {
                    return {
                        _id: doc._id,
                        account: doc.account,
                        firstName: doc.firstName,
                        lastName: doc.lastName,
                        class: doc.classId,
                        birthDate: doc.birthDate,
                        birthPlace: doc.birthPlace,
                        Nationality: doc.Nationality,
                        CIN: doc.CIN,
                        PassportNumber: doc.PassportNumber,
                        SchoolName: doc.SchoolName,
                        DepartmentName: doc.DepartmentName,
                        email: doc.email,
                        photo: doc.photo,
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
}

//get Specific Student
exports.get_Specific_Student = (req, res, next) => {
    const id = req.params.studentId;
    Student.findById(id)
        .select('_id account firstName lastName class birthDate birthPlace Nationality CIN PassportNumber SchoolName DepartmentName email photo')
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
}

//update Student
exports.Update_Student = (req, res, next) => {
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
}

// delete Students
exports.Delete_Student = (req, res, next) => {
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
}

//get Specific Student bu userId
exports.get_Student_By_User = (req, res, next) => {
    const id = req.params.userId;
    Student.findOne({ account: id })
        .select('_id account firstName lastName class birthDate birthPlace Nationality CIN PassportNumber SchoolName DepartmentName email photo')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    student: doc,
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
}