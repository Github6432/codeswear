const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: {type: String, required: true},
    lastname: {type: String},
    email: {type: String, required: true},
    phone: {type: Number, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    country: {type: String, required: true},
    landmark: {type: String, required: true},
    pincode: {type: Number, required: true},
},{timestamps: true});
mongoose.models= {}
export default mongoose.model('Address', AddressSchema);