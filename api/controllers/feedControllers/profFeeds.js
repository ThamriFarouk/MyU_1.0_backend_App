const mongoose = require('mongoose');
const ProfFeed = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/models/feedModels/profFeed');

// add profFeed
exports.Add_ProfFeed = (req, res, next) => {
    console.log(req.file);
    const D = new Date;
    const hour = D.getHours().toString();
    const minute = D.getMinutes().toString();
    const day = D.getDate().toString();
    const month = D.getMonth().toString();
    const year = D.getFullYear().toString();
    const time = hour + ':' + minute;
    const date = day + '/' + month + '/' + year;

    const profFeed = new ProfFeed({
        _id: new mongoose.Types.ObjectId(),
        school: req.body.school,
        department: req.body.department,
        schoolYear: req.body.schoolYear,
        title: req.body.title,
        subtitle: req.body.subtitle,
        categorie: 'prof',
        content: req.body.content,
        publisher: req.body.publisher,
        date: date,
        time: time,
        feedImage: req.file.path,
        link: req.body.link
    });
    profFeed
        .save()
        .then(profFeed => {
            res.status(201).json({
                message: 'profFeed Created Successfully!',
                createdProfFeed: {
                    _id: profFeed.id,
                    school: profFeed.school,
                    department: profFeed.department,
                    schoolYear: profFeed.schoolYear,
                    title: profFeed.title,
                    subtitle: profFeed.subtitle,
                    categorie: profFeed.categorie,
                    content: req.body.content,
                    publisher: profFeed.publisher,
                    date: profFeed.date,
                    time: profFeed.time,
                    feedImage: profFeed.feedImage,
                    link: profFeed.link
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/profFeeds/' + profFeed._id
                }
            })
        })
        .catch(err => console.log(err));
}

// get all profFeeds
exports.Get_All_ProfFeeds = (req, res, next) => {
    ProfFeed.find()
        .select('_id school department title subtitle content categorie publisher date time feedImage link schoolYear')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                profFeeds: docs.map(doc => {
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
                            url: 'http://localhost:4000/profFeeds/' + doc._id
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

//get specific profFeed
exports.Get_Specific_ProfFeed = (req, res, next) => {
    const id = req.params.profFeedId;
    ProfFeed.findById(id)
        .select('_id school department title subtitle content categorie publisher date time feedImage link schoolYear')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    profFeeds: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_ProfFeeds => URL_UNDER',
                        url: 'http://localhost:4000/profFeeds/'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for profFeed id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

// update profFeed
exports.Update_ProfFeed = (req, res, next) => {
    const id = req.params.profFeedId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    profFeed.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(profFeed => {
            console.log(profFeed);
            res.status(200).json({
                message: 'profFeed Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/profFeeds/' + id
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

// delete profFeed
exports.Delete_ProfFeed = (req, res, next) => {
    const id = req.params.profFeedId
    ProfFeed.deleteOne({ _id: id })
        .exec()
        .then(profFeed => {
            res.status(200).json({
                message: 'profFeed deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/profFeeds/',
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

// get profFeed by department & schoolYear
exports.Get_ProfFeed_By_Department = (req, res, next) => {
    const dep = req.params.department;
    const schoolY = req.params.schoolYear;
    ProfFeed.find({ department: dep, schoolYear: schoolY })
        .select('_id school department title subtitle content categorie publisher date time feedImage link schoolYear')
        .exec()
        .then(doc => {
            console.log('From DataBase:', doc);
            if (doc) {
                res.status(200).json({
                    department: dep,
                    profFeeds: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_ProfFeeds => URL_UNDER',
                        url: 'http://localhost:4000/profFeeds/'
                    }
                });
            } else {
                res.status(404).json({ message: 'not valid entry for profFeed id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}
