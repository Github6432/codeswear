import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { name, email, password, repassword } = req.body
        try {
            console.log(req.body);
            if (password === repassword) {
                const user = new User({ name, email, password: CryptoJS.AES.encrypt(req.body.password, 'jmt8077').toString() });
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
