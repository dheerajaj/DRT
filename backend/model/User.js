const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required : true,
    },
    lastname: {
        type: String ,
        required :true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: Number,
        required: true,
        unique: true,
      },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    // roleType: {
    //     type: Number,
    //     required: true
    // },
    // images: [{
    //     type: String, // You can store the image URL here
        
    // }],
});

module.exports = mongoose.model('User',userSchema);