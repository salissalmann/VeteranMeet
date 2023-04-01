import React , {useState} from 'react'
import "./styles/UserDisplay.css"
import {Buffer} from 'buffer';
import { SlUserFollow } from 'react-icons/sl';
import {Snackbar} from "@mui/material"

export default function UserDisplay(props) 
{
  const [openSnackbar, setOpenSnackbar] = useState(false);
 
  const handleSnackbarOpen = () => {
    setOpenSnackbar(true);
  };
  
  const AddFriend = async ()=>
  {  
    const Response = await fetch( `http://localhost:3001/retrieval/AddFriend/${props.User.email}`,
      {
        method: "PUT",
        headers:
        { 'Content-Type' : 'application/json',
          'Authorization-Token' : localStorage.getItem('Token')       
        }
      }
    );
    const ResponseToJson = await Response.json();
    if(ResponseToJson.Success===true)
    {
      handleSnackbarOpen();
    }
        
    }

    let src = "/public/SignUp.png";
    if (typeof props.User.img.data !== 'undefined') {
      const base64String = Buffer.from( props.User.img.data , 'base64')
       src = URL.createObjectURL(
          new Blob([base64String.buffer], { type: 'image/png' } /* (1) */)
        );  
    }
    
    
    return (
    <>
        <div className="container my-2" id="wrapper">
            <img id="profile" src={src} width={50} height={50}/>
            {props.User &&
              <div>
                {props.User.firstName && <h6 className="ProfileText">{props.User.firstName} {props.User.lastName}</h6>}
                {props.User.city && <h6>{props.User.city}</h6>}
              </div>
            }
            <div>
                <SlUserFollow fontSize={"1.25rem"} onClick={AddFriend}/>
            </div>
        </div>
        <Snackbar open={openSnackbar} autoHideDuration={2000}
          onClose={() => setOpenSnackbar(false)}
          message="Following"
          severity="success"
        />
    </>
  )
}
