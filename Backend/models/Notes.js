const mongoose = require('mongoose');

const {Schema } = mongoose;

const NotesScheme = new Schema(
    {
            user:
            {
                type: mongoose.Schema.Types.ObjectId, //Just like a foriegn key
                ref : 'User'
            },
            author:
            {
                type: String,
            },
            title: 
            {
                type: String,
            },
            description:
            {
                type: String,
            },
            tag: 
            {
                type: String,
            },
            category:
            {
                type: String,
                default: 'Public',
                enum: ['Public', 'Private']
            },
            date: 
            {
                type: Date,
                default: Date.now,
            },
    }
);

module.exports = mongoose.model('Notes' , NotesScheme);