const user = require("../models/user");

//create a new post
exports.createPost = async (req, res) => {
 const {session_length, subject, userID} = req.body;
 try {
   const post = new post({session_length, subject, userID});
   const savedPost = await post.save();
   res.status(201).json(savedPost);
 } catch (error) {
   res.status(500).json({ error: 'An error occurred while creating the post'});
 }
};

//get all posts
exports.getAllPosts = async (req, res) => {
 try {
   const posts = await post.find();
   res.status(200).json(posts);
 } catch (error) {
   res.status(500).json({ error: 'An error occurred while retrieving posts'});
 }
};