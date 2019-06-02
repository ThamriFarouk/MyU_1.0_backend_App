const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/middleware/check-auth');
const schoolFeedsController = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/controllers/feedControllers/schoolFeeds');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/feeds/schoolFeeds');
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

router.post('/', upload.single('feedImage'), schoolFeedsController.Add_SchoolFeed);
router.get('/', schoolFeedsController.Get_All_SchoolFeeds);
router.get('/:schoolFeedId', schoolFeedsController.Get_Specific_SchoolFeed);
router.patch('/:schoolFeedId', schoolFeedsController.Update_SchoolFeed);
router.delete('/:schoolFeedId', schoolFeedsController.Delete_SchoolFeed);
router.get('/bySchool&SchoolYear/:school/:schoolYear', schoolFeedsController.Get_SchoolFeed_By_School);


module.exports = router;