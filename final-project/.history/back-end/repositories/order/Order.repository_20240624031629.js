const Order = require('../../models/order/Order.model'); // Assuming you have a Mongoose Order model

class OrderRepository {
    async createOrder(userId, items, totalAmount) {
        try {
            const order = new Order({
                userId,
                items,
                totalAmount,
                status: 'Pending' // Default status
            });

            await order.save();
            return order;
        } catch (error) {
            console.error('Error creating order:', error);
            throw new Error('Failed to create order');
        }
    }

    async updateOrderStatus(orderId, newStatus) {
        try {
            const order = await Order.findByIdAndUpdate(orderId, { status: newStatus }, { new: true });
            if (!order) {
                throw new Error('Order not found');
            }
            return order;
        } catch (error) {
            console.error('Error updating order status:', error);
            throw new Error('Failed to update order status');
        }
    }

    async deleteOrder(orderId) {
        try {
            const order = await Order.findByIdAndDelete(orderId);
            if (!order) {
                throw new Error('Order not found');
            }
            return order;
        } catch (error) {
            console.error('Error deleting order:', error);
            throw new Error('Failed to delete order');
        }
    }

    async getOrder(orderId) {
        try {
            const order = await Order.findById(orderId);
            if (!order) {
                throw new Error('Order not found');
            }
            return order;
        } catch (error) {
            console.error('Error fetching order:', error);
            throw new Error('Failed to fetch order');
        }
    }

    async getAllOrders() {
        try {
            const orders = await Order.find({});
            return orders;
        } catch (error) {
            console.error('Error fetching all orders:', error);
            throw new Error('Failed to fetch all orders');
        }
    }

    async getUserOrders(userId) {
        try {
            const orders = await Order.find({ userId });
            return orders;
        } catch (error) {
            console.error('Error fetching user orders:', error);
            throw new Error('Failed to fetch user orders');
        }
    }
}

module.exports = OrderRepository;
