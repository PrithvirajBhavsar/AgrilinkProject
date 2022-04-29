const mongoose = require("mongoose");

var reportSchema = new mongoose.Schema({
    marketID: {
        type:String,
        required:true
    },
    marketName:{
        type:String,
        required:true
    },
    cmdtyID:{
        type:String,
        required:true
    },
    cmdtyName:{
        type:String,
        required:true
    },
    users:{
        type:Array,
        required:true
    },
    priceUnit:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    }
}, {timestamps: true});

const Report = mongoose.model('reports', reportSchema);

module.exports = {default : Report};
