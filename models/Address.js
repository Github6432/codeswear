const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    name: {type: String, required: true},
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