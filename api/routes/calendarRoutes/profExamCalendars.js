const express = require('express');
const router = express.Router();
const checkAuth = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/middleware/check-auth');
const profExamCalendarsController = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/controllers/calendarControllers/profExamCalendars');

router.post('/', profExamCalendarsController.Add_ProfExamCalendar);
router.get('/', profExamCalendarsController.Get_All_ProfExamCalendars);
router.get('/:ProfExamCalendarId', profExamCalendarsController.Get_Specific_ProfExamCalendar);
router.patch('/:ProfExamCalendarId', profExamCalendarsController.Update_ProfExamCalendar);
router.delete('/:ProfExamCalendarId', profExamCalendarsController.Delete_ProfExamCalendar);
router.get('/byProf/:profId', profExamCalendarsController.Get_Specific_ProfExamCalendar_By_Prof);
router.get('/byProf&SchoolYear/:profId/:schoolYear', profExamCalendarsController.Get_Specific_ProfExamCalendar_By_Prof_And_SchoolYear);


module.exports = router;