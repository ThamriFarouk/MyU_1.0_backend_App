const mongoose = require('mongoose');
const ClassFeed = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/models/feedModels/classFeed');

// add classFeed
exports.Add_ClassFeed = (req, res, next) => {
    const D = new Date;
    const hour = D.getHours().toString();
    const minute = D.getMinutes().toString();
    const day = D.getDate().toString();
    const month = D.getMonth().toString();
    const year = D.getFullYear().toString();
    const time = hour + ':' + minute;
    const date = day + '/' + month + '/' + year;

    const classFeed = new ClassFeed({
        _id: new mongoose.Types.ObjectId(),
        class: req.body.class,
        school: req.body.school,
        department: req.body.department,
        schoolYear: req.body.schoolYear,
        title: req.body.title,
        subtitle: req.body.subtitle,
        categorie: 'class',
        content: req.body.content,
        publisher: req.body.publisher,
        date: date,
        time: time,
        feedImage: req.file.path,
        link: req.body.link
    });
    classFeed
        .save()
        .then(ClassFeed => {
            res.status(201).json({
                message: 'classFeed Created Successfully!',
                createdClassFeed: {
                    _id: ClassFeed._id,
                    class: ClassFeed.class,
                    school: ClassFeed.school,
                    department: ClassFeed.department,
                    schoolYear: ClassFeed.schoolYear,
                    title: ClassFeed.title,
                    subtitle: ClassFeed.subtitle,
                    categorie: ClassFeed.categorie,
                    content: ClassFeed.content,
                    publisher: ClassFeed.publisher,
                    date: ClassFeed.date,
                    time: ClassFeed.time,
                    feedImage: ClassFeed.feedImage,
                    link: ClassFeed.link
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/classFeeds/' + ClassFeed._id
                }
            })
        })
        .catch(err => console.log(err));
}

// get all classFeeds
exports.Get_All_ClassFeeds = (req, res, next) => {
    ClassFeed.find()
        .select('_id class school department title subtitle content categorie publisher date time feedImage link schoolYear')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                classFeeds: docs.map(doc => {
                    return {
                        _id: doc._id,
                        class: doc.class,
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
                            url: 'http://localhost:4000/classFeeds/' + doc._id
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

//get specific classFeed
exports.Get_Specific_ClassFeed = (req, res, next) => {
    const id = req.params.classFeedId;
    ClassFeed.findById(id)
        .select('_id class school department title subtitle content categorie publisher date time feedImage link schoolYear')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    classFeeds: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_classFeeds => URL_UNDER',
                        url: 'http://localhost:4000/classFeeds/'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for classFeed id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

// update classFeed
exports.Update_ClassFeed = (req, res, next) => {
    const id = req.params.classFeedId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    ClassFeed.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(ClassFeed => {
            console.log(ClassFeed);
            res.status(200).json({
                message: 'classFeed Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/classFeeds/' + id
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

// delete classFeed
exports.Delete_ClassFeed = (req, res, next) => {
    const id = req.params.classFeedId
    ClassFeed.deleteOne({ _id: id })
        .exec()
        .then(ClassFeed => {
            res.status(200).json({
                message: 'classFeed deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/classFeeds/',
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

// get classFeed by class & schoolYear
exports.Get_ClassFeed_By_Class = (req, res, next) => {
    const id = req.params.classId;
    const schoolY = req.params.schoolYear;
    ClassFeed.find({ class: id, schoolYear: schoolY })
        .select('_id class school department title subtitle content categorie publisher date time feedImage link schoolYear')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    classId: id,
                    classFeeds: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_classFeeds => URL_UNDER',
                        url: 'http://localhost:4000/classFeeds/'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for classFeed id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}
