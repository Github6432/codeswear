import Order from "@/models/Order";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { id } = req.body;
        try {
            const order = await Order.findById(id);
            if (!order) {
                return { success: false, error: 'Your Order is not Placed' };
            }
            order.status = 'paid';
            await order.save();
            res.status(200).json({ message: 'Your Order Placed Successfully', success: true, order });
        } catch (error) {
            console.error('Error saving order:', error);
            res.status(500).json({ error: 'Unable to save order' });
        }
    }
}
