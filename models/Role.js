const mongoose = require('mongoose');

const Role = new mongoose.Schema({
    code:{
        type: String,
        require: true
    },
    ket:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model("Role", Role);