const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const classesController = require('../controllers/classes');

router.post('/', checkAuth, classesController.Add_Class);
router.get('/', checkAuth, classesController.Get_All_Classes);
router.get('/:classeId', checkAuth, classesController.Get_Specific_Class);
router.patch('/:classeId', checkAuth, classesController.Update_Class);
router.delete('/:classeId', checkAuth, classesController.Delete_Class);

module.exports = router;