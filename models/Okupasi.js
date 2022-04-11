const mongoose = require('mongoose');

const Okupasi = new mongoose.Schema({
    code:{
        type: String,
        require: true
    },
    premi:{
        type: mongoose.Types.Decimal128,
        get: getNumber,
        require: true
    },
    ket:{
        type: String,
        require: true
    }
})

function getNumber(value) {
    if (typeof value !== 'undefined') {
       return parseFloat(value.toString());
    }
    return value;
}

module.exports = mongoose.model("Okupasi", Okupasi);