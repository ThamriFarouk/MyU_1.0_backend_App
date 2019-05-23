const mongoose = require('mongoose');
const ProfExamCalendar = require('../../models/calendarModels/profExamCalendar');

// add ProfExamCalendar
exports.Add_ProfExamCalendar = (req, res, next) => {
    const profExamCalendar = new ProfExamCalendar({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        prof: req.body.prof,
        schoolYear: req.body.schoolYear,
        seances: req.body.seances,
    });
    profExamCalendar
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created ProfExamCalendar Successfully!',
                createdProfExamCalendar: {
                    _id: result.id,
                    name: result.name,
                    prof: result.prof,
                    schoolYear: result.schoolYear,
                    seances: result.seances,
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/profExamCalendars' + result._id
                }
            })
        })
        .catch(err => console.log(err));
}

// get all ProfExamCalendars
exports.Get_All_ProfExamCalendars = (req, res, next) => {
    ProfExamCalendar.find()
        .select('_id name prof schoolYear seances')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                ProfExamCalendares: docs.map(doc => {
                    return {
                        _id: doc.id,
                        name: doc.name,
                        prof: doc.prof,
                        schoolYear: doc.schoolYear,
                        seances: doc.seances,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/profExamCalendars/' + doc._id
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

//get specific ProfExamCalendar
exports.Get_Specific_ProfExamCalendar = (req, res, next) => {
    const id = req.params.profExamCalendarId;
    ProfExamCalendar.findById(id)
        .select('_id name prof schoolYear seances')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    ProfExamCalendare: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_ProfExamCalendar => URL_UNDER',
                        url: 'http://localhost:4000/profExamCalendars'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for profExamCalendar id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

// update ProfExamCalendar
exports.Update_ProfExamCalendar = (req, res, next) => {
    const id = req.params.profExamCalendarId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    ProfExamCalendar.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'ProfExamCalendar Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/profExamCalendars/' + id
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

// delete ProfExamCalendar
exports.Delete_ProfExamCalendar = (req, res, next) => {
    const id = req.params.profExamCalendarId
    ProfExamCalendar.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'ProfExamCalendar deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/profExamCalendars/',
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

//get specific ProfExamCalendar by prof
exports.Get_Specific_ProfExamCalendar_By_Prof = (req, res, next) => {
    const id = req.params.profId;
    ProfExamCalendar.findOne({ prof: id })
        .select('_id name prof schoolYear seances')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    ProfExamCalendare: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_ProfExamCalendar => URL_UNDER',
                        url: 'http://localhost:4000/profExamCalendars'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for orofExamCalendarId' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

//get specific ProfExamCalendar by schoolYear and prof
exports.Get_Specific_ProfExamCalendar_By_Prof_And_SchoolYear = (req, res, next) => {
    const id = req.params.profId;
    const schoolY = req.params.schoolYear;
    ProfExamCalendar.find({ prof: id, schoolYear: schoolY })
        .select('_id name prof schoolYear seances')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    ProfExamCalendare: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_ProfExamCalendar => URL_UNDER',
                        url: 'http://localhost:4000/profExamCalendars'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for profExamCalendarId' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}
