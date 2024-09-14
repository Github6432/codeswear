import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    let products = await Product.find();
    let tshirts = {};
    for (let item of products) {
        // console.log('ok11', tshirts);
        if (item.title in tshirts) {
          // Ensure 'color' is an array before using .push()
          if (Array.isArray(tshirts[item.title].color) && item.availableQty > 0) {
            if (!tshirts[item.title].color.includes(item.color)) {
              tshirts[item.title].color.push(item.color);
            }
          }
          // Ensure 'size' is an array before using .push()
          if (Array.isArray(tshirts[item.title].size) && item.availableQty > 0) {
            if (!tshirts[item.title].size.includes(item.size)) {
              tshirts[item.title].size.push(item.size);
            }
          }
        } else {
          // Initialize tshirt entry
          tshirts[item.title] = JSON.parse(JSON.stringify(item));
          if (item.availableQty > 0) {
            // Ensure colors and sizes are arrays1
            tshirts[item.title].color = [item.color];
            tshirts[item.title].size = [item.size];
          }
        }
      }
    res.status(200).json({ tshirts });
}

export default connectDb(handler);