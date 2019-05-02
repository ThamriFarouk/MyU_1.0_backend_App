const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /orders'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productQuantity: req.body.productQuantity
    };
    res.status(200).json({
        message: 'Handling POST request to /orders',
        order: order
    });
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special id !',
            id: id
        });
    }
    else {
        res.status(200).json({
            message: 'You passed a random id !'
        });
    }
});

router.patch('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated order !'
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted order !'
    });
});

module.exports = router;