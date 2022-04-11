const mongoose = require('mongoose');

const Admin = new mongoose.Schema({
    nama:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    type_role:{
        type: String,
        require: true
    },
    username:{
        type: String,
        require:  true
    },
    password:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model("Admin", Admin);