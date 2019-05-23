const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');
const userController = require('../../controllers/commonControllers/users');

router.post('/login', userController.Login);
router.post('/signup', userController.SignUp);
router.get('/', userController.Get_All_Users);
router.get('/:userId', userController.get_Scpecific_User);
router.patch('/:userId', userController.Update_User);
router.delete('/:userId', userController.Delete_User);

module.exports = router;