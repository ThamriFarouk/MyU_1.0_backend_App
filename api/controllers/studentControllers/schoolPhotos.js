const mongoose = require('mongoose');
const SchoolPhoto = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/models/studentModels/schoolPhoto');

// add schoolPhoto
exports.Add_schoolPhoto = (req, res, next) => {
    const D = new Date;
    const hour = D.getHours().toString();
    const minute = D.getMinutes().toString();
    const day = D.getDate().toString();
    const month = D.getMonth().toString();
    const year = D.getFullYear().toString();
    const time = hour + ':' + minute;
    const date = day + '/' + month + '/' + year;

    const schoolPhoto = new SchoolPhoto({
        _id: new mongoose.Types.ObjectId(),
        path: req.file.path,
        caption: req.body.caption,
        description: req.body.description,
        date: date,
        time: time
    });
    schoolPhoto
        .save()
        .then(Photo => {
            res.status(201).json({
                message: 'schoolPhoto Created Successfully!',
                createdschoolPhoto: {
                    _id: Photo.id,
                    path: Photo.path,
                    caption: Photo.caption,
                    description: Photo.description,
                    date: Photo.date,
                    time: Photo.time
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/schoolPhotos/' + Photo._id
                }
            })
        })
        .catch(err => console.log(err));
}

// get all schoolPhotos
exports.Get_All_schoolPhotos = (req, res, next) => {
    SchoolPhoto.find()
        .select('_id path caption description date time')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                schoolPhotos: docs.map(doc => {
                    return {
                        _id: doc._id,
                        path: doc.path,
                        caption: doc.caption,
                        description: doc.description,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/schoolPhotos/' + doc._id
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

//get specific schoolPhoto
exports.Get_Specific_schoolPhoto = (req, res, next) => {
    const id = req.params.schoolPhotoId;
    SchoolPhoto.findById(id)
        .select('_id path caption description date time')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    schoolPhotos: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_schoolPhotos => URL_UNDER',
                        url: 'http://localhost:4000/schoolPhotos/'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for schoolPhoto id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

// update schoolPhoto
exports.Update_schoolPhoto = (req, res, next) => {
    const id = req.params.schoolPhotoId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    SchoolPhoto.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(Attendance => {
            console.log(Attendance);
            res.status(200).json({
                message: 'schoolPhoto Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/schoolPhotos/' + id
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

// delete schoolPhoto
exports.Delete_schoolPhoto = (req, res, next) => {
    const id = req.params.schoolPhotoId
    SchoolPhoto.deleteOne({ _id: id })
        .exec()
        .then(Photo => {
            res.status(200).json({
                message: 'schoolPhoto deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/schoolPhotos/',
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

// get schoolPhoto by student
// exports.Get_schoolPhoto_By_Student = (req, res, next) => {
//     const id = req.params.studentId;
//     schoolPhoto.find({ studentId: id })
//         .select('_id path caption description')
//         .exec()
//         .then(doc => {
//             console.log('From DataBase:', doc);
//             if (doc) {
//                 res.status(200).json({
//                     studentId: id,
//                     schoolPhotos: doc,
//                     request: {
//                         type: 'GET',
//                         description: 'GET_ALL_schoolPhotos => URL_UNDER',
//                         url: 'http://localhost:4000/schoolPhotos/'
//                     }
//                 });
//             } else {
//                 res.status(404).json({ message: 'not valid entry for schoolPhoto id' });
//             }
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: err });
//         });
// }
