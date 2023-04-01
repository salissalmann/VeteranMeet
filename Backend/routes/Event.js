const express = require('express');
const Router = express.Router();
const FetchUser = require('../middleware')
const Event = require('../models/Events');
const Community = require('../models/Community');
const User = require('../models/User');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

Router.post('/AddEvent' , FetchUser ,  jsonParser , async (Req , Res)=> 
{
    try 
    {
        let CommunityFind = await Community.findOne( { _id : Req.user.id })
        const NewEvent = new Event(
            {
                user: Req.user.id,
                eventName: Req.body.eventName,
                city: Req.body.city,
                relatedHobby: Req.body.relatedHobby,
                eventType: Req.body.eventType,
                stars: Req.body.stars,
                date: Req.body.date
            }

        )
        const Success = true;
        const Added = await NewEvent.save();
        Res.send({Added , Success});    
    } 
    catch (error) 
    {
        console.error(error.message)
        return Res.status(400).json({ Error: "An Error Occured"});
    }
})

Router.post('/GetEvents' , FetchUser ,  jsonParser , async (Req , Res)=> 
{
    try 
    {
        const Events = await Event.find( {user: Req.user.id})
        Res.send(Events);    
    } 
    catch (error) 
    {
        console.error(error.message)
        return Res.status(400).json({ Error: "An Error Occured"});
    }
})

Router.put('/MarkInterested/:id', FetchUser  , jsonParser , async (req, res) => 
{
    try
    {
        const RequestedEvent = await Event.findOne( {_id: req.params.id} );
        const RequestUser = await User.findOne( { _id : req.user.id })
        if (!RequestedEvent)
        {
            return res.status(404).send("Event Not Found");
        }
        else
        {
            const Success=true
            RequestUser.events.push(RequestedEvent);
            RequestUser.stars = RequestUser.stars + RequestedEvent.stars;
            let UserUpdate = await User.findByIdAndUpdate( req.user.id, {$set: RequestUser} , {new:true} )
            return res.json({Success:Success});
        }
    }
    catch (e) {
        return res.json({error:e});    
    }

});



Router.get('/GetAllEvents' , jsonParser , async (Req , Res)=> 
{
    try 
    {
        let Object = [];
        const Events = await Event.find();
        await Promise.all(Events.map(async (element) => {
          const Org = await Community.findOne({ _id : element.user });     
          const Item = {
            "_id": element._id,
            "name" : Org.name,
            "img" : Org.img,
            "eventName" : element.eventName,
            "city" : element.city,
            "relatedHobby" : element.relatedHobby, 
            "eventType" : element.eventType,
            "stars" : element.stars,
            "date" : element.date,
          };
          Object = Object.concat(Item); // assign the new array back to Object
        }));
        Res.send(Object);
    } 
    catch (error) 
    {
        console.error(error.message)
        return Res.status(400).json({ Error: "An Error Occured"});
    }
})

Router.post('/GetEventsByCity/:city' , FetchUser ,  jsonParser , async (Req , Res)=> 
{
    try 
    {
        const Events = await Event.find( {city: Req.params.city})
        Res.send(Events);    
    } 
    catch (error) 
    {
        console.error(error.message)
        return Res.status(400).json({ Error: "An Error Occured"});
    }
})

Router.delete('/DeleteEvent/:id' , jsonParser , async (Req , Res)=> 
{
    try 
    {
        const FindEvent = Event.findById(Req.params.id)
        if (!FindEvent)
        {
            return Res.status(404).send("Event not Found");
        }
        let DeleteEvent = await Event.findByIdAndDelete(Req.params.id);
        Res.json(DeleteEvent);   
    } 
    catch (error) 
    {
        console.error(error.message)
        return Res.status(400).json({ Error: "An Error Occured"});
    }
})

module.exports = Router;