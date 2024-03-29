const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/tutorial/routes/products');
const orderRoutes = require('./api/tutorial/routes/orders');
const userRoutes = require('./api/routes/commonRoutes/users');
const studentRoutes = require('./api/routes/commonRoutes/students');
const classRoutes = require('./api/routes/commonRoutes/classes');
const studentResultRoutes = require('./api/routes/studentRoutes/studentResults');
const studentEvalRoutes = require('./api/routes/studentRoutes/studentEvals');
const studentAttendanceRoutes = require('./api/routes/studentRoutes/studentAttendances');
const studentInternshipRoutes = require('./api/routes/studentRoutes/studentInternships');
const studentListTeacherRoutes = require('./api/routes/studentRoutes/studentListTeachers');
const studentDocumentRoutes = require('./api/routes/studentRoutes/studentDocuments');
const schoolPhotoRoutes = require('./api/routes/studentRoutes/schoolPhotos');
const classCalendarRoutes = require('./api/routes/calendarRoutes/classCalendars');
const examCalendarRoutes = require('./api/routes/calendarRoutes/examCalendars');
const profExamCalendarRoutes = require('./api/routes/calendarRoutes/profExamCalendars');
const schoolCalendarRoutes = require('./api/routes/calendarRoutes/schoolCalendars');
const profCalendarRoutes = require('./api/routes/calendarRoutes/profCalendars');
const classFeedRoutes = require('./api/routes/feedRoutes/classFeeds');
const profFeedRoutes = require('./api/routes/feedRoutes/profFeeds');
const schoolFeedRoutes = require('./api/routes/feedRoutes/schoolFeeds');
const studentFeedRoutes = require('./api/routes/feedRoutes/studentFeeds');
const profRoutes = require('./api/routes/commonRoutes/profs');






mongoose.connect('mongodb+srv://Farouk:' + process.env.MONGO_ATLAS_PW + '@cluster0-l7ky7.azure.mongodb.net/test?retryWrites=true',
    {
        useNewUrlParser: true
    }
);
mongoose.Promise = global.Promise;


app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'));
app.use('/uploads/galerie', express.static('uploads'));
app.use('/uploads/documents', express.static('uploads'));
app.use('/uploads/feeds/classFeeds', express.static('uploads'));
app.use('/uploads/profile', express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);
app.use('/classes', classRoutes);
app.use('/students', studentRoutes);
app.use('/studentResults', studentResultRoutes);
app.use('/studentEvals', studentEvalRoutes);
app.use('/studentAttendances', studentAttendanceRoutes);
app.use('/studentInternships', studentInternshipRoutes);
app.use('/studentListTeachers', studentListTeacherRoutes);
app.use('/studentDocuments', studentDocumentRoutes);
app.use('/schoolPhotos', schoolPhotoRoutes);
app.use('/classCalendars', classCalendarRoutes);
app.use('/examCalendars', examCalendarRoutes);
app.use('/profExamCalendars', profExamCalendarRoutes);
app.use('/schoolCalendars', schoolCalendarRoutes);
app.use('/profCalendars', profCalendarRoutes);
app.use('/classFeeds', classFeedRoutes);
app.use('/profFeeds', profFeedRoutes);
app.use('/schoolFeeds', schoolFeedRoutes);
app.use('/studentFeeds', studentFeedRoutes);
app.use('/profs', profRoutes);



app.use((req, res, next) => {
    const error = new Error('Path Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;