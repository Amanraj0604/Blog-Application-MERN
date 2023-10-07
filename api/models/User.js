const mongoose = require("mongoose");

const userScema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required:true,
    },
    profilePic: {
        type: String,
        default: "",
    }
},
    {
        timestamps: true//update at a time what ever we change 
    }
);
const User=mongoose.model("User",userScema);
module.exports=User;
