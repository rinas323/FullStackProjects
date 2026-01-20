const express = require("express");
const Post = require("../models/Post");
const router = express.Router();




router.get('/', async (req, res) => {

  try {
    const query = req.query.q || "";
    const escapeRegex = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const safeQuery = escapeRegex(query);
    let posts;
    if(query){
      posts = await Post.find({ title: { $regex: safeQuery, $options: "i" } }).populate("author", "username");

    }else{
      posts = await Post.find().sort({ createdAt: -1 }); // newest first

    }
    res.render('home', { posts,safeQuery });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching posts');
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send('Post not found');
    res.render('post', { post });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading post');
  }
});


module.exports = router;