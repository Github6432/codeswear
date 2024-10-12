import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { name, lastname, email, phone, securityquestion, answer, password, repassword } = req.body;
        try {
            if (password === repassword) {
                const user = new User({ name, lastname, email, phone, securityquestion, answer, password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET_KEY).toString() });
                await user.save();
                res.status(200).json({ massage: 'Your Account has been created!', success: true });
            } else {
                res.status(400).json({ massage: 'Re-type Password is not matched ', success: false });
            }
        } catch (err) {
            res.status(400).json({ massage: 'Sign Up Failed, Please try again!', success: false, err });
        }
    } else {
        res.status(500).json({ message: 'Internal Server Error. Please try again later.', success: false });
    }
};

export default connectDb(handler);
