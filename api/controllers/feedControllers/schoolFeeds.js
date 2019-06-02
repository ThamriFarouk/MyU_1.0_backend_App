const mongoose = require('mongoose');
const SchoolFeed = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/models/feedModels/schoolFeed');

// add schoolFeed
exports.Add_SchoolFeed = (req, res, next) => {
    const D = new Date;
    const hour = D.getHours().toString();
    const minute = D.getMinutes().toString();
    const day = D.getDate().toString();
    const month = D.getMonth().toString();
    const year = D.getFullYear().toString();
    const time = hour + ':' + minute;
    const date = day + '/' + month + '/' + year;

    const schoolFeed = new SchoolFeed({
        _id: new mongoose.Types.ObjectId(),
        school: req.body.school,
        schoolYear: req.body.schoolYear,
        title: req.body.title,
        subtitle: req.body.subtitle,
        categorie: 'school',
        content: req.body.content,
        publisher: req.body.publisher,
        date: date,
        time: time,
        feedImage: req.file.path,
        link: req.body.link
    });
    schoolFeed
        .save()
        .then(schoolFeed => {
            res.status(201).json({
                message: 'schoolFeed Created Successfully!',
                createdschoolFeed: {
                    _id: schoolFeed.id,
                    school: schoolFeed.school,
                    schoolYear: schoolFeed.schoolYear,
                    title: schoolFeed.title,
                    subtitle: schoolFeed.subtitle,
                    categorie: schoolFeed.categorie,
                    content: req.body.content,
                    publisher: schoolFeed.publisher,
                    date: schoolFeed.date,
                    time: schoolFeed.time,
                    feedImage: schoolFeed.feedImage,
                    link: schoolFeed.link
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/schoolFeeds/' + schoolFeed._id
                }
            })
        })
        .catch(err => console.log(err));
}

// get all schoolFeeds
exports.Get_All_SchoolFeeds = (req, res, next) => {
    SchoolFeed.find()
        .select('_id school department title subtitle content categorie publisher date time feedImage link schoolYear')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                schoolFeeds: docs.map(doc => {
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
                            url: 'http://localhost:4000/schoolFeeds/' + doc._id
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

//get specific schoolFeed
exports.Get_Specific_SchoolFeed = (req, res, next) => {
    const id = req.params.schoolFeedId;
    SchoolFeed.findById(id)
        .select('_id school department title subtitle content categorie publisher date time feedImage link schoolYear')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    schoolFeeds: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_SchoolFeeds => URL_UNDER',
                        url: 'http://localhost:4000/schoolFeeds/'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for schoolFeed id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

// update schoolFeed
exports.Update_SchoolFeed = (req, res, next) => {
    const id = req.params.schoolFeedId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    SchoolFeed.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(schoolFeed => {
            console.log(schoolFeed);
            res.status(200).json({
                message: 'schoolFeed Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/schoolFeeds/' + id
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

// delete schoolFeed
exports.Delete_SchoolFeed = (req, res, next) => {
    const id = req.params.schoolFeedId
    SchoolFeed.deleteOne({ _id: id })
        .exec()
        .then(schoolFeed => {
            res.status(200).json({
                message: 'schoolFeed deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/schoolFeeds/',
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

// get schoolFeed by school & schoolYear
exports.Get_SchoolFeed_By_School = (req, res, next) => {
    const scho = req.params.school;
    const schoolY = req.params.schoolYear;
    SchoolFeed.find({ school: scho, schoolYear: schoolY })
        .select('_id school department title subtitle content categorie publisher date time feedImage link schoolYear')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    school: scho,
                    schoolFeeds: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_SchoolFeeds => URL_UNDER',
                        url: 'http://localhost:4000/schoolFeeds/'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for schoolFeed id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}
