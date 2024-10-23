// pages/api/orders.js
import Order from "@/models/Order"; // Adjust the import based on your model's location
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    await connectDb();

    if (req.method === 'GET') {
        try {
            const orders = await Order.find({});
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: "An error occurred while fetching orders", details: error.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
};

export default handler;
