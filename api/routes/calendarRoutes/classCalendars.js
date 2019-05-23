const express = require('express');
const router = express.Router();
const checkAuth = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/middleware/check-auth');
const classCalendarsController = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/controllers/calendarControllers/classCalendars');

router.post('/', classCalendarsController.Add_ClassCalendar);
router.get('/', classCalendarsController.Get_All_ClassCalendars);
router.get('/:classCalendarId', classCalendarsController.Get_Specific_ClassCalendar);
router.patch('/:classCalendarId', classCalendarsController.Update_ClassCalendar);
router.delete('/:classCalendarId', classCalendarsController.Delete_ClassCalendar);
router.get('/byClass/:classId', classCalendarsController.Get_Specific_ClassCalendar_By_Class);
router.get('/byClass&SchoolYear/:classId/:schoolYear', classCalendarsController.Get_Specific_ClassCalendar_By_Class_And_SchoolYear);


module.exports = router;