const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    // userId: {type: String, required: true},
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    products: [
        {
            name: { type: String, required: true },
            description: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            image: { type: String, required: false },
        }
    ],
    amount: { type: String, required: true },
    status: { type: String, required: true },
    address: {
        _id: false,
        userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Ref to user if necessary
        name: { type: String, required: true },
        lastname: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        landmark: { type: String },
        pincode: { type: Number, required: true },
        phone: { type: Number, required: true }
    },
}, { timestamps: true });
mongoose.models = {}
export default mongoose.model('Order', OrderSchema);