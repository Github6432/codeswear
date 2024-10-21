import Address from "@/models/Address";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    const {userid} = req.body;
  if (req.method === 'POST') {
    try {
        let address = await Address.findById({ userid }); // Find address based on the userId
      if (!address) {
        return res.status(404).json({ success: false, message: 'No address found for this user' });
      }
      res.status(200).json({ success: true, address });
    } catch (error) {
      console.error('Error fetching address:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  } else {
    res.status(400).json({ success: false, message: 'Method not allowed' });
  }
};

export default connectDb(handler);
