const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const classesController = require('../controllers/classes');

router.post('/', classesController.Add_Class);
router.get('/', classesController.Get_All_Classes);
router.get('/:classeId', classesController.Get_Specific_Class);
router.patch('/:classeId', classesController.Update_Class);
router.delete('/:classeId', classesController.Delete_Class);

module.exports = router;