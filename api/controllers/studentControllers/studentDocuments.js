const mongoose = require('mongoose');
const StudentDocument = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/models/studentModels/studentDocument');

// add studentDocument
exports.Add_StudentDocument = (req, res, next) => {
    const D = new Date;
    const hour = D.getHours().toString();
    const minute = D.getMinutes().toString();
    const day = D.getDate().toString();
    const month = D.getMonth().toString();
    const year = D.getFullYear().toString();
    const time = hour + ':' + minute;
    const date = day + '/' + month + '/' + year;

    const studentDocument = new StudentDocument({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        subtitle: req.body.subtitle,
        categorie: req.body.categorie,
        content: req.body.content,
        publisher: req.body.publisher,
        date: date,
        time: time,
        documentImage: req.file.path,
        link: req.body.link
    });
    studentDocument
        .save()
        .then(Document => {
            res.status(201).json({
                message: 'studentDocument Created Successfully!',
                createdStudentDocument: {
                    _id: Document.id,
                    title: Document.title,
                    subtitle: Document.subtitle,
                    categorie: Document.categorie,
                    content: req.body.content,
                    publisher: Document.publisher,
                    date: Document.date,
                    time: Document.time,
                    documentImage: Document.documentImage,
                    link: Document.link
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/studentDocuments/' + Document._id
                }
            })
        })
        .catch(err => console.log(err));
}

// get all studentDocuments
exports.Get_All_StudentDocuments = (req, res, next) => {
    StudentDocument.find()
        .select('_id title subtitle content categorie publisher date time documentImage link')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                studentDocuments: docs.map(doc => {
                    return {
                        _id: doc._id,
                        title: doc.title,
                        subtitle: doc.subtitle,
                        categorie: doc.categorie,
                        content: doc.content,
                        publisher: doc.publisher,
                        date: doc.date,
                        time: doc.time,
                        documentImage: doc.documentImage,
                        link: doc.link,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/studentDocuments/' + doc._id
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

//get specific studentDocument
exports.Get_Specific_StudentDocument = (req, res, next) => {
    const id = req.params.studentDocumentId;
    StudentDocument.findById(id)
        .select('_id title subtitle content categorie publisher date time documentImage link')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    studentDocuments: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_studentDocuments => URL_UNDER',
                        url: 'http://localhost:4000/studentDocuments/'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for studentDocument id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

// update studentDocument
exports.Update_StudentDocument = (req, res, next) => {
    const id = req.params.studentDocumentId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    StudentDocument.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(Document => {
            console.log(Document);
            res.status(200).json({
                message: 'studentDocument Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/studentDocuments/' + id
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

// delete studentDocument
exports.Delete_StudentDocument = (req, res, next) => {
    const id = req.params.studentDocumentId
    StudentDocument.deleteOne({ _id: id })
        .exec()
        .then(Document => {
            res.status(200).json({
                message: 'studentDocument deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/studentDocuments/',
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

// get studentDocument by student
// exports.Get_StudentDocument_By_Student = (req, res, next) => {
//     const id = req.params.studentId;
//     StudentDocument.find({ studentId: id })
//         .select('_id title subtitle categorie')
//         .exec()
//         .then(doc => {
//             console.log('From DataBase:', doc);
//             if (doc) {
//                 res.status(200).json({
//                     studentId: id,
//                     studentDocuments: doc,
//                     request: {
//                         type: 'GET',
//                         description: 'GET_ALL_studentDocuments => URL_UNDER',
//                         url: 'http://localhost:4000/studentDocuments/'
//                     }
//                 });
//             } else {
//                 res.status(404).json({ message: 'not valid entry for studentDocument id' });
//             }
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: err });
//         });
// }
