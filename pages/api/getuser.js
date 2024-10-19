import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    const {userid} = req.body;
  if (req.method === 'POST') {
    try {
        let userDetails = await User.findOne({ _id: userid }); // Find address based on the userId
      if (!userDetails) {
        return res.status(404).json({ success: false, message: 'No account details found for this user' });
      }
      res.status(200).json({ success: true, userDetails });
    } catch (error) {
      console.error('Error fetching the user:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  } else {
    res.status(400).json({ success: false, message: 'Method not allowed' });
  }
};

export default connectDb(handler);
