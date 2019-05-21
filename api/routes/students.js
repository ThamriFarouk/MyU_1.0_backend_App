const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const studentController = require('../controllers/students');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/profile');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post('/', studentController.Add_Student);
router.get('/', studentController.get_All_Students);
router.get('/:studentId', studentController.get_Specific_Student);
router.patch('/:studentId', studentController.Update_Student);
router.delete('/:studentId', studentController.Delete_Student);
router.get('/byUser/:userId', studentController.get_Student_By_User);


module.exports = router;