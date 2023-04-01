const express = require('express');
const Router = express.Router();
const FetchUser = require('../middleware')
const Notes = require('../models/Notes');
const User = require('../models/User');
const {body} = require("express-validator");
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

Router.get('/GetFriends' , FetchUser  , jsonParser , async (Req , Res)=> 
{
    const RequestUser = await User.findOne( { _id : Req.user.id })
    let Users = []
    RequestUser.friends.map( (elementfriend) => {
        Users.push(elementfriend[0])
    })

    Res.send(Users)
})

Router.get('/SuggestedUsers' , FetchUser  , jsonParser , async (Req , Res)=> 
{
    const UserSuggestions = await User.find()
    const RequestUser = await User.findOne( { _id : Req.user.id })
    let Users = [];    

    UserSuggestions.map( (element) => {
        let Found = false;
        let FoundFriend = false;

        if(element.email === RequestUser.email)
        {
              Found = true
        }
        RequestUser.friends.map((elementfriend) => 
        {
            if (elementfriend[0] && element.email === elementfriend[0].email) {
              FoundFriend = true;
            }
        })
    if (FoundFriend!==true && Found!==true)
        {
            Users.push(element)
        }

    })
    Res.send(Users);
})


Router.put('/AddFriend/:email', FetchUser  , jsonParser , async (req, res) => 
{
    const RequestUser = await User.findOne( { _id : req.user.id })
    
    const FindNote = await User.find({email: req.params.email})
    if (!FindNote)
    {
        return res.status(404).send("Note was not Found");
    }
    else
    {
        const Success=true
        RequestUser.friends.push(FindNote);
        let UserUpdate = await User.findByIdAndUpdate( req.user.id, {$set: RequestUser} , {new:true} )
        return res.json({Success:Success});
    }
  });


Router.put('/RemoveFriend/:email', FetchUser  , jsonParser , async (req, res) => 
{
    const RequestUser = await User.findOne( { _id : req.user.id })
    
    const Success=true
    RequestUser.friends.map((elements)=>
    {
        if(elements[0].email===req.params.email)
        {
            RequestUser.friends.pop(req.params.email);
        }
    })
    let UserUpdate = await User.findByIdAndUpdate( req.user.id, {$set: RequestUser} , {new:true} )
    return res.json( {Success:Success});
  });

  

//Middleware allows to have an identity of the user
//FetchUser middleware gets us the user in our request header
Router.get('/GetUserNotes' , FetchUser  , jsonParser , async (Req , Res)=> 
{
    const FetchUserNotes = await Notes.find( {user: Req.user.id })
    Res.send(FetchUserNotes);
})




Router.get('/GetPublicArticles' , jsonParser , async (Req , Res)=> 
{
    const FetchArticles = await Notes.find({category:"Public"})
    Res.send(FetchArticles);
})


Router.post('/AddNotes' , 
        FetchUser , 
        [
            body('title' , 'Enter a valid title').isLength({min:3}),
            body('description' , 'Enter a valid description').isLength({min:3}),
            body('tag' , 'Enter a valid tag').isLength({min:3}),
        ] 
        , jsonParser , async (Req , Res)=> 
{
    try 
    {
        let Author = await User.findOne( { _id : Req.user.id })
        console.log(Req.body)
        const NewNote = new Notes(
            {
                user: Req.user.id,
                author: Author.name,
                title: Req.body.title, 
                description: Req.body.description,
                category: Req.body.category,
                tag: Req.body.tag,
            }
        )
        const AddedNote= await NewNote.save();
        Res.send(AddedNote);    
    } 
    catch (error) 
    {
        console.error(error.message)
        return Res.status(400).json({ Error: "An Error Occured"});
    }

})

//Updating a Note
Router.put('/updateNote/:id' , jsonParser , async (Req , Res)=> 
{
    try 
    {
        //New Notes will be replaced by exsistingone
        const NewNote = {};
        if(Req.body.title)
        {
            NewNote.title = Req.body.title;
        }
        if(Req.body.description)
        {
            NewNote.description = Req.body.description;
        }
        if(Req.body.tag)
        {
            NewNote.tag = Req.body.tag;
        }

        //Finds if note is there or not
        const FindNote = Notes.findById( Req.params.id )
        if (!FindNote)
        {
            return Res.status(404).send("Note was not Found");
        }
        //Checking if user is the same as the user who added it.
        if (FindNote.user.toString() !== Req.user.id )
        {
            return Res.status(404).send("User was not allowed to change note");
        }

        //And then updating the note
        let NoteUpdate = await Notes.findByIdAndUpdate( Req.params.id, {$set: NewNote} , {new:true} )
        Res.json(NoteUpdate);
   
    } 
    catch (error) 
    {
        console.error(error.message)
        return Res.status(400).json({ Error: "An Error Occured"});
    }
})

//Delete Note
Router.delete('/DeleteNote/:id' , jsonParser , async (Req , Res)=> 
{
    try 
    {
        //Finds if note is there or not
        const FindNote = Notes.findById( Req.params.id )
        if (!FindNote)
        {
            return Res.status(404).send("Note was not Found");
        }
        //Checking if user is the same as the user who added it.
        
        //And then Deleting the note
        let DeleteNote = await Notes.findByIdAndDelete(Req.params.id);
        Res.json(DeleteNote);
   
    } 
    catch (error) 
    {
        console.error(error.message)
        return Res.status(400).json({ Error: "An Error Occured"});
    }
})


module.exports = Router;