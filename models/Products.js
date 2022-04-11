const mongoose = require('mongoose');

const products = new mongoose.Schema({
    priode:{
        type: mongoose.Types.Decimal128,
        require: true
    },
    builder:{
        type: String,
        require: true
    },
    builder_price:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model("products", products);