import React , { useEffect , useState} from "react";
import { Typography} from "@mui/material";
import { IoNotificationsOutline } from "react-icons/io5";
import { CgDarkMode} from "react-icons/cg"

export default function CommunityNavigation() 
{
    const [RunEffect , SetRunEffect] = useState(false);
    const [Community , SetCommunity] = useState();
    const [UserName , SetUserName] = useState("Waiting...");

    useEffect( 
        ()=>{
            const GetDetails = async ()=>{
                const Response = await fetch( "http://localhost:3001/community/GetCommunityDetails",
                {
                    method: 'GET',
                    headers:
                    {   'Content-Type' : 'application/json',
                        'Authorization-Token' : localStorage.getItem('Token')       
                    }
                    })
                    const ResponseToJson = await Response.json();
                    SetCommunity(ResponseToJson)
                    SetUserName(Community.name)
                    SetRunEffect(true)       
                    console.log(RunEffect)             
            }
            GetDetails()
        })
      
    return (
      <>
            <div className="row" id="nav-body">
                <div className="col-lg-4" id="nav-left">   
                          <Typography fontWeight="bold" fontSize="2.25rem" color="#69D4C6" marginLeft="3rem">VeteranMeet</Typography>
                </div>
                <div className="col-lg-4 my-2">
                          <input id="Search" required="" type="text" placeholder="Search"/>
                </div>
                <div className="col-lg-4">
  
                      <div>
                          <CgDarkMode className="Mode"/> 
                          <IoNotificationsOutline className="Notify"/>
                          <a class="fancy" href="/">
                              <span class="text">Community: {UserName}</span>
                          </a>
                      </div>
  
  
                </div>
            </div>
        
      </>
    );
}