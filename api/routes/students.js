const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const studentController = require('../controllers/students');


router.post('/', studentController.Add_Student);
router.get('/', studentController.get_All_Students);
router.get('/:studentId', studentController.get_Specific_Student);
router.patch('/:studentId', studentController.Update_Student);
router.delete('/:studentId', studentController.Delete_Student);
router.get('/byUser/:userId', studentController.get_Student_By_User);


module.exports = router;