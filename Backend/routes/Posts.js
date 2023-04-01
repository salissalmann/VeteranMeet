const FetchUser = require('../middleware')
const User = require('../models/User');
const Post = require('../models/Posts');
const express = require('express');
const Router = express.Router();
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()



Router.get('/GetPosts' , FetchUser  , jsonParser , async (req , res)=> 
{
    try
    {
      const RequestUser = await User.findOne( { _id : req.user.id })
      let Posts = [];    
    
      const Success=true
      await Promise.all(RequestUser.friends.map(async (elements) => {
        const Friend = await User.find({ email: elements[0].email });
        const FriendPosts = await Post.find({ user: Friend[0].id });
        Posts = Posts.concat(FriendPosts);
      }));
      return res.status(200).json(Posts)
    }
    catch (error)
    {
      return res.status(404).json({error})
    }
})


module.exports = Router;