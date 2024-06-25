class OrderController {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }

    async createOrder(token) {
        try {
            const order = await this.orderRepository.createOrder(token);
            return { message: 'Order created successfully', order };
        } catch (err) {
            console.error(err);
            return { message: err.message };
        }
    }

    async getOrder(orderId) {
        try {
            const order = await this.orderRepository.getOrder(orderId);
            return { message: 'Order fetched successfully', order };
        } catch (err) {
            console.error(err);
            return { message: err.message };
        }
    }

    async getAllOrders() {
        try {
            const orders = await this.orderRepository.getAllOrders();
            return { message: 'All orders fetched successfully', orders };
        } catch (err) {
            console.error(err);
            return { message: err.message };
        }
    }

    async getUserOrders(token) {
        try {
            const orders = await this.orderRepository.getUserOrders(token);
            return { message: 'User orders fetched successfully', orders };
        } catch (err) {
            console.error(err);
            return { message: err.message };
        }
    }

    async deleteOrder(orderId) {
        try {
            const deletedOrder = await this.orderRepository.deleteOrder(orderId);
            return { message: 'Order deleted successfully', deletedOrder };
        } catch (err) {
            console.error(err);
            return { message: err.message };
        }
    }

    // async updateOrderStatus(orderId, status) {
    //     try {
    //         const updatedOrder = await this.orderRepository.updateOrderStatus(orderId, status);
    //         return { message: 'Order status updated successfully', updatedOrder };
    //     } catch (err) {
    //         console.error(err);
    //         return { message: err.message };
    //     }
    // }

        async updateOrderStatus(orderId, newStatus) {
            try {
                const order = await Order.findByIdAndUpdate(orderId, { status: newStatus }, { new: true });
                return order;
            } catch (error) {
                console.error("Error updating order status:", error);
                throw new Error("Failed to update order status");
            }
        }
}

module.exports = OrderController;
