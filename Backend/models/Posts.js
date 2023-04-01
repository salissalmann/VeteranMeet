const mongoose  = require("mongoose");

const postSchema = mongoose.Schema(
  {
      user:
      {
          type: mongoose.Schema.Types.ObjectId, //Just like a foriegn key
          ref : 'User'
      },
      description: 
      { 
        type: String,
      },
      img:
      {
          data: Buffer,
          contentType: String
      },
      date: 
      {
          type: Date,
          default: Date.now,
      },
    });

module.exports = mongoose.model("Post", postSchema);
