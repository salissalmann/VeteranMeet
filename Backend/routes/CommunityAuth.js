const express = require('express');
const Router = express.Router();
const bcrypt = require('bcryptjs')


const jwt = require('jsonwebtoken');
const SECRET_KEY = "SALUSISSEXY";

const User = require('../models/User');
const Community = require('../models/Community');
const FetchUser = require('../middleware')

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


//LOGIN 
Router.post('/login' ,  jsonParser , async (Req , Res)=>
{
    let Success=false;
    try 
    {
        let UserFound = await Community.findOne( { email: Req.body.email })
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


Router.get('/GetCommunityDetails' , FetchUser , jsonParser , async (Req , Res)=>
{
    try 
    {
        const CommunityID = Req.user.id;        
        const user = await Community.findById(CommunityID).select("-password")
        Res.send(user);
    } 
    catch (error) 
    {
        return Res.status(400).json({ Error: "An Error Occured"});
       
    }
})

module.exports = Router;