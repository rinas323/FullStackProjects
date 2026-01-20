const express = require("express");
const Post = require("../models/Post");
// const sanitizeHtml = require("sanitize-html");

const router = express.Router();

function isAuthenticated(req,res,next){
    if(!req.session.user) return res.redirect("/login");
    next();
}

//Dashboard Home
router.get("/",isAuthenticated,async (req,res)=>{
    const Posts = await Post.find({author:req.session.user.id});
    res.render("dashboard",{Posts});

});

//Create new posts
router.post("/new",isAuthenticated,async (req,res)=>{
    const title = req.body.title;
    const body = req.body.body;
    // const body = sanitizeHtml(req.body.body);
    await Post.create({title,body,author:req.session.user.id});
    res.redirect("/dashboard");
});


//Edit Post - show edit form
router.get("/edit/:id",isAuthenticated,async(req,res)=>{
    const post = await Post.findOne({_id:req.params.id,author:req.session.user.id});
    if(!post) return res.redirect("/dashboard");
    res.render("editPost",{post});
});


//Edit Post - handle form submission
router.post("/edit/:id",isAuthenticated,async(req,res)=>{
    const {title,body} = req.body;
    await Post.updateOne({_id:req.params.id,author:req.session.user.id},{title,body});
    const Posts = await Post.find({author:req.session.user.id});
    res.redirect("/dashboard");
});

//Delete a Posts
router.post("/delete/:id",isAuthenticated,async (req,res)=>{
    await Post.deleteOne({_id:req.params.id,author:req.session.user.id});
    res.redirect("/dashboard");

});


module.exports = router;