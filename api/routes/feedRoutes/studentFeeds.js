const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/middleware/check-auth');
const studentFeedsController = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/controllers/feedControllers/studentFeeds');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/feeds/studentFeeds');
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

router.post('/', upload.single('feedImage'), studentFeedsController.Add_StudentFeed);
router.get('/', studentFeedsController.Get_All_StudentFeeds);
router.get('/:studentFeedId', studentFeedsController.Get_Specific_StudentFeed);
router.patch('/:studentFeedId', studentFeedsController.Update_StudentFeed);
router.delete('/:studentFeedId', studentFeedsController.Delete_StudentFeed);
router.get('/byDepartment&SchoolYear/:department/:schoolYear', studentFeedsController.Get_StudentFeed_By_Department);

module.exports = router;