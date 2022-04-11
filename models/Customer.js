const mongoose = require('mongoose');

const Customer = new mongoose.Schema({
    nama:{
        type: String,
        require: true
    },
    no_hp:{
        type: Number,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    jekel:{
        type: String,
        require: true
    },
    alamat:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model("Customer", Customer);