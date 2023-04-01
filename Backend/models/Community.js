const mongoose = require('mongoose');
const {Schema } = mongoose;

const CommunityScheme = new Schema(
    {
            name: 
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
            type: 
            {
                type: String,
            },
            city:
            {
                type: String,
            },
            img:
            {
                data: Buffer,
                contentType: String
            }      
    }
);
const Community = mongoose.model('Community' , CommunityScheme);
module.exports = Community;