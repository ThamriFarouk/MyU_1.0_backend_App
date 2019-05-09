const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const OrdersController = require('../controllers/orders');

router.get('/', OrdersController.Orders_get_all);
router.post('/', OrdersController.Add_Order);
router.get('/:orderId', OrdersController.Get_Specific_Order);
router.patch('/:orderId', OrdersController.Update_Specific_Order);
router.delete('/:orderId', OrdersController.Delete_Specific_Order);

module.exports = router;