const mongoose = require("mongoose");

const categoryScema = new mongoose.Schema({
  
    name:{
        type:String,
        required:true,
    }
},
    {
        timestamps: true//update at a time what ever we change 
    }
);

module.exports=mongoose.model("Cetegory",categoryScema);