import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');



const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { phone, password } = req.body;
        try {
            const user = await User.findOne({ phone });
            if (!user) {
                res.status(400).json({ message: 'Please Enter Valid Credentials', success: false });
            }
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET_KEY);
            let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
            if (user.phone == phone && decryptedPass === password) {
                const token = jwt.sign({ phone: user.phone, userid:user._id, }, 'JMTSecret', { expiresIn: '1d' });
                res.status(200).json({ message: 'You are logged IN', success: true, token });
            } else {
                res.status(400).json({ message: 'Invalid Credentials, Please Enter Valid Credentials ', success: false });
            }
        } catch (err) {
            res.status(400).json({ message: 'Login Failed, Please try again!', success: false, err });
        }
    } else {
        res.status(500).json({ message: 'Internal Server Error. Please try again later.', success: false });
    }
};

export default connectDb(handler);
