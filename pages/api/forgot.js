import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { phone, password, repassword } = req.body;
        
        try {
            const user = await User.findOne({ phone });

            // Check if phone matches
            if (!user) {
                return res.status(400).json({ message: 'Invalid Credentials, Please Enter Valid Credentials', success: false });
            }

            // Check if password and repassword match
            if (password !== repassword) {
                return res.status(400).json({ message: 'Your Password & Confirm Password do not match', success: false });
            }

            // Encrypt new password and save
            user.password = CryptoJS.AES.encrypt(password, process.env.AES_SECRET_KEY).toString();
            await user.save();

            return res.status(200).json({ message: 'Your Password Changed Successfully!', success: true });

        } catch (err) {
            return res.status(500).json({ message: 'Password change failed, Please try again!', success: false, err });
        }
    } else {
        return res.status(500).json({ message: 'Internal Server Error. Please try again later.', success: false });
    }
};

export default connectDb(handler);
