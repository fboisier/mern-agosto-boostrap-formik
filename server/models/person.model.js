const mongoose = require('mongoose');
const PersonSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [6, "First name must be at least 6 characters long"],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [6, "Last name must be at least 6 characters long"],
    }
}, { timestamps: true });
module.exports.Person = mongoose.model('Person', PersonSchema);