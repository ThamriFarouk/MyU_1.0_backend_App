const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const userController = require('../controllers/users');

router.post('/login', checkAuth, userController.Login);
router.post('/signup', checkAuth, userController.SignUp);
router.get('/', checkAuth, userController.Get_All_Users);
router.get('/:userId', checkAuth, userController.get_Scpecific_User);
router.patch('/:userId', checkAuth, userController.Update_User);
router.delete('/:userId', checkAuth, userController.Delete_User);

module.exports = router;