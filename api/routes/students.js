const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const studentController = require('../controllers/students');


router.post('/', checkAuth, studentController.Add_Student);
router.get('/', checkAuth, studentController.get_All_Students);
router.get('/:studentId', checkAuth, studentController.get_Specific_Student);
router.patch('/:studentId', checkAuth, studentController.Update_Student);
router.delete('/:studentId', checkAuth, studentController.Delete_Student);

module.exports = router;