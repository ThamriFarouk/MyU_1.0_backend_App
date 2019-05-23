const mongoose = require('mongoose');
const StudentInternship = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/models/studentModels/studentInternship');

// add Internshipe
exports.Add_StudentInternship = (req, res, next) => {
    const studentInternship = new StudentInternship({
        _id: new mongoose.Types.ObjectId(),
        studentId: req.body.studentId,
        internshipType: req.body.internshipType,
        internshipNature: req.body.internshipNature,
        organisation: req.body.organisation,
        students: req.body.students,
        internshipTerritory: req.body.internshipTerritory,
        published: req.body.published,
        title: req.body.title,
        professors: req.body.professors,
        schoolYear: req.body.schoolYear,
        meetings: req.body.meetings,
        internshipUnit: req.body.internshipUnit,
        startDate: req.body.startDate,
        supervisors: req.body.supervisors,
        status: req.body.status
    });
    studentInternship
        .save()
        .then(Internship => {
            res.status(201).json({
                message: 'studentInternship Created Successfully!',
                createdStudentInternship: {
                    _id: Internship.id,
                    studentId: Internship.studentId,
                    internshipType: Internship.internshipType,
                    internshipNature: Internship.internshipNature,
                    organisation: Internship.organisation,
                    students: Internship.students,
                    internshipTerritory: Internship.internshipTerritory,
                    published: Internship.published,
                    title: Internship.title,
                    professors: Internship.professors,
                    schoolYear: Internship.schoolYear,
                    meetings: Internship.meetings,
                    internshipUnit: Internship.internshipUnit,
                    startDate: Internship.startDate,
                    supervisors: Internship.supervisors,
                    status: Internship.status
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/studentInternships/' + Internship._id
                }
            })
        })
        .catch(err => console.log(err));
}

// get all Internshipes
exports.Get_All_StudentInternships = (req, res, next) => {
    StudentInternship.find()
        .select('_id internshipType internshipNature organisation students internshipTernshipTerritory published title professors schoolYear meetings internshipUnpUnit startDate supervisors status')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                studentInternships: docs.map(doc => {
                    return {
                        _id: doc._id,
                        studentId: doc.studentId,
                        internshipType: doc.internshipType,
                        internshipNature: doc.internshipNature,
                        organisation: doc.organisation,
                        students: doc.students,
                        internshipTerritory: doc.internshipTerritory,
                        published: doc.published,
                        title: doc.title,
                        professors: doc.professors,
                        schoolYear: doc.schoolYear,
                        meetings: doc.meetings,
                        internshipUnit: doc.internshipUnit,
                        startDate: doc.startDate,
                        supervisors: doc.supervisors,
                        status: doc.status,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/studentInternships/' + doc._id
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

//get specific Internship
exports.Get_Specific_StudentInternship = (req, res, next) => {
    const id = req.params.studentInternshipId;
    StudentInternship.findById(id)
        .select('_id internshipType internshipNature organisation students internshipTernshipTerritory published title professors schoolYear meetings internshipUnpUnit startDate supervisors status')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    studentInternships: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_studentInternships => URL_UNDER',
                        url: 'http://localhost:4000/studentInternships/'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for studentInternship id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

// update Internship
exports.Update_StudentInternship = (req, res, next) => {
    const id = req.params.studentInternshipId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    StudentInternship.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(Internship => {
            console.log(Internship);
            res.status(200).json({
                message: 'studentInternship Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/studentInternships/' + id
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

// delete Internship
exports.Delete_StudentInternship = (req, res, next) => {
    const id = req.params.studentInternshipId
    StudentInternship.deleteOne({ _id: id })
        .exec()
        .then(Internship => {
            res.status(200).json({
                message: 'studentInternship deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/studentInternships/',
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

// get studentInternship by student
exports.Get_StudentInternship_By_Student = (req, res, next) => {
    const id = req.params.studentId;
    StudentInternship.find({ studentId: id })
        .select('_id internshipType internshipNature organisation students internshipTernshipTerritory published title professors schoolYear meetings internshipUnpUnit startDate supervisors status')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    studentId: id,
                    studentInternships: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_studentInternships => URL_UNDER',
                        url: 'http://localhost:4000/studentInternships/'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for studentInternship id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}
