const mongoose = require('mongoose');
const ExamCalendar = require('../../models/calendarModels/examCalendar');

// add ExamCalendar
exports.Add_ExamCalendar = (req, res, next) => {
    const examCalendar = new ExamCalendar({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        class: req.body.class,
        schoolYear: req.body.schoolYear,
        seances: req.body.seances,
    });
    examCalendar
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created ExamCalendar Successfully!',
                createdExamCalendar: {
                    _id: result.id,
                    name: result.name,
                    class: result.class,
                    schoolYear: result.schoolYear,
                    seances: result.seances,
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/examCalendars' + result._id
                }
            })
        })
        .catch(err => console.log(err));
}

// get all ExamCalendars
exports.Get_All_ExamCalendars = (req, res, next) => {
    ExamCalendar.find()
        .select('_id name class schoolYear seances')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                ExamCalendares: docs.map(doc => {
                    return {
                        _id: doc.id,
                        name: doc.name,
                        class: doc.class,
                        schoolYear: doc.schoolYear,
                        seances: doc.seances,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/examCalendars/' + doc._id
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

//get specific ExamCalendar
exports.Get_Specific_ExamCalendar = (req, res, next) => {
    const id = req.params.examCalendarId;
    ExamCalendar.findById(id)
        .select('_id name class schoolYear seances')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    ExamCalendare: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_ExamCalendar => URL_UNDER',
                        url: 'http://localhost:4000/examCalendars'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for examCalendar id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

// update ExamCalendar
exports.Update_ExamCalendar = (req, res, next) => {
    const id = req.params.examCalendarId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    ExamCalendar.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'ExamCalendar Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/examCalendars/' + id
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

// delete ExamCalendar
exports.Delete_ExamCalendar = (req, res, next) => {
    const id = req.params.examCalendarId
    ExamCalendar.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'ExamCalendar deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/examCalendars/',
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

//get specific ExamCalendar by class
exports.Get_Specific_ExamCalendar_By_Class = (req, res, next) => {
    const id = req.params.classID;
    ExamCalendar.findOne({ class: id })
        .select('_id name class schoolYear seances')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    ExamCalendare: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_ExamCalendar => URL_UNDER',
                        url: 'http://localhost:4000/examCalendars'
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

//get specific ExamCalendar by schoolYear and class
exports.Get_Specific_ExamCalendar_By_Class_And_SchoolYear = (req, res, next) => {
    const id = req.params.examCalendarId;
    const schoolY = req.params.schoolYear;
    ExamCalendar.find({ class: id, schoolYear: schoolY })
        .select('_id name class schoolYear seances')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    ExamCalendare: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_ExamCalendar => URL_UNDER',
                        url: 'http://localhost:4000/examCalendars'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for examCalendarId' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}
