const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/middleware/check-auth');
const studentActusController = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/controllers/advanced/studentActus');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/actus');
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


router.post('/', upload.single('photo'), studentActusController.Add_StudentActu);
router.get('/', studentActusController.Get_All_StudentActus);
router.get('/:studentActuId', studentActusController.Get_Specific_StudentActu);
router.patch('/:studentActuId', studentActusController.Update_StudentActu);
router.delete('/:studentActuId', studentActusController.Delete_StudentActu);
// router.get('/byStudent/:studentId', studentActusController.Get_StudentActu_By_Student);

module.exports = router;