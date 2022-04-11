const mongoose = require('mongoose');

const PrivillageGroup = new mongoose.Schema({
    role_id:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model("PrivillageGroup", PrivillageGroup);