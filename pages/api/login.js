import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            const bytes = CryptoJS.AES.decrypt(user.password, 'jmt8077');
            let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
            if (user.email === email && decryptedPass === password) {
                const token = jwt.sign({ email: user.email, name:user.name }, 'JMTSecret', { expiresIn: '1d' });
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
