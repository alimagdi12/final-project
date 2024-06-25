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

    const express = require('express');
    const router = express.Router();
    const OrderController = require('../../controllers/orders/Orders.controller');
    
    const orderController = new OrderController();
    
    router.put('/:orderId/status', async (req, res) => {
        try {
            const orderId = req.params.orderId;
            const newStatus = req.body.status;
    
            const updatedOrder = await orderController.updateOrderStatus(orderId, newStatus);
    
            res.status(200).json(updatedOrder);
        } catch (error) {
            console.error("Failed to update order status:", error);
            res.status(500).json({ message: "Failed to update order status" });
        }
    });
    
    module.exports = router;
    

    return router;
};

module.exports = orderRouter;
