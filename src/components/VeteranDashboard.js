import React, { useEffect , useState } from "react";
import NavigationBar from "./NavigationBar";
import NoteContext from "../context/NotesContext";
import { useContext} from "react";
import './styles/VeteranDash.css'
import UserDisplay from "./UserDisplay";
import FriendDisplay from "./FriendDisplay";
import { Typography } from "@mui/material";
import {Snackbar} from "@mui/material"
import PostsDisplay from "./PostsDisplay";
import VeteranEventDisplay from "./VeteranEventDisplay";

export default function VeteranDashboard() {
  const Context = useContext(NoteContext);
  const [EffectRun , SetEffectRun] = useState(false)
  useEffect( 
    ()=>{
      const Run = ()=>
      {
        Context.GetAllEvents()
        SetEffectRun(true);
      }
      if(EffectRun===false)
      {
        Run()
      }
          Context.FetchUser()
          Context.FetchSuggestedUsers()  
          Context.FetchFriends()  
          Context.FetchPosts()
  })

  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
 
  const handleSnackbarOpen = () => {
    setOpenSnackbar(true);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const UploadFile = ()=>
  {
        document.getElementById("fileID").click();
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('description',description);
    formData.append('testImage', file);

    try {
        const Response = await fetch( `http://localhost:3001/CreatePost`,  {
        method: "POST",
        headers:
        {
            'Authorization-Token' : localStorage.getItem('Token')       
        },
        body: formData,
      });
      const ResponseToJson = await Response.json();
      if(ResponseToJson.Success===true)
      {
        handleSnackbarOpen();
      }
  
    } catch (error) {
      console.error(error);
    }
  };

  const {friends} = Context.User;




  return (
    <>
    <NavigationBar/>

    <div className="container my-5">
        <div className="row">
            <div className="col-lg-3">
                    {Context.User &&
                    <div className="container" id="viewProfile">
                          <h6 className="ProfileText"> <b>Profile:</b> {Context.User.firstName} {Context.User.lastName}</h6>
                          <h6 className="ProfileText"> <b>Email:</b> {Context.User.email}</h6>
                          <h6 className="ProfileText"> <b>City:</b> {Context.User.city}</h6>
                          <h6 className="ProfileText"> <b>Occupation:</b> {Context.User.occupation}</h6>
                          <h6 className="ProfileText"> <b>Friends:</b> {friends.length}</h6>
                          <h6 className="ProfileText"> <b>Stars:</b> {Context.User.stars}</h6>

                    </div>
                    } 
                    <div id="conn-1">
                      <Typography>Suggestions</Typography>
                    </div>
              
                    {Context.SuggestedFriends && Context.SuggestedFriends.length > 0 &&
                      Context.SuggestedFriends.map((element) => {
                        return (
                          <UserDisplay User={element}/>
                        );
                      })}
                          


            </div>
            <div className="col-lg-6" >
              <div className="container" id="addPost">
                <form onSubmit={handleSubmit}>
                    <input className="PostDesc" type="text" value={description} onChange={handleDescriptionChange} placeholder="What's on your mind" ></input>
                    <br></br>
                    <div id="container">
                        <div class="card">
                            <div class="drop_box">
                                 <h4>Photo/Video</h4>
                                 <input className="PostPicture" type="file"  onChange={handleFileChange} id="fileID" hidden/>            
                                <button id="btn" onClick={UploadFile}>Choose File</button>
                            </div>
                        </div>
                    </div>
                    <div className="ButtonHolder">
                        <button class="button" type="submit">Create Post </button>
                    </div>
                </form>
              </div>
              <Typography>Feed</Typography>
              <div>
                  {Context.Posts && Context.Posts.length > 0 && Context.Posts.map(  (element) => 
                    {
                      return( <PostsDisplay Posts={element}/>
                      )
                  })}
              </div>
            </div>
            
            <div className="col-lg-3" >
              <div id="conn">
                <Typography>Connections</Typography>
              </div>
              {Context.Friends && Context.Friends.length > 0 && Context.Friends.map(  (element) => 
              {
                return( <FriendDisplay User={element}/>
                )
              })}
              <div id="conn">
                <Typography>Events</Typography>
              </div>
              {Context.AllEvents && Context.AllEvents.length > 0 &&              
                      Context.AllEvents.map((element) => {
                        let Already=false;
                        Context.User.events.map( (event)=>
                        {
                           if(event.eventName===element.eventName)
                           {
                             Already=true;
                           }
                        })
                        return (
                            <VeteranEventDisplay Event = { element} Already={Already}/>
                        );
                      })}


            </div>

        </div>
        <Snackbar open={openSnackbar} autoHideDuration={2000}
          onClose={() => setOpenSnackbar(false)}
          message="Following"
          severity="success"
        />

    </div>
</>
);
}
