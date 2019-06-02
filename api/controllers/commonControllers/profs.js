const mongoose = require('mongoose');
const Prof = require('../../models/commonModels/prof');
const Class = require('../../models/commonModels/class');
const User = require('../../models/commonModels/user');


// add prof
exports.Add_Prof = (req, res, next) => {
    Prof.find({ CIN: req.body.CIN })
        .exec()
        .then(prof => {
            if (prof.length >= 1) {
                return res.status(409).json({
                    message: 'CIN of prof already exists'
                })
            } else {
                User.findById(req.body.userId)
                    .then(user => {
                        if (!user) {
                            return res.status(404).json({
                                message: 'user not Found!',
                                reason: 'Cant find a user with this id. ' + req.body.userId
                            });
                        }
                        const prof = new Prof({
                            _id: new mongoose.Types.ObjectId(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            classes: req.body.classes,
                            account: req.body.userId,
                            birthDate: req.body.birthDate,
                            birthPlace: req.body.birthPlace,
                            Nationality: req.body.Nationality,
                            CIN: req.body.CIN,
                            PassportNumber: req.body.PassportNumber,
                            SchoolName: req.body.SchoolName,
                            DepartmentsNames: req.body.DepartmentsNames,
                            email: req.body.email,
                            photo: req.file.photo
                        });
                        return prof.save();
                    })
                    .then(result => {
                        console.log(result);
                        res.status(200).json({
                            message: 'prof stored!',
                            createdprof: {
                                _id: result.id,
                                lastName: result.lastName,
                                firstName: result.firstName,
                                classes: result.classes,
                                account: result.account,
                                birthDate: result.birthDate,
                                birthPlace: result.birthPlace,
                                Nationality: result.Nationality,
                                CIN: result.CIN,
                                PassportNumber: result.PassportNumber,
                                SchoolName: result.SchoolName,
                                DepartmentsNames: result.DepartmentsNames,
                                email: result.email,
                                photo: result.photo
                            },
                            requests: [
                                {
                                    type: 'GET',
                                    url: 'http://localhost:4000/profs/' + result._id
                                },
                                {
                                    type: 'GET',
                                    url: 'http://localhost:4000/users/' + result.account._id
                                },
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

//get all profs
exports.get_All_Profs = (req, res, next) => {
    Prof.find()
        .select('_id account firstName lastName classes birthDate birthPlace Nationality CIN PassportNumber SchoolName DepartmentsNames email photo')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                profs: docs.map(doc => {
                    return {
                        _id: doc._id,
                        account: doc.account,
                        firstName: doc.firstName,
                        lastName: doc.lastName,
                        classes: doc.classes,
                        birthDate: doc.birthDate,
                        birthPlace: doc.birthPlace,
                        Nationality: doc.Nationality,
                        CIN: doc.CIN,
                        PassportNumber: doc.PassportNumber,
                        SchoolName: doc.SchoolName,
                        DepartmentsNames: doc.DepartmentsNames,
                        email: doc.email,
                        photo: doc.photo,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/profs/' + doc._id
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

//get Specific prof
exports.get_Specific_Prof = (req, res, next) => {
    const id = req.params.profId;
    Prof.findById(id)
        .select('_id account firstName lastName classes birthDate birthPlace Nationality CIN PassportNumber SchoolName DepartmentsNames email photo')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    classe: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_Prof => URL_UNDER',
                        url: 'http://localhost:4000/profs'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for prof id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

//update prof
exports.Update_Prof = (req, res, next) => {
    const id = req.params.profId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Prof.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'prof Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/profs/' + id
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

// delete profs
exports.Delete_Prof = (req, res, next) => {
    const id = req.params.profId
    Prof.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'prof deleted!',
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

//get Specific prof bu userId
exports.get_Prof_By_User = (req, res, next) => {
    const id = req.params.userId;
    Prof.findOne({ account: id })
        .select('_id account firstName lastName classes birthDate birthPlace Nationality CIN PassportNumber SchoolName DepartmentsNames email photo')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    prof: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_Prof => URL_UNDER',
                        url: 'http://localhost:4000/profs'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for prof id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}