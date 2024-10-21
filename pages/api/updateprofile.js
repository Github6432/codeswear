import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { id, name, lastname, email, phone } = req.body;
        try {
            let user = await User.findOneAndUpdate(
                { _id: id },
                { $set: { name, lastname, email, phone } }, { new: true }
            );
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not Found, Some Error' });
            }
            res.status(200).json({ success: true, message: 'Successfully updated User Details', user });
        } catch (error) {
            console.error('Error updating user details:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    } else {
        // If request method is not POST
        res.status(400).json({ success: false, message: 'Method not allowed' });
    }
};

export default connectDb(handler);
