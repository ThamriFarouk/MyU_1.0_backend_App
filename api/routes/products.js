const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const productController = require('../controllers/products');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
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

router.get('/', checkAuth, productController.get_All_Products);
router.post('/', checkAuth, upload.single('productImage'), productController.Add_Product);
router.get('/:productId', checkAuth, productController.get_Specific_Product);
router.patch('/:productId', checkAuth, productController.Update_Product);
router.delete('/:productId', checkAuth, productController.Delete_Product);

module.exports = router;