const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/middleware/check-auth');
const profFeedsController = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/controllers/feedControllers/profFeeds');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/feeds/profFeeds');
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

router.post('/', upload.single('feedImage'), profFeedsController.Add_ProfFeed);
router.get('/', profFeedsController.Get_All_ProfFeeds);
router.get('/:profFeedId', profFeedsController.Get_Specific_ProfFeed);
router.patch('/:profFeedId', profFeedsController.Update_ProfFeed);
router.delete('/:profFeedId', profFeedsController.Delete_ProfFeed);
router.get('/byDepartment&SchoolYear/:department/:schoolYear', profFeedsController.Get_ProfFeed_By_Department);


module.exports = router;