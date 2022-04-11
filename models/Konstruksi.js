const mongoose = require('mongoose');

const Konstruksi = new mongoose.Schema({
    kelas:{
        type: Number,
        require: true
    },
    ket:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model("Konstruksi", Konstruksi);