const mongoose = require('mongoose');
const StudentActu = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/models/studentModels/studentActu');

// add studentActu
exports.Add_StudentActu = (req, res, next) => {
    const D = new Date;
    const H = D.getHours().toString();
    const M = D.getMinutes().toString();
    const day = D.getDate().toString();
    const month = D.getMonth().toString();
    const year = D.getFullYear().toString();
    const date = day + '/' + month + '/' + year;
    const time = H + ':' + M;

    const studentActu = new StudentActu({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        subtitle: req.body.subtitle,
        categorie: req.body.categorie,
        content: req.body.content,
        publisher: req.body.publisher,
        date: date,
        time: time,
        photo: req.body.photo,
        school: req.body.school,
        department: req.body.department

    });
    studentActu
        .save()
        .then(Actu => {
            res.status(201).json({
                message: 'studentActu Created Successfully!',
                createdStudentActu: {
                    _id: Actu.id,
                    title: Actu.title,
                    subtitle: Actu.subtitle,
                    categorie: Actu.Categorie,
                    content: Actu.content,
                    publisher: Actu.publisher,
                    date: Actu.date,
                    time: Actu.time,
                    photo: Actu.photo,
                    school: Actu.school,
                    department: Actu.department
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/studentActus/' + Actu._id
                }
            })
        })
        .catch(err => console.log(err));
}

// get all studentActus
exports.Get_All_StudentActus = (req, res, next) => {
    StudentActu.find()
        .select('_id studentId subtitle categorie content publisher date time photo school department')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                studentActus: docs.map(doc => {
                    return {
                        _id: doc._id,
                        studentId: doc.studentId,
                        subtitle: doc.subtitle,
                        categorie: doc.Categorie,
                        content: doc.content,
                        publisher: doc.publisher,
                        date: doc.date,
                        time: doc.time,
                        photo: doc.photo,
                        school: doc.school,
                        department: doc.department,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/studentActus/' + doc._id
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

//get specific studentActu
exports.Get_Specific_StudentActu = (req, res, next) => {
    const id = req.params.studentActuId;
    StudentActu.findById(id)
        .select('_id studentId subtitle categorie content publisher date time photo school department')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    studentActus: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_studentActus => URL_UNDER',
                        url: 'http://localhost:4000/studentActus/'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for studentActu id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

// update studentActu
exports.Update_StudentActu = (req, res, next) => {
    const id = req.params.studentActuId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    StudentActu.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(Actu => {
            console.log(Actu);
            res.status(200).json({
                message: 'studentActu Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/studentActus/' + id
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

// delete studentActu
exports.Delete_StudentActu = (req, res, next) => {
    const id = req.params.studentActuId
    StudentActu.deleteOne({ _id: id })
        .exec()
        .then(Actu => {
            res.status(200).json({
                message: 'studentActu deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/studentActus/',
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

// get studentActu by student
// exports.Get_StudentActu_By_Student = (req, res, next) => {
//     const id = req.params.studentId;
//     StudentActu.find({ studentId: id })
//         .select('_id subtitle Categorie content')
//         .exec()
//         .then(doc => {
//             console.log('From DataBase:', doc);
//             if (doc) {
//                 res.status(200).json({
//                     studentId: id,
//                     studentActus: doc,
//                     request: {
//                         type: 'GET',
//                         description: 'GET_ALL_studentActus => URL_UNDER',
//                         url: 'http://localhost:4000/studentActus/'
//                     }
//                 });
//             } else {
//                 res.status(404).json({ message: 'not valid entry for studentActu id' });
//             }
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: err });
//         });
// }
