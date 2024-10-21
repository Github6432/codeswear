import Address from "@/models/Address";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { id, name, lastname, email, phone, city, state, country, pincode, landmark } = req.body;
        try {
            let address = await Address.findOneAndUpdate(
                { userid: id, useraddress: true },
                { $set: { name, lastname, email, phone, city, state, country, pincode, landmark } }, { new: true }
            );
            if (!address) {
                return res.status(404).json({ success: false, message: 'No address found for this user' });
            }
            res.status(200).json({ success: true, message: 'Successfully updated address', address });
        } catch (error) {
            console.error('Error updating address:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    } else {
        // If request method is not POST
        res.status(400).json({ success: false, message: 'Method not allowed' });
    }
};

export default connectDb(handler);
