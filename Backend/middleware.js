const jwt = require("jsonwebtoken");
const SECRET_KEY = "SALUSISSEXY";

//Next() calls the async function of route.

const FetchUser = (Req,Res,Next)=>
{
    try 
    {
        const Token = Req.header("Authorization-Token")
        if(!Token)
        {
            Res.status(401).send( {error:"Please authenticate using a valid Token"})
        }        
        const DATA = jwt.verify(Token,SECRET_KEY);
        Req.user = DATA.user;    
        Next()
    } 
    catch (error) 
    {
        return Res.status(400).json({ Error: "An Error Occured"});   
    }
}

module.exports = FetchUser;


