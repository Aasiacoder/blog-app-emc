// server.js

const express = require('express');
const bodyParser = require('body-parser');//or use express.json for parser
const mongoose = require('mongoose');
const cors = require("cors")

const app = express();
app.use(cors())

// Middleware
app.use(bodyParser.json());//or use express.json

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/blogDB').then(()=>{
    console.log("Connection Successfull")
})


// Define Schema for database handle in mongoDB Compass
const blogSchema = new mongoose.Schema({
  newTitle: String,
  newContent: String,
  date:String,
  likes:Number
});

//model for add data & other thing
const Blog = mongoose.model('Blog', blogSchema);

// Routes //database all data will be fetch and given to a res
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    console.log(blogs)
    res.send(blogs)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//this patch code handle a updates likes and blog
app.patch('/api/blogs/like/:id', async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      // Increment the likes of the blog post
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        { $inc: { likes: 1 } },
        { new: true } // This option returns the modified document rather than the original
      );
  
      res.json(updatedBlog);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

//it will add blog data into mongoDB
app.post('/api/blogs', async (req, res) => {

  const blog = new Blog({
    newTitle: req.body.newTitle,
    newContent: req.body.newContent,
    date:req.body.date,
    likes:req.body.likes
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));
