const mongoose = require('mongoose');
const {Schema } = mongoose;

const UserScheme = new Schema(
    {
            firstName: 
            {
                type: String,
            },
            lastName:
            {
                type: String,
            },
            email:
            {
                type: String,
                unique: true
            },
            password: 
            {
                type: String,
            },
            friends: 
            {
                type: Array,
                default: [],
            },
            city:
            {
                type: String,
            },
            occupation:
            {
                type: String,
            },
            img:
            {
                data: Buffer,
                contentType: String
            },
            stars:
            {
                type: Number,
                default: 0
            },
            events:
            {
                type: Array,
                default: [],
            },
            timestamp: 
            {
                type: Date,
                default: Date.now,
            },
    }
);
const User = mongoose.model('User' , UserScheme);
module.exports = User;