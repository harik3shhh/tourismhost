const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    slug:{
        type: String,
        required: true,

    },
    description:{
        type: String,
        required: true,
    },
  
    category: {
        type: mongoose.ObjectId,
        ref:  "Category",
        required: true
    },
   
    photo: {
        data: Buffer,
        contentType: String 
    },

    food :{
        type: String,
        required: true,
    },

    transport :{
        type: String,
        required: true,
    },

    nearby :{
        type: String,
        required: true,
    },

    location :{
        type: String,
        required: true,
    },

    besttime :{
        type: String,
        required: true,
    },
  
}, {timestamps:true});

module.exports = new mongoose.model("Product", productSchema);