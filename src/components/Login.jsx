/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState , useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Box , Button, TextField, Typography} from "@mui/material";
import NoteContext from "../context/NotesContext";

export default function Login() 
{
  const Context = useContext(NoteContext);
  
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();

  const Navigate = useNavigate();

  const HandleEmailValue = (event) => {
    SetEmail(event.target.value);
  };
  const HandlePasswordValue = (event) => {
    SetPassword(event.target.value);
  };

  const Submit = async (e) => 
  {
    e.preventDefault();
    const Response = await fetch(`http://localhost:3001/authorization/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const ResponseToJson = await Response.json();
    if (ResponseToJson.Success) {
      localStorage.setItem("Token", ResponseToJson.AuthToken);
      console.log(ResponseToJson.User)
      Context.StoreUser(ResponseToJson.User);
      e.preventDefault();
      Navigate("/VeteranDashboard", { replace: true });
    }
  };

  return (
    <>
     <Box>
          <Box padding="1vw" backgroundColor={"black"}  textAlign="center" >
            <Typography color="#69D4C6" fontWeight="600" fontSize="2rem"> VeteranMeet </Typography>
          </Box>
          <div className="container my-2">
            <Typography color="#69D4C6" fontWeight="bold" fontSize="2rem" textAlign={"center"} marginTop="4vw"> Login to Veteran Account </Typography>
            <Typography color="#69D4C6" fontWeight="700px" fontSize="1.3rem" marginTop="1vw" marginBottom="2rem"> Enter Account Information </Typography>
            <form onSubmit={Submit}>
                <div className="row">
                    <div className='col-lg-12'>
                       <TextField name="email"     id="email"      label="Email"      onChange={HandleEmailValue}  sx={{width:"30%"}}/>
                    </div>
                </div>
                <div className="row my-2">
                    <div className='col-lg-12'>
                        <TextField name="password"  id="password"   label="Password"   onChange={HandlePasswordValue}   sx={{width:"30%"}}/>
                    </div>
                </div>

                <Button type="submit" padding= "2rem" sx={{backgroundColor:"#69D4C6", color:"white", width:"30%" , marginTop:"1%"}}> Login </Button>
                <Box marginTop={"2vw"}  sx={{textDecoration:"none"}}  >          
                    <Typography color={"#6bd5fa"}><Link to="/CommunityLogin"> Login as Organization</Link>  <a style={{marginLeft:"1rem"}} href={" "} >OR</a>   <Link to="/JoinCommunity" style={{marginLeft:"1rem"}}> Join as Organization</Link> </Typography>
                    <Typography color={"#6bd5fa"}><Link to="/SignUp"> Join as Veteran</Link> </Typography>
                </Box>          
            </form>
        </div>

        </Box>
    </>
  );
}
