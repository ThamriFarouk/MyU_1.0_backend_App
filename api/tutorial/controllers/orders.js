const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

//Add one order to DB
exports.Add_Order = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product not Found!'
                });
            }
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
            return order.save();
        })
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Order stored!',
                createdOrder: {
                    _id: result.id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/orders/' + result._id
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

//get all Orders from DB
exports.Orders_get_all = (req, res, next) => {
    Order.find()
        .select('product quantity _id')
        .populate('product', 'name')
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc.id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/orders/' + doc._id
                        }
                    }
                })
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

//get one specific Order from DB
exports.Get_Specific_Order = (req, res, next) => {
    Order.findById(req.params.orderId)
        .populate('product')
        .exec()
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: 'Order not found!'
                })
            }
            console.log(order);
            res.status(200).json({
                order: order,
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/orders/'
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

//update one specific Order from DB
exports.Update_Specific_Order = (req, res, next) => {
    res.status(200).json({
        message: 'Updated order !'
    });
}

//delete one specific Order from DB
exports.Delete_Specific_Order = (req, res, next) => {
    Order.deleteOne({ _id: req.params.orderId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Order deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/orders',
                    body: {
                        productId: 'ID',
                        quantity: 'Number'
                    }
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}