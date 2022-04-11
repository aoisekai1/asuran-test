const mongoose = require('mongoose');

const claim = new mongoose.Schema({
    user_id:{
        type: String,
        require: true
    },
    no_polis:{
        type: String,
        require: true
    },
    no_invoice:{
        type: String,
        require: true
    },
    tanggal_req:{
        type: Date,
        default: Date.now,
        require: true
    },
    jenis_ansuransi:{
        type: Number,
        require: true
    },
    priode:{
        type: Number,
        require: true
    },
    okupasi:{
        type: Number,
        require: true
    },
    harga_bangunan:{
        type: Number,
        require: true
    },
    konstruksi:{
        type: Number,
        require: true
    },
    alamat:{
        type: String,
        require: true
    },
    provinsi:{
        type: String,
        require: true
    },
    kota:{
        type: String,
        require: true
    },
    kabupaten:{
        type: String,
        require: true
    },
    daerah:{
        type: String,
        require: true
    },
    gempa:{
        type: Boolean,
        require: true
    },
    total:{
        type: Number,
        require: true
    },
    approve:{
        type: Boolean,
        require: true
    },
    approve_date:{
        type: Date,
        require: true
    },
    approve_by:{
        type: String,
        require: true
    },
    reject:{
        type: Boolean,
        require: true
    },
    reject_date:{
        type: Date,
        require: true
    },
    reject_by:{
        type: String,
        require: true
    },
    status:{
        type: String,
        require: true
    }

})

module.exports = mongoose.model("Claim", claim);