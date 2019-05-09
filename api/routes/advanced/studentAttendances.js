const express = require('express');
const router = express.Router();
const checkAuth = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/middleware/check-auth');
const studentAttendancesController = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/controllers/advanced/studentAttendances');

router.post('/', studentAttendancesController.Add_StudentAttendance);
router.get('/', studentAttendancesController.Get_All_StudentAttendances);
router.get('/:studentAttendanceId', studentAttendancesController.Get_Specific_StudentAttendance);
router.patch('/:studentAttendanceId', studentAttendancesController.Update_StudentAttendance);
router.delete('/:studentAttendanceId', studentAttendancesController.Delete_StudentAttendance);
router.get('/byStudent/:studentId', studentAttendancesController.Get_StudentAttendance_By_Student);

module.exports = router;