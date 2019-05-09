const mongoose = require('mongoose');
const StudentAttendance = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/models/advanced/studentAttendance');

// add studentAttendance
exports.Add_StudentAttendance = (req, res, next) => {
    const studentAttendance = new StudentAttendance({
        _id: new mongoose.Types.ObjectId(),
        studentId: req.body.studentId,
        seances: req.body.seances,
        nbAbsences: req.body.nbAbsences,
        nbAbsencesByCourse: req.body.nbAbsencesByCourse
    });
    studentAttendance
        .save()
        .then(Attendance => {
            res.status(201).json({
                message: 'studentAttendance Created Successfully!',
                createdStudentAttendance: {
                    _id: Attendance.id,
                    studentId: Attendance.studentId,
                    seances: Attendance.seances,
                    nbAbsences: Attendance.nbAbsences,
                    nbAbsencesByCourse: Attendance.nbAbsencesByCourse
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/studentAttendances/' + Attendance._id
                }
            })
        })
        .catch(err => console.log(err));
}

// get all studentAttendances
exports.Get_All_StudentAttendances = (req, res, next) => {
    StudentAttendance.find()
        .select('_id studentId seances nbAbsences nbAbsencesByCourse')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                studentAttendances: docs.map(doc => {
                    return {
                        _id: doc._id,
                        studentId: doc.studentId,
                        seances: doc.seances,
                        nbAbsences: doc.nbAbsences,
                        nbAbsencesByCourse: doc.nbAbsencesByCourse,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/studentAttendances/' + doc._id
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

//get specific studentAttendance
exports.Get_Specific_StudentAttendance = (req, res, next) => {
    const id = req.params.studentAttendanceId;
    StudentAttendance.findById(id)
        .select('_id studentId seances nbAbsences nbAbsencesByCourse')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    studentAttendances: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_studentAttendances => URL_UNDER',
                        url: 'http://localhost:4000/studentAttendances/'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for studentAttendance id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

// update studentAttendance
exports.Update_StudentAttendance = (req, res, next) => {
    const id = req.params.studentAttendanceId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    StudentAttendance.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(Attendance => {
            console.log(Attendance);
            res.status(200).json({
                message: 'studentAttendance Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/studentAttendances/' + id
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

// delete studentAttendance
exports.Delete_StudentAttendance = (req, res, next) => {
    const id = req.params.studentAttendanceId
    StudentAttendance.deleteOne({ _id: id })
        .exec()
        .then(Attendance => {
            res.status(200).json({
                message: 'studentAttendance deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/studentAttendances/',
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

// get studentAttendance by student
exports.Get_StudentAttendance_By_Student = (req, res, next) => {
    const id = req.params.studentId;
    StudentAttendance.find({ studentId: id })
        .select('_id seances nbAbsences nbAbsencesByCourse')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    studentId: id,
                    studentAttendances: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_studentAttendances => URL_UNDER',
                        url: 'http://localhost:4000/studentAttendances/'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for studentAttendance id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}
