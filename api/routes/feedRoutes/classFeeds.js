const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/middleware/check-auth');
const classFeedsController = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/controllers/feedControllers/classFeeds');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/feeds/classFeeds');
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

router.post('/', upload.single('feedImage'), classFeedsController.Add_ClassFeed);
router.get('/', classFeedsController.Get_All_ClassFeeds);
router.get('/:classFeedId', classFeedsController.Get_Specific_ClassFeed);
router.patch('/:classFeedId', classFeedsController.Update_ClassFeed);
router.delete('/:classFeedId', classFeedsController.Delete_ClassFeed);
router.get('/byClass&SchoolYear/:classId/:schoolYear', classFeedsController.Get_ClassFeed_By_Class);


module.exports = router;