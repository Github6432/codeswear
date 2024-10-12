const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    lastname: {type: String},
    email: {type: String, required: true},
    phone: {type: Number, required: true, unique: true},
    securityquestion: {type: String, required: true},
    answer: {type: String, required: true},
    password: {type: String, required: true},
},{timestamps: true});
export default mongoose.models.User || mongoose.model('User', UserSchema);