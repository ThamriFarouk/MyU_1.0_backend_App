const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/middleware/check-auth');
const studentDocumentsController = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/controllers/studentControllers/studentDocuments');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/documents');
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

router.post('/', upload.single('documentImage'), studentDocumentsController.Add_StudentDocument);
router.get('/', studentDocumentsController.Get_All_StudentDocuments);
router.get('/:studentDocumentId', studentDocumentsController.Get_Specific_StudentDocument);
router.patch('/:studentDocumentId', studentDocumentsController.Update_StudentDocument);
router.delete('/:studentDocumentId', studentDocumentsController.Delete_StudentDocument);
// router.get('/byStudent/:studentId', studentDocumentsController.Get_StudentDocument_By_Student);

module.exports = router;