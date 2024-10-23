// pages/api/updateOrderStatus.js
import Order from "@/models/Order"; // Adjust the import based on your model's location
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    await connectDb();

    if (req.method === 'PATCH') {
        const { id, status } = req.body;

        try {
            const order = await Order.findByIdAndUpdate(id, { orderStatus: status }, { new: true });

            if (!order) {
                return res.status(404).json({ error: "Order not found" });
            }
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ error: "An error occurred while updating the order status", details: error.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
};

export default handler;
