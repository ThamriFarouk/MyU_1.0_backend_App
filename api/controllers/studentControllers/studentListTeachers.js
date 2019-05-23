const mongoose = require('mongoose');
const StudentListTeacher = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/models/studentModels/studentListTeacher');

// add ListTeacher
exports.Add_StudentListTeacher = (req, res, next) => {
    const studentListTeacher = new StudentListTeacher({
        _id: new mongoose.Types.ObjectId(),
        studentId: req.body.studentId,
        classId: req.body.classId,
        professors: req.body.professors,
        className: req.body.className
    })
    studentListTeacher
        .save()
        .then(ListTeacher => {
            res.status(201).json({
                message: 'studentListTeacher Created Successfully!',
                createdStudentListTeacher: {
                    _id: ListTeacher.id,
                    studentId: ListTeacher.studentId,
                    classId: ListTeacher.classId,
                    professors: ListTeacher.professors,
                    className: ListTeacher.className
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/studentListTeachers/' + ListTeacher._id
                }
            })
        })
        .catch(err => console.log(err));
}

// get all ListTeachers
exports.Get_All_StudentListTeachers = (req, res, next) => {
    StudentListTeacher.find()
        .select('_id studentId classId professors className')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                studentListTeachers: docs.map(doc => {
                    return {
                        _id: doc._id,
                        studentId: doc.studentId,
                        classId: doc.classId,
                        professors: doc.professors,
                        className: doc.className,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/studentListTeachers/' + doc._id
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

//get specific ListTeacher
exports.Get_Specific_StudentListTeacher = (req, res, next) => {
    const id = req.params.studentListTeacherId;
    StudentListTeacher.findById(id)
        .select('_id studentId classId professors className')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    studentListTeachers: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_studentListTeachers => URL_UNDER',
                        url: 'http://localhost:4000/studentListTeachers/'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for studentListTeacher id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

// update ListTeacher
exports.Update_StudentListTeacher = (req, res, next) => {
    const id = req.params.studentListTeacherId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    StudentListTeacher.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(ListTeacher => {
            console.log(ListTeacher);
            res.status(200).json({
                message: 'studentListTeacher Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/studentListTeachers/' + id
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

// delete ListTeacher
exports.Delete_StudentListTeacher = (req, res, next) => {
    const id = req.params.studentListTeacherId
    StudentListTeacher.deleteOne({ _id: id })
        .exec()
        .then(ListTeacher => {
            res.status(200).json({
                message: 'studentListTeacher deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/studentListTeachers/',
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

// get studentListTeacher by student
exports.Get_StudentListTeacher_By_Student = (req, res, next) => {
    const id = req.params.studentId;
    StudentListTeacher.find({ studentId: id })
        .select('_id studentId classId professors className')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    studentId: id,
                    studentListTeachers: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_studentListTeachers => URL_UNDER',
                        url: 'http://localhost:4000/studentListTeachers/'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for studentListTeacher id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}
