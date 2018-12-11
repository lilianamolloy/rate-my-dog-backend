const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    rating: Array,
    description: String,
    image: String
});

module.exports = mongoose.model('Dog', dogSchema);