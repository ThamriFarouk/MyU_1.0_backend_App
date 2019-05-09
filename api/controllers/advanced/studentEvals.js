const mongoose = require('mongoose');
const StudentEval = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/models/advanced/studentEval');

// add Add_StudentEval
exports.Add_StudentEval = (req, res, next) => {
    const studentEval = new StudentEval({
        _id: new mongoose.Types.ObjectId(),
        studentId: req.body.studentId,
        note: req.body.note,
        unit: req.body.unit,
        evalName: req.body.evalName,
        unitCoef: req.body.unitCoef,
        courseCoef: req.body.courseCoef,
        course: req.body.course,
        absent: req.body.absent,
        redoublant: req.body.redoublant
    });
    studentEval
        .save()
        .then(Eval => {
            res.status(201).json({
                message: 'studentEval Created Successfully!',
                createdStudentEval: {
                    _id: Eval.id,
                    studentId: Eval.studentId,
                    note: Eval.note,
                    unit: Eval.unit,
                    evalName: Eval.evalName,
                    unitCoef: Eval.unitCoef,
                    courseCoef: Eval.courseCoef,
                    course: Eval.course,
                    absent: Eval.absent,
                    redoublant: Eval.redoublant,
                    _id: Eval.id
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/studentEvals/' + Eval._id
                }
            })
        })
        .catch(err => console.log(err));
}

// get all Add_StudentEval
exports.Get_All_StudentEvals = (req, res, next) => {
    StudentEval.find()
        .select('_id note studentId unit evalName unitCoef courseCoef course absent redoublant')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                studentEvals: docs.map(doc => {
                    return {
                        _id: doc._id,
                        studentId: doc.studentId,
                        note: doc.note,
                        unit: doc.unit,
                        evalName: doc.evalName,
                        unitCoef: doc.unitCoef,
                        courseCoef: doc.courseCoef,
                        course: doc.course,
                        absent: doc.absent,
                        redoublant: doc.redoublant,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/studentEvals/' + doc._id
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

//get specific studentEvalId
exports.Get_Specific_StudentEval = (req, res, next) => {
    const id = req.params.studentEvalId;
    StudentEval.findById(id)
        .select('_id note unit evalName unitCoef courseCoef course absent redoublant')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    studentEvals: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_studentEvals => URL_UNDER',
                        url: 'http://localhost:4000/studentEvals/'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for studentEval id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

// update studentEvalId
exports.Update_StudentEval = (req, res, next) => {
    const id = req.params.studentEvalId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    StudentEval.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(Eval => {
            console.log(Eval);
            res.status(200).json({
                message: 'studentEval Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/studentEvals/' + id
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

// delete studentEvalId
exports.Delete_StudentEval = (req, res, next) => {
    const id = req.params.studentEvalId
    StudentEval.deleteOne({ _id: id })
        .exec()
        .then(Eval => {
            res.status(200).json({
                message: 'studentEval deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/studentEvals/',
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

//get studentEval By StudentId
exports.Get_StudentEval_By_Student = (req, res, next) => {
    const id = req.params.studentId;
    StudentEval.find({ studentId: id })
        .select('_id note unit evalName unitCoef courseCoef course absent redoublant')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    studentId: id,
                    studentEvals: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_studentEvals => URL_UNDER',
                        url: 'http://localhost:4000/studentEvals/'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for studentEval id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}
