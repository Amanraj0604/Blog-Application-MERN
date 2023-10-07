const router = require("express").Router();
const Category = require("../models/Cetegory");

//create category
router.post("/",async (req,res)=>{
    const newCat= new  Category(req.body);
    try {
        const saveCat=await newCat.save();
        res.status(200).json(saveCat);
    } catch (error) {
        res.status(500).json(error);
    }
})

//get all category
router.get("/",async (req,res)=>{ 
    try {
        const Cats= await Category.find()
        res.status(200).json(Cats); 
    } catch (error) {
        res.status(500).json(error);
    }
})
module.exports=router;
