const express = require('express');
const router = express.Router();
const checkAuth = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/middleware/check-auth');
const studentInternshipsController = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/controllers/studentControllers/studentInternships');

router.post('/', studentInternshipsController.Add_StudentInternship);
router.get('/', studentInternshipsController.Get_All_StudentInternships);
router.get('/:studentInternshipId', studentInternshipsController.Get_Specific_StudentInternship);
router.patch('/:studentInternshipId', studentInternshipsController.Update_StudentInternship);
router.delete('/:studentInternshipId', studentInternshipsController.Delete_StudentInternship);
router.get('/byStudent/:studentId', studentInternshipsController.Get_StudentInternship_By_Student);

module.exports = router;