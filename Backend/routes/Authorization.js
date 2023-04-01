const express = require('express');
const Router = express.Router();
const bcrypt = require('bcryptjs')


const jwt = require('jsonwebtoken');
const SECRET_KEY = "SALUSISSEXY";

const User = require('../models/User');
const FetchUser = require('../middleware')

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


//LOGIN 
Router.post('/login' ,  jsonParser , async (Req , Res)=>
{
    let Success=false;
    try 
    {
        let UserFound = await User.findOne( { email: Req.body.email })
        if(!UserFound)
        {
            return Res.status(400).json({ Success: Success , Error: "Enter Correct Email/Password"});
        }

        const ComparePassword = await bcrypt.compare(Req.body.password , UserFound.password);
        if (!ComparePassword)
        {
            return Res.status(400).json({ Success: Success , Error: "Enter Correct Email/Password"});     
        }

        const Data = { user: { id: UserFound.id} } 
        const AuthToken = jwt.sign(Data , SECRET_KEY)
        Success = true;
        Res.send({Success: Success , AuthToken: AuthToken , User: UserFound} );           
    } 
    catch (error) 
    {
        return Res.status(400).json({ Error: "An Error Occured"});
    }

})

Router.get('/GetProfile/:id', jsonParser , async (req, res) => 
{
    
    const FindProfile = await User.find({ _id : req.params.id })
    if (!FindProfile)
    {
        return res.status(404).send("Profile was not Found");
    }
    else
    {
        return res.json(FindProfile);
    }
  });

//UserDetails
Router.get('/GetUserDetails' , FetchUser , jsonParser , async (Req , Res)=>
{
    try 
    {
        const USERID = Req.user.id;        
        const user = await User.findById(USERID).select("-password")
        Res.send(user);
    } 
    catch (error) 
    {
        return Res.status(400).json({ Error: "An Error Occured"});
       
    }
})


module.exports = Router;