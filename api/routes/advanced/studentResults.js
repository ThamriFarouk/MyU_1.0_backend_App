const express = require('express');
const router = express.Router();
const checkAuth = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/middleware/check-auth');
const studentResultsController = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/controllers/advanced/studentResults');

router.post('/', studentResultsController.Add_StudentResult);
router.get('/', studentResultsController.Get_All_StudentResults);
router.get('/:studentResultId', studentResultsController.Get_Specific_StudentResult);
router.patch('/:studentResultId', studentResultsController.Update_StudentResult);
router.delete('/:studentResultId', studentResultsController.Delete_StudentResult);
router.get('/byStudent/:studentId', studentResultsController.Get_StudentResult_By_Student);

module.exports = router;