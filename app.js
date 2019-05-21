const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/tutorial/routes/products');
const orderRoutes = require('./api/tutorial/routes/orders');
const userRoutes = require('./api/routes/users');
const studentRoutes = require('./api/routes/students');
const classRoutes = require('./api/routes/classes');
const studentResultRoutes = require('./api/routes/advanced/studentResults');
const studentEvalRoutes = require('./api/routes/advanced/studentEvals');
const studentAttendanceRoutes = require('./api/routes/advanced/studentAttendances');
const studentInternshipRoutes = require('./api/routes/advanced/studentInternships');
const studentListTeacherRoutes = require('./api/routes/advanced/studentListTeachers');
const studentDocumentRoutes = require('./api/routes/advanced/studentDocuments');
const schoolPhotoRoutes = require('./api/routes/advanced/schoolPhotos');
const studentActuRoutes = require('./api/routes/advanced/studentActus');




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
app.use('/uploads/actus', express.static('uploads'));
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
app.use('/studentActus', studentActuRoutes);








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