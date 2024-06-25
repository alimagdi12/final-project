const express = require('express');
const router = express.Router();

const orderRouter = (orderController) => {
    router.post('/create-order', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const order = await orderController.createOrder(token);
            res.status(201).json(order);
        } catch (err) {
            res.status(401).json({ message: err.message });
        }
    });

    router.get('/order/:id', async (req, res, next) => {
        try {
            const orderId = req.params.id;
            const order = await orderController.getOrder(orderId);
            res.status(200).json(order);
        } catch (err) {
            res.status(401).json({ message: err.message });
        }
    });
    router.get('/all-orders', async (req, res, next) => {
        try {
            const orders = await orderController.getAllOrders();
            res.status(200).json(orders);
        } catch (err) {
            res.status(401).json({ message: err.message });
        }
    });
    router.get('/user-orders', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const orders = await orderController.getUserOrders(token);
            res.status(200).json(orders);
        } catch (err) {
            res.status(401).json({ message: err.message });
        }
    });

    return router;
};

module.exports = orderRouter;
