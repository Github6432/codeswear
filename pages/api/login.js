import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        
        try {
            const user = await User.findOne({ email });
            console.log(user)
            if (user.email === email && user.password === password) {
                res.status(200).json({ message: 'You are logged IN', success: true, user });
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
