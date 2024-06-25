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

    // Add delete order route
    router.delete('/order/:id', async (req, res, next) => {
        try {
            const orderId = req.params.id;
            await orderController.deleteOrder(orderId);
            res.status(200).json({ message: 'Order deleted successfully' });
        } catch (err) {
            res.status(401).json({ message: err.message });
        }
    });

    router.put('/orders/:id/status', async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;
    
        try {
            const result = await orderController.updateOrderStatus(id, status);
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    return router;
};

module.exports = orderRouter;
