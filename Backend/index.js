const ConnectToMongo = require('./Mongo');

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const Posts = require("./models/Posts")
const User = require("./models/User")
const Community = require("./models/Community")

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const SECRET_KEY = "SALUSISSEXY";
var jsonParser = bodyParser.json()
const FetchUser = require('./middleware')

app.use(express.json())

ConnectToMongo();



  


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb)=> {
      cb(null, file.originalname);
    },
  });
  
const upload = multer({ storage });
  


app.use(cors());
app.use('/authorization' , require('./routes/Authorization'))
app.use('/retrieval' , require('./routes/Notes'))
app.use('/posts' , require('./routes/Posts'))
app.use('/community' , require('./routes/CommunityAuth'))
app.use('/events', require('./routes/Event'))

app.post('/CreatePost', upload.single('testImage') , FetchUser, async(req,res)=>
{
    try
    {   const saveImage = new Posts({
        user: req.user.id,
        description: req.body.description,
        img : 
        {
            data : fs.readFileSync('uploads/' + req.file.filename),
            contentType : 'image/png'
        }})
        const AddedNote= await saveImage.save();
        let Success = true;
        res.status(200).json({AddedNote},{Success})
    }
    catch (error) {
        res.status(404).json({error})        
    }
   
} )

app.post('/createUser' , upload.single('testImage') ,  jsonParser , async (Req , Res)=> 
    {
        let Success = false;
        try 
        {
            let AleadyExsist = await User.findOne( { email: Req.body.email })
            if(AleadyExsist)
            {
                return Res.status(400).json({ Success: Success , Error: "Sorry User Already Exsists"});
            }

            const Salt = await bcrypt.genSalt(10);
            const HashedPassword = await bcrypt.hash(Req.body.password , Salt);

            const CreateUser = await User.create(
                {
                    firstName: Req.body.firstName,
                    lastName: Req.body.lastName,
                    email: Req.body.email,
                    password: HashedPassword,
                    city : Req.body.city,
                    occupation : Req.body.occupation,
                    img : 
                    {
                        data : fs.readFileSync('uploads/' + Req.file.filename),
                        contentType : 'image/png'
                    }
                  }
            )

            Success = true;
            const Data = { user: { id: CreateUser.id} } 
            const AuthToken = jwt.sign(Data , SECRET_KEY)
            Res.send({  Success: Success ,  AuthToken: AuthToken} );           
       
        } 
        catch (error) 
        {
            console.error(error.message)
            return Res.status(400).json({ Error: "An Error Occured"});
        }    
    }
)

app.post('/CreateCommunity' , upload.single('testImage') ,  jsonParser , async (Req , Res)=> 
    {
        let Success = false;
        try 
        {
            let AleadyExsist = await Community.findOne( { email: Req.body.email })
            if(AleadyExsist)
            {
                return Res.status(400).json({ Success: Success , Error: "Sorry Community Already Exsists"});
            }

            const Salt = await bcrypt.genSalt(10);
            const HashedPassword = await bcrypt.hash(Req.body.password , Salt);

            const CreateCommunity = await Community.create(
                {
                    name: Req.body.name,
                    email: Req.body.email,
                    password: HashedPassword,
                    type: Req.body.type,
                    city : Req.body.city,
                    img : 
                    {
                        data : fs.readFileSync('uploads/' + Req.file.filename),
                        contentType : 'image/png'
                    }
                  }
            )

            Success = true;
            const Data = { user: { id: CreateCommunity.id} } 
            const AuthToken = jwt.sign(Data , SECRET_KEY)
            Res.send({  Success: Success ,  AuthToken: AuthToken} );           
       
        } 
        catch (error) 
        {
            console.error(error.message)
            return Res.status(400).json({ Error: "An Error Occured"});
        }    
    }
)



app.listen( 3001 , ()=> {console.log("LISTENING AT PORT: 3001")} )
