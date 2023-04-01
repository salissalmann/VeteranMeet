import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Box , Button, TextField, Typography} from "@mui/material";

export default function SignUp() {
  const [firstName, SetFirstName] = useState();
  const [lastName, SetLastName] = useState();
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();
  const [occupation, SetOccupation] = useState();
  const [city , SetCity] = useState();
  const [file , setFile ] = useState();
  const Navigate = useNavigate();

  const HandleFirstName = (event)     => { SetFirstName(event.target.value);};
  const HandleLastName = (event)      => { SetLastName(event.target.value); };
  const HandleEmailValue = (event)    => { SetEmail(event.target.value);    };
  const HandlePasswordValue = (event) => { SetPassword(event.target.value); };
  const HandleCity = (event)          => { SetCity(event.target.value);     };
  const HandleOccupation = (event)    => { SetOccupation(event.target.value);};
  const handleFileChange = (event)    => { setFile(event.target.files[0]);};

  const UploadFile = ()=>
  {
        document.getElementById("fileID").click();
  }
  
  const Submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('occupation', occupation);
    formData.append('city', city);    
    formData.append('testImage', file);


    const Response = await fetch(
      `http://localhost:3001/createUser`,
      {
        method: "POST",
        body: formData,
      }
    );
    const ResponseToJson = await Response.json();
    if (ResponseToJson.Success) {
        localStorage.setItem("Token", ResponseToJson.AuthToken);
        Navigate("/Login", { replace: true });
    }
  };

  return (
    <>
        <Box padding="1vw" marginBottom="1rem" backgroundColor={"black"}  textAlign="center" >
          <Typography color="#69D4C6" fontWeight="600" fontSize="2rem"> VeteranMeet </Typography>
        </Box>
        <div className="container my-2">
          <Typography color="#69D4C6" fontWeight="bold" fontSize="32px" textAlign={"center"} marginTop="4vw"> Create Veteran Account </Typography>
          <Typography color="#69D4C6" fontWeight="700px" fontSize="20px" marginTop="1vw" marginBotton="1vw"> Enter Account Information </Typography>
            <form onSubmit={Submit}>
                <div className="container my-2">
                    <TextField name="firstName" id="firstName"  label="First Name" onChange={HandleFirstName}  sx={{width:"25.5%", marginRight:"0.5%", marginLeft:"0.5%"}}/>
                    <TextField name="lastName"  id="lastName"   label="Last Name"  onChange={HandleLastName}  sx={{width:"25.5%"}} />
                </div>
                <div className="container my-2">
                    <TextField name="email"     id="email"      label="Email"      onChange={HandleEmailValue}  sx={{width:"25.5%", marginRight:"0.5%", marginLeft:"0.5%"}}/>
                    <TextField name="password"  id="password"   label="Password"   onChange={HandlePasswordValue}  sx={{width:"25.5%"}}/>
                </div>
                <div className="container my-2">
                    <TextField name="city"      id="city"       label="City"       onChange={HandleCity}  sx={{width:"25.5%", marginRight:"0.5%", marginLeft:"0.5%"}}/>  
                    <TextField name="occupation"id="occupation" label="Occupation" onChange={HandleOccupation} sx={{width:"25.5%"}}/>
                </div>
                
                <div id="container">
                    <Box  sx={{width:"56%", marginLeft:"7%"}}>          
                    <div class="card">
                        <div class="drop_box">
                                <h4>Photo/Video</h4>
                                <input className="PostPicture" type="file"  onChange={handleFileChange} id="fileID" hidden/>            
                            <button id="btn" onClick={UploadFile}>Choose File</button>
                        </div>
                    </div>
                    </Box>
                </div>

                <Button type="submit" padding= "2rem" sx={{backgroundColor:"#69D4C6", color:"white", width:"50%" , marginTop:"1%"}}> Create Account </Button>
                <Box marginTop={"2vw"}  sx={{textDecoration:"none"}}  >          
                    <Typography color={"#6bd5fa"}><Link to="/CommunityLogin"> Login as Organization</Link>  <a style={{marginLeft:"1rem"}} href={" "} >OR</a>   <Link to="/JoinCommunity" style={{marginLeft:"1rem"}}> Join as Organization</Link> </Typography>
                    <Typography color={"#6bd5fa"}><Link to="/"> Login as Veteran</Link> </Typography>
                </Box>
            
            </form>
        </div>

    </>
  );
}
