const express = require('express');
const mongoose = require('mongoose');
const multer=require("multer");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const CategoryRoute = require("./routes/cetegories");
const path = require("path");

const app = express();
require('dotenv').config();
app.use(express.json()); // Place this middleware before your route handling
app.use("/images", express.static(path.join(__dirname, "images"))); 
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify:true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => console.error({error : "MongoDB connection error"}))

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },
    filename:(req,file,cb)=>{
       cb(null,req.body.name);//cb(null,"hello.jpeg");
    },
});

const upload=multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploded"); 
});
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/cate", CategoryRoute);

app.listen(process.env.PORT, (req, res) => {
    console.log("Server is running on port", process.env.PORT);
});
