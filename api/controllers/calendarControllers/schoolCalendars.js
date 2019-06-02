const mongoose = require('mongoose');
const SchoolCalendar = require('../../models/calendarModels/schoolCalendar');

// add SchoolCalendar
exports.Add_SchoolCalendar = (req, res, next) => {
    const schoolCalendar = new SchoolCalendar({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        school: req.body.school,
        schoolYear: req.body.schoolYear,
        seances: req.body.seances,
    });
    schoolCalendar
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created SchoolCalendar Successfully!',
                createdSchoolCalendar: {
                    _id: result.id,
                    name: result.name,
                    school: result.school,
                    schoolYear: result.schoolYear,
                    seances: result.seances,
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/schoolCalendars' + result._id
                }
            })
        })
        .catch(err => console.log(err));
}

// get all SchoolCalendares
exports.Get_All_SchoolCalendars = (req, res, next) => {
    SchoolCalendar.find()
        .select('_id name school schoolYear seances')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                SchoolCalendars: docs.map(doc => {
                    return {
                        _id: doc.id,
                        name: doc.name,
                        school: doc.school,
                        schoolYear: doc.schoolYear,
                        seances: doc.seances,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/schoolCalendars/' + doc._id
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

//get specific SchoolCalendar
exports.Get_Specific_SchoolCalendar = (req, res, next) => {
    const id = req.params.schoolCalendarId;
    SchoolCalendar.findById(id)
        .select('_id name school schoolYear seances')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    SchoolCalendar: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_SchoolCalendare => URL_UNDER',
                        url: 'http://localhost:4000/schoolCalendars'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for schoolCalendare id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

// update SchoolCalendar
exports.Update_SchoolCalendar = (req, res, next) => {
    const id = req.params.schoolCalendarId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    SchoolCalendar.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'SchoolCalendar Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/schoolCalendars/' + id
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

// delete SchoolCalendar
exports.Delete_SchoolCalendar = (req, res, next) => {
    const id = req.params.schoolCalendarId
    SchoolCalendar.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'SchoolCalendar deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/schoolCalendars/',
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

//get specific SchoolCalendar by school
exports.Get_Specific_SchoolCalendar = (req, res, next) => {
    const id = req.params.schoolCalendarId;
    SchoolCalendar.findById(id)
        .select('_id name school schoolYear seances')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    SchoolCalendar: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_SchoolCalendar => URL_UNDER',
                        url: 'http://localhost:4000/schoolCalendares'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for SchoolCalendarId' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

//get specific SchoolCalendar by school
exports.Get_Specific_SchoolCalendar_By_School = (req, res, next) => {
    const school = req.params.school;
    SchoolCalendar.findOne({ school: school })
        .select('_id name school schoolYear seances')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    SchoolCalendar: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_SchoolCalendar => URL_UNDER',
                        url: 'http://localhost:4000/schoolCalendars'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for schoolId' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

//get specific SchoolCalendar by schoolYear and school
exports.Get_Specific_SchoolCalendar_By_School_And_SchoolYear = (req, res, next) => {
    const school = req.params.school;
    const schoolY = req.params.schoolYear;
    SchoolCalendar.find({ school: school, schoolYear: schoolY })
        .select('_id name school schoolYear seances')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    SchoolCalendar: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_SchoolCalendar => URL_UNDER',
                        url: 'http://localhost:4000/schoolCalendars'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for SchoolCalendarId' });
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
