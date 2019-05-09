const express = require('express');
const router = express.Router();
const checkAuth = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/middleware/check-auth');
const studentListTeachersController = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/controllers/advanced/studentListTeachers');

router.post('/', studentListTeachersController.Add_StudentListTeacher);
router.get('/', studentListTeachersController.Get_All_StudentListTeachers);
router.get('/:studentListTeacherId', studentListTeachersController.Get_Specific_StudentListTeacher);
router.patch('/:studentListTeacherId', studentListTeachersController.Update_StudentListTeacher);
router.delete('/:studentListTeacherId', studentListTeachersController.Delete_StudentListTeacher);
router.get('/byStudent/:studentId', studentListTeachersController.Get_StudentListTeacher_By_Student);

module.exports = router;