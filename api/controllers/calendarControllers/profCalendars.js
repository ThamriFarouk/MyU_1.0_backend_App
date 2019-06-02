const mongoose = require('mongoose');
const ProfCalendar = require('../../models/calendarModels/profCalendar');

// add ProfCalendar
exports.Add_ProfCalendar = (req, res, next) => {
    const profCalendar = new ProfCalendar({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        prof: req.body.prof,
        schoolYear: req.body.schoolYear,
        seances: req.body.seances,
    });
    profCalendar
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created ProfCalendar Successfully!',
                createdProfCalendar: {
                    _id: result.id,
                    name: result.name,
                    prof: result.prof,
                    schoolYear: result.schoolYear,
                    seances: result.seances,
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/profCalendars' + result._id
                }
            })
        })
        .catch(err => console.log(err));
}

// get all ProfCalendars
exports.Get_All_ProfCalendars = (req, res, next) => {
    ProfCalendar.find()
        .select('_id name prof schoolYear seances')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                ProfCalendars: docs.map(doc => {
                    return {
                        _id: doc.id,
                        name: doc.name,
                        prof: doc.prof,
                        schoolYear: doc.schoolYear,
                        seances: doc.seances,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/profCalendars/' + doc._id
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

//get specific ProfCalendar
exports.Get_Specific_ProfCalendar = (req, res, next) => {
    const id = req.params.profCalendarId;
    ProfCalendar.findById(id)
        .select('_id name prof schoolYear seances')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    ProfCalendar: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_ProfCalendar => URL_UNDER',
                        url: 'http://localhost:4000/profCalendars'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for profCalendar id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

// update ProfCalendar
exports.Update_ProfCalendar = (req, res, next) => {
    const id = req.params.profCalendarId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    ProfCalendar.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'ProfCalendar Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/profCalendars/' + id
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

// delete ProfCalendar
exports.Delete_ProfCalendar = (req, res, next) => {
    const id = req.params.profCalendarId
    ProfCalendar.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'ProfCalendar deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/profCalendars/',
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

//get specific ProfCalendar by prof
exports.Get_Specific_ProfCalendar_By_Prof = (req, res, next) => {
    const id = req.params.profId;
    ProfCalendar.findOne({ prof: id })
        .select('_id name prof schoolYear seances')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    ProfCalendar: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_ProfCalendar => URL_UNDER',
                        url: 'http://localhost:4000/profCalendars'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for orofCalendarId' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

//get specific ProfCalendar by schoolYear and prof
exports.Get_Specific_ProfCalendar_By_Prof_And_SchoolYear = (req, res, next) => {
    const id = req.params.profId;
    const schoolY = req.params.schoolYear;
    ProfCalendar.find({ prof: id, schoolYear: schoolY })
        .select('_id name prof schoolYear seances')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    ProfCalendar: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_ProfCalendar => URL_UNDER',
                        url: 'http://localhost:4000/profCalendars'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for profCalendarId' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

function formatSchoolYearFromBody(schoolyear) {
    // sy = schoolyear;
    // sy.replace('-', '/');
    // console.log(sy);
    return schoolyear.replace('-', '/');
}