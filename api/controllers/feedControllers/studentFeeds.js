const mongoose = require('mongoose');
const StudentFeed = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/models/feedModels/studentFeed');

// add studentFeed
exports.Add_StudentFeed = (req, res, next) => {
    const D = new Date;
    const hour = D.getHours().toString();
    const minute = D.getMinutes().toString();
    const day = D.getDate().toString();
    const month = D.getMonth().toString();
    const year = D.getFullYear().toString();
    const time = hour + ':' + minute;
    const date = day + '/' + month + '/' + year;

    const studentFeed = new StudentFeed({
        _id: new mongoose.Types.ObjectId(),
        school: req.body.school,
        department: req.body.department,
        schoolYear: req.body.schoolYear,
        title: req.body.title,
        subtitle: req.body.subtitle,
        categorie: 'student',
        content: req.body.content,
        publisher: req.body.publisher,
        date: date,
        time: time,
        feedImage: req.file.path,
        link: req.body.link
    });
    studentFeed
        .save()
        .then(studentFeed => {
            res.status(201).json({
                message: 'studentFeed Created Successfully!',
                createdstudentFeed: {
                    _id: studentFeed.id,
                    school: studentFeed.school,
                    department: studentFeed.department,
                    schoolYear: studentFeed.schoolYear,
                    title: studentFeed.title,
                    subtitle: studentFeed.subtitle,
                    categorie: studentFeed.categorie,
                    content: req.body.content,
                    publisher: studentFeed.publisher,
                    date: studentFeed.date,
                    time: studentFeed.time,
                    feedImage: studentFeed.feedImage,
                    link: studentFeed.link
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/studentFeeds/' + studentFeed._id
                }
            })
        })
        .catch(err => console.log(err));
}

// get all studentFeeds
exports.Get_All_StudentFeeds = (req, res, next) => {
    StudentFeed.find()
        .select('_id school department title subtitle content categorie publisher date time feedImage link schoolYear')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                studentFeeds: docs.map(doc => {
                    return {
                        _id: doc._id,
                        school: doc.school,
                        department: doc.department,
                        schoolYear: doc.schoolYear,
                        title: doc.title,
                        subtitle: doc.subtitle,
                        categorie: doc.categorie,
                        content: doc.content,
                        publisher: doc.publisher,
                        date: doc.date,
                        time: doc.time,
                        feedImage: doc.feedImage,
                        link: doc.link,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/studentFeeds/' + doc._id
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

//get specific studentFeed
exports.Get_Specific_StudentFeed = (req, res, next) => {
    const id = req.params.studentFeedId;
    StudentFeed.findById(id)
        .select('_id school department title subtitle content categorie publisher date time feedImage link schoolYear')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    studentFeeds: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_StudentFeeds => URL_UNDER',
                        url: 'http://localhost:4000/studentFeeds/'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for studentFeed id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

// update studentFeed
exports.Update_StudentFeed = (req, res, next) => {
    const id = req.params.studentFeedId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    StudentFeed.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(studentFeed => {
            console.log(studentFeed);
            res.status(200).json({
                message: 'studentFeed Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/studentFeeds/' + id
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

// delete studentFeed
exports.Delete_StudentFeed = (req, res, next) => {
    const id = req.params.studentFeedId
    StudentFeed.deleteOne({ _id: id })
        .exec()
        .then(studentFeed => {
            res.status(200).json({
                message: 'studentFeed deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/studentFeeds/',
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

// get studentFeed by department & schoolYear
exports.Get_StudentFeed_By_Department = (req, res, next) => {
    const dep = req.params.department;
    const schoolY = req.params.schoolYear;
    StudentFeed.find({ department: dep, schoolYear: schoolY })
        .select('_id school department title subtitle categorie publisher date time feedImage link schoolYear')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    department: dep,
                    studentFeeds: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_StudentFeeds => URL_UNDER',
                        url: 'http://localhost:4000/studentFeeds/'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for studentFeed id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}
