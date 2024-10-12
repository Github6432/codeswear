import Address from "@/models/Address";
import connectDb from "@/middleware/mongoose";
import mongoose from "mongoose";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { userid, name, lastname, email, phone, city, state, country, landmark, pincode } = req.body;
        try {
            const address = new Address({ userid, name, lastname, email, phone, city, state, country, landmark, pincode });
            console.log(address)
            await address.save();
            res.status(200).json({ massage: 'New address Add Successfully !', success: true });
        } catch (err) {
            res.status(400).json({ massage: 'Address is not added, Please try again!', success: false, err });
        }
    } else {
        res.status(500).json({ message: 'Internal Server Error. Please try again later.', success: false });
    }
};

export default connectDb(handler);
