import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Box , Button, TextField, Typography ,MenuItem , Select} from "@mui/material";
import {Snackbar} from "@mui/material"

export default function CommunitySignUp() 
{

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleSnackbarOpen = () => {setOpenSnackbar(true);};
  const [name, SetName] = useState();
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();
  const [type , SetType] = useState('NGO');
  const [city , SetCity] = useState('Karachi');
  const [file , setFile ] = useState();

  const Navigate = useNavigate();

  const HandleName = (event)          => { SetName(event.target.value);};
  const HandleEmailValue = (event)    => { SetEmail(event.target.value);    };
  const HandlePasswordValue = (event) => { SetPassword(event.target.value); };
  const HandleTypeValue = (event)     => { SetType(event.target.value); };
  const HandleCity = (event)          => { SetCity(event.target.value);     };
  const handleFileChange = (event)    => { setFile(event.target.files[0]);};

  const UploadFile = ()=>
  {
        document.getElementById("fileID").click();
  }
  
  const Submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('type', type);
    formData.append('city', city);    
    formData.append('testImage', file);

    const Response = await fetch(
      `http://localhost:3001/CreateCommunity`,
      {
        method: "POST",
        body: formData,
      }
    );
    const ResponseToJson = await Response.json();
    if (ResponseToJson.Success) {
        handleSnackbarOpen();
        localStorage.setItem("Token", ResponseToJson.AuthToken);
        Navigate("/CommunityLogin", { replace: true });
    }

    };

  return (
    <>
        <Box padding="1vw" marginBottom="1rem" backgroundColor={"black"}  textAlign="center" >
            <Typography color="#69D4C6" fontWeight="600" fontSize="2rem"> VeteranMeet </Typography>
        </Box>
        <div className="container my-2">
            <Typography color="#69D4C6" fontWeight="bold" fontSize="2rem" textAlign={"center"} marginTop="4vw"> Join as Organization </Typography>
            <Typography color="#69D4C6" fontWeight="700px" fontSize="1.3rem" marginTop="1vw" marginbottom="2rem"> Enter Account Information </Typography>
            <form onSubmit={Submit}>
                <div className="row">
                    <div className='col-lg-12'>
                        <TextField name="name" id="name"  label="Organization Name" onChange={HandleName} sx={{width:"50.5%", marginLeft:"0.5%"}}/>
                    </div>
                </div>
                <div className="container my-2">
                        <TextField name="email"     id="email"      label="Email"      onChange={HandleEmailValue}  sx={{width:"25.5%", marginRight:"0.5%", marginLeft:"0.5%" }} />
                        <TextField name="password"  id="password"   label="Password"   onChange={HandlePasswordValue}  sx={{width:"25.5%"}}/>                   
                </div>
                
                <div className="container my-2">
                    <Select sx={{width:"25.5%" , marginRight:"0.5%", marginLeft:"0.5%"}}
                        placeholder='Type'
                        label="type"
                        id="type"
                        name="type"
                        value={type}
                        onChange={HandleTypeValue}
                    >
                        <MenuItem value={'NGO'}>NGO</MenuItem>
                        <MenuItem value={'Organization'}>Organization</MenuItem>
                        <MenuItem value={'Educational Institute'}>Educational Institute</MenuItem>
                    </Select>

                    <Select sx={{width:"25.5%"}}
                        placeholder='City'
                        label="city"
                        id="city"
                        name="city"
                        value={city}
                        onChange={HandleCity}
                    >
                        <MenuItem value={'Karachi'}>Karachi</MenuItem>
                        <MenuItem value={'Islamabad'}>Islamabad</MenuItem>
                        <MenuItem value={'Lahore'}>Lahore</MenuItem>
                        <MenuItem value={'Peshawar'}>Peshawar</MenuItem>
                    </Select>
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
                    <Typography color={"#6bd5fa"}><Link to="/CommunityLogin"> Login as Organization</Link>  <a style={{marginLeft:"1rem"}} href={" "} >OR</a>   <Link to="/Login" style={{marginLeft:"1rem"}}> Login as Veteran</Link> </Typography>
                    <Typography color={"#6bd5fa"}><Link to="/SignUp"> Join as Veteran</Link> </Typography>
                </Box>
            
            </form>
        </div>
        <Snackbar open={openSnackbar} autoHideDuration={2000}
          onClose={() => setOpenSnackbar(false)}
          message="Account Created Successfully"
          severity="success"
        />


    </>
  )
}
