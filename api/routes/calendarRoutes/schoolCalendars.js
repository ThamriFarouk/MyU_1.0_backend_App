const express = require('express');
const router = express.Router();
const checkAuth = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/middleware/check-auth');
const schoolCalendarsController = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/controllers/calendarControllers/schoolCalendars');

router.post('/', schoolCalendarsController.Add_SchoolCalendar);
router.get('/', schoolCalendarsController.Get_All_SchoolCalendars);
router.get('/:SchoolCalendarId', schoolCalendarsController.Get_Specific_SchoolCalendar);
router.patch('/:SchoolCalendarId', schoolCalendarsController.Update_SchoolCalendar);
router.delete('/:SchoolCalendarId', schoolCalendarsController.Delete_SchoolCalendar);
router.get('/bySchool/:school', schoolCalendarsController.Get_Specific_SchoolCalendar_By_School);
router.get('/bySchool&SchoolYear/:school/:schoolYear', schoolCalendarsController.Get_Specific_SchoolCalendar_By_School_And_SchoolYear);


module.exports = router;