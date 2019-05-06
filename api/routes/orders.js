const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const OrdersController = require('../controllers/orders');

router.get('/', checkAuth, OrdersController.Orders_get_all);
router.post('/', checkAuth, OrdersController.Add_Order);
router.get('/:orderId', checkAuth, OrdersController.Get_Specific_Order);
router.patch('/:orderId', checkAuth, OrdersController.Update_Specific_Order);
router.delete('/:orderId', checkAuth, OrdersController.Delete_Specific_Order);

module.exports = router;