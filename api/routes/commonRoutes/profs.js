const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../../middleware/check-auth');
const profController = require('../../controllers/commonControllers/profs');

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

router.post('/', profController.Add_Prof);
router.get('/', profController.get_All_Profs);
router.get('/:profId', profController.get_Specific_Prof);
router.patch('/:profId', profController.Update_Prof);
router.delete('/:profId', profController.Delete_Prof);
router.get('/byUser/:userId', profController.get_Prof_By_User);


module.exports = router;