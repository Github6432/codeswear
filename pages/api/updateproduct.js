import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    // console.log('Request body:', req.body);

    if (req.method === 'POST') {
        try {
            let p = await Product.findByIdAndUpdate(req.body._id, req.body);
            await p.save();
            // console.log(`Saved product: ${p.title}`);
            res.status(200).json({ message: "Products updated successfully" });
        } catch (error) {
            console.error('Error saving products:', error);
            res.status(500).json({ error: "An error occurred while saving the products", details: error.message });
        }
    } else {
        res.status(400).json({ error: "This method is not allowed" });
    }
};

export default connectDb(handler);
