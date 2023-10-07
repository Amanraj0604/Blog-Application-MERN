const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require('bcrypt');


//NEW POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});


//UPDATE POST
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const UpdatePost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                }, {
                    new: true
                });
                res.status(200).json(UpdatePost);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(404).json("You can update only your post");
        }
    } catch (error) {
        res.status(500).json(error);
    }

});



// DELETE POST


router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const userName = req.body.username;
        
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        if (post.username === userName) {
            try {
                const response = await Post.deleteOne({ _id: id });
                if (response.deletedCount === 1) {
                    res.status(200).json("Post has been deleted");
                } else {
                    res.status(500).json({ error: "Failed to delete post" });
                }
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(403).json("You can delete only your post");
        }
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});



//GET POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
             res.status(404).json({ error: "User not found" });
        }
        
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//GET All POST
router.get("/", async (req, res) => {
    const username=req.query.user;
    const catName=req.query.cat;
    try {
        let post;
        if(username)
        {
            post=await Post.find({username})
        }else if(catName)
        {
            post=await Post.find({categories:{
                $in:[catName]
            }})
        }else
        {
            post=await  Post.find();
        }
        if (!post) {
             res.status(404).json({ error: "User not found" });
        }
         res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;  