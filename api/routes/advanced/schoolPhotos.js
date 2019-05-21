const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/middleware/check-auth');
const schoolPhotosController = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/controllers/advanced/schoolPhotos');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/galerie');
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
    fileFilter: fileFilter
});

router.post('/', upload.single('path'), schoolPhotosController.Add_schoolPhoto);
router.get('/', schoolPhotosController.Get_All_schoolPhotos);
router.get('/:schoolPhotoId', schoolPhotosController.Get_Specific_schoolPhoto);
router.patch('/:schoolPhotoId', schoolPhotosController.Update_schoolPhoto);
router.delete('/:schoolPhotoId', schoolPhotosController.Delete_schoolPhoto);
// router.get('/byStudent/:studentId', schoolPhotosController.Get_schoolPhoto_By_Student);

module.exports = router;