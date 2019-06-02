const express = require('express');
const router = express.Router();
const checkAuth = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/middleware/check-auth');
const profCalendarsController = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/controllers/calendarControllers/profCalendars');

router.post('/', profCalendarsController.Add_ProfCalendar);
router.get('/', profCalendarsController.Get_All_ProfCalendars);
router.get('/:ProfCalendarId', profCalendarsController.Get_Specific_ProfCalendar);
router.patch('/:ProfCalendarId', profCalendarsController.Update_ProfCalendar);
router.delete('/:ProfCalendarId', profCalendarsController.Delete_ProfCalendar);
router.get('/byProf/:profId', profCalendarsController.Get_Specific_ProfCalendar_By_Prof);
router.get('/byProf&SchoolYear/:profId/:schoolYear', profCalendarsController.Get_Specific_ProfCalendar_By_Prof_And_SchoolYear);


module.exports = router;