const mongoose = require('mongoose');
const ClassCalendar = require('../../models/calendarModels/classCalendar');

// add ClassCalendar
exports.Add_ClassCalendar = (req, res, next) => {
    const classCalendar = new ClassCalendar({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        class: req.body.class,
        schoolYear: req.body.schoolYear,
        seances: req.body.seances,
    });
    classCalendar
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created ClassCalendar Successfully!',
                createdClassCalendar: {
                    _id: result.id,
                    name: result.name,
                    class: result.class,
                    schoolYear: result.schoolYear,
                    seances: result.seances,
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/classCalendars' + result._id
                }
            })
        })
        .catch(err => console.log(err));
}

// get all ClassCalendars
exports.Get_All_ClassCalendars = (req, res, next) => {
    ClassCalendar.find()
        .select('_id name class schoolYear seances')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                ClassCalendares: docs.map(doc => {
                    return {
                        _id: doc.id,
                        name: doc.name,
                        class: doc.class,
                        schoolYear: doc.schoolYear,
                        seances: doc.seances,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/classCalendars/' + doc._id
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

//get specific ClassCalendar
exports.Get_Specific_ClassCalendar = (req, res, next) => {
    const id = req.params.classClendarId;
    ClassCalendar.findById(id)
        .select('_id name class schoolYear seances')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    ClassCalendare: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_ClassCalendar => URL_UNDER',
                        url: 'http://localhost:4000/lassCalendars'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for classCalendar id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

// update ClassCalendar
exports.Update_ClassCalendar = (req, res, next) => {
    const id = req.params.classClendarId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    ClassCalendar.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'ClassCalendar Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/classCalendars/' + id
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

// delete ClassCalendar
exports.Delete_ClassCalendar = (req, res, next) => {
    const id = req.params.classClendarId
    ClassCalendar.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'ClassCalendar deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/classCalendars/',
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

//get specific ClassCalendar by class
exports.Get_Specific_ClassCalendar_By_Class = (req, res, next) => {
    const id = req.params.classId;
    ClassCalendar.findOne({ class: id })
        .select('_id name class schoolYear seances')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    ClassCalendare: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_ClassCalendar => URL_UNDER',
                        url: 'http://localhost:4000/classCalendars'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for classId' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

//get specific ClassCalendar by schoolYear and class
exports.Get_Specific_ClassCalendar_By_Class_And_SchoolYear = (req, res, next) => {
    const id = req.params.ClassId;
    const schoolY = req.params.schoolYear;
    ClassCalendar.find({ class: id, schoolYear: schoolY })
        .select('_id name class schoolYear seances')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    ClassCalendare: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_ClassCalendar => URL_UNDER',
                        url: 'http://localhost:4000/classCalendars'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for classCalendarId' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}
