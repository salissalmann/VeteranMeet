const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
{
    user:
    {
        type: mongoose.Schema.Types.ObjectId, //Just like a foriegn key
        ref : 'Community'
    },
    eventName: 
    { 
        type: String
    },
    city: 
    { 
        type: String 
    },
    relatedHobby: 
    { 
        type: String 
    },
    eventType: 
    {
        type: String
    },
    stars:
    {
        type: Number
    },
    date:
    {
        type: Date
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
