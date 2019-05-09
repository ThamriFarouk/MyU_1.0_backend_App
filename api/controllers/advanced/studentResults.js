const mongoose = require('mongoose');
const StudentResult = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/models/advanced/studentResult');

// add Internship
exports.Add_StudentResult = (req, res, next) => {
    const studentResult = new StudentResult({
        _id: new mongoose.Types.ObjectId(),
        studentId: req.body.studentId,
        average: req.body.average,
        classe: req.body.classe,
        decision: req.body.decision,
        avgBeforeInternship: req.body.avgBeforeInternship,
        session: req.body.session,
        schoolYear: req.body.schoolYear,
        type: req.body.type,
        mention: req.body.mention
    });
    studentResult
        .save()
        .then(result => {
            res.status(201).json({
                message: 'studentResult Created Successfully!',
                createdStudentResult: {
                    _id: result.id,
                    studentId: result.studentId,
                    average: result.average,
                    classe: result.classe,
                    decision: result.decision,
                    avgBeforeInternship: result.avgBeforeInternship,
                    session: result.session,
                    schoolYear: result.schoolYear,
                    type: result.type,
                    mention: result.mention,
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/studentResults/' + result._id
                }
            })
        })
        .catch(err => console.log(err));
}

// get all Internships
exports.Get_All_StudentResults = (req, res, next) => {
    StudentResult.find()
        .select('_id average studentId classe decision avgBeforeInternship session schoolYear type mention')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                studentResults: docs.map(doc => {
                    return {
                        _id: doc._id,
                        studentId: doc.studentId,
                        average: doc.average,
                        classe: doc.classe,
                        decision: doc.decision,
                        avgBeforeInternship: doc.avgBeforeInternship,
                        session: doc.session,
                        schoolYear: doc.schoolYear,
                        type: doc.type,
                        mention: doc.mention,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/studentResults/' + doc._id
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

//get specific studentResult
exports.Get_Specific_StudentResult = (req, res, next) => {
    const id = req.params.studentResultId;
    StudentResult.findById(id)
        .select('_id average classe decision avgBeforeInternship session schoolYear type mention')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    studentResults: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_studentResults => URL_UNDER',
                        url: 'http://localhost:4000/studentResults/'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for studentResult id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

// update studentResult
exports.Update_StudentResult = (req, res, next) => {
    const id = req.params.studentResultId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    StudentResult.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'studentResult Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/studentResults/' + id
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

// delete studentResult
exports.Delete_StudentResult = (req, res, next) => {
    const id = req.params.studentResultId
    StudentResult.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'studentResult deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/studentResults/',
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

// get student result by Student
exports.Get_StudentResult_By_Student = (req, res, next) => {
    const id = req.params.studentId;
    StudentResult.find({ studentId: id })
        .select('_id average classe decision avgBeforeInternship session schoolYear type mention')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    studentId: id,
                    studentResults: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_studentResults => URL_UNDER',
                        url: 'http://localhost:4000/studentResults/'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for studentResult id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}
