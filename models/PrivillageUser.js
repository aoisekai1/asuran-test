const mongoose = require('mongoose');

const PrivillageUser = new mongoose.Schema({
    privillage_id:{
        type: String,
        require: true
    },
    user_id:{
        type: String,
        require: true
    },
    isRead:{
        type: Boolean,
        require: true
    },
    isInsert:{
        type: Boolean,
        require: true
    },
    isUpdate:{
        type: Boolean,
        require: true
    },
    isDelete:{
        type: Boolean,
        require: true
    },
    isApprove:{
        type: Boolean,
        require: true
    },
    isReject:{
        type: Boolean,
        require: true
    }
    
})

module.exports = mongoose.model("PrivillageUser", PrivillageUser);