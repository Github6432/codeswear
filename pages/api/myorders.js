import Order from "../../models/Order";
import connectDb from '../../middleware/mongoose';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    try {
        const token = req.body.token;
        const data = jwt.verify(token, process.env.JWT_SECRET);
        let orders = await Order.find({ 'address.userid': data.userid });
        res.status(200).json({ orders });
    } catch (error) {
        console.error("Error in API handler:", error);
        res.status(400).json({ error: "Invalid token or request failed" });
    }
}

export default connectDb(handler);
