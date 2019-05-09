const express = require('express');
const router = express.Router();
const checkAuth = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/middleware/check-auth');
const studentEvalsController = require('/Users/HP/Documents/_SI3/PFE Universitaire/Ionic Projects/backend_App/api/controllers/advanced/studentEvals');

router.post('/', studentEvalsController.Add_StudentEval);
router.get('/', studentEvalsController.Get_All_StudentEvals);
router.get('/:studentEvalId', studentEvalsController.Get_Specific_StudentEval);
router.patch('/:studentEvalId', studentEvalsController.Update_StudentEval);
router.delete('/:studentEvalId', studentEvalsController.Delete_StudentEval);
router.get('/byStudent/:studentId', studentEvalsController.Get_StudentEval_By_Student);

module.exports = router;