import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    // console.log('Request body:', req.body);

    if (req.method === 'POST') {
        try {
            for (let i = 0; i < req.body.length; i++) {
                let p = new Product({
                    title: req.body[i].title,
                    slug: req.body[i].slug,
                    desc: req.body[i].desc,
                    img: req.body[i].img,
                    category: req.body[i].category,
                    size: req.body[i].size,
                    color: req.body[i].color,
                    price: req.body[i].price,
                    availableQty: req.body[i].availableQty,
                });
                await p.save();
                // console.log(`Saved product: ${p.title}`);
            }
            res.status(200).json({ message: "Products saved successfully" });
        } catch (error) {
            console.error('Error saving products:', error);
            res.status(500).json({ error: "An error occurred while saving the products", details: error.message });
        }
    } else {
        res.status(400).json({ error: "This method is not allowed" });
    }
};

export default connectDb(handler);
