const express = require('express');
const router = express.Router();
const checkAuth = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/middleware/check-auth');
const ExamCalendarsController = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/controllers/calendarControllers/ExamCalendars');

router.post('/', ExamCalendarsController.Add_ExamCalendar);
router.get('/', ExamCalendarsController.Get_All_ExamCalendars);
router.get('/:examCalendarId', ExamCalendarsController.Get_Specific_ExamCalendar);
router.patch('/:examCalendarId', ExamCalendarsController.Update_ExamCalendar);
router.delete('/:examCalendarId', ExamCalendarsController.Delete_ExamCalendar);
router.get('/byClass/:classId', ExamCalendarsController.Get_Specific_ExamCalendar_By_Class);
router.get('/byClass&SchoolYear/:classId/:schoolYear', ExamCalendarsController.Get_Specific_ExamCalendar_By_Class_And_SchoolYear);


module.exports = router;