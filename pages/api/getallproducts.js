import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
        let products = await Product.find({ }); // Find products based on the userId
      if (!products) {
        return res.status(404).json({ success: false, message: 'No products found for this user' });
      }
      res.status(200).json({ success: true, products });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  } else {
    res.status(400).json({ success: false, message: 'Method not allowed' });
  }
};

export default connectDb(handler);
