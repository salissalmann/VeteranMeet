import React, { useState } from "react";
import NoteContext from "./NotesContext";

const NotesStates = (props)=>
{
    
    const UserObject = [];
    const [User , SetUser] = useState(UserObject)

    const SuggestedObject = []
    const [SuggestedFriends , SetSuggestedFriends] = useState(SuggestedObject)

    const FriendsObject = []
    const [Friends , SetFriends] = useState(FriendsObject)
     
    const [Posts , SetPosts ] =useState();
 
    const FetchUser  = async() =>
    {
       const Response = await fetch( "http://localhost:3001/authorization/GetUserDetails",
       {
          method: 'GET',
          headers:
          { 'Content-Type' : 'application/json',
            'Authorization-Token' : localStorage.getItem('Token')       
          }
        })
        const ResponseToJson = await Response.json();
        SetUser(ResponseToJson)
    }
 
    const StoreUser = (Object)=>
    {
        UserObject.push(Object);
        SetUser(UserObject[0]);
    }

    const FetchSuggestedUsers = async() =>
    {
       const Response = await fetch( "http://localhost:3001/retrieval/SuggestedUsers",
       {
          method: 'GET',
          headers:
          { 'Content-Type' : 'application/json',
            'Authorization-Token' : localStorage.getItem('Token')       
          }
        })
        const ResponseToJson = await Response.json();
        SetSuggestedFriends(ResponseToJson);
    }
    
    const FetchFriends = async() =>
    {
       const Response = await fetch( "http://localhost:3001/retrieval/GetFriends",
       {
          method: 'GET',
          headers:
          { 'Content-Type' : 'application/json',
            'Authorization-Token' : localStorage.getItem('Token')       
          }
        })
        const ResponseToJson = await Response.json();
        SetFriends(ResponseToJson);        
    }
 
    const FetchPosts = async() =>
    {
      const Response = await fetch( "http://localhost:3001/posts/GetPosts",
      {
         method: 'GET',
         headers:
         { 
           'Authorization-Token' : localStorage.getItem('Token')       
         }
       })
       const ResponseToJson = await Response.json();
       SetPosts(ResponseToJson)
    }
 

    const AddPost = async ( description , picturePath) =>
    {
      const formData = new FormData();
      formData.append("picture", picturePath);
      formData.append("description", description);

        const Response = await fetch( `http://localhost:3001/notes/CreatePost`,
        {
            mode: "no-cors",
            method: 'POST',
            headers:
            { 'Content-Type' : 'application/json',
              'Authorization-Token' : localStorage.getItem('Token')      
            },
            body: formData
        })
        
        const ResponseToJson = await Response.json();
        console.log(ResponseToJson);
      }

      
    const [MyEvents , SetMyEvents] = useState([])
    const GetEvents = async() =>
    {
      const Response = await fetch( "http://localhost:3001/events/GetEvents",
      {
          method: 'POST',
          headers:
          { 
            'Content-Type' : 'application/json',
            'Authorization-Token' : localStorage.getItem('Token')       
          }
        })
        const ResponseToJson = await Response.json();
        SetMyEvents(ResponseToJson);
    }

    const [EventsByCity , SetEventsByCity] = useState([])
    const GetEventsByCity = async(city) =>
    {
      const Response = await fetch( `http://localhost:3001/events/GetEventsByCity/${city}`,
      {
          method: 'POST',
          headers:
          { 
            'Content-Type' : 'application/json',
            'Authorization-Token' : localStorage.getItem('Token')       
          }
        })
        const ResponseToJson = await Response.json();
        SetEventsByCity(ResponseToJson);
    }

const [AllEvents , SetAllEvents] = useState([])
const GetAllEvents = async() =>
{
  const Response = await fetch( `http://localhost:3001/events/GetAllEvents`,
  {
      method: 'GET',
      headers:
      { 
        'Content-Type' : 'application/json',
      }
    })
    const ResponseToJson = await Response.json();
    SetAllEvents(ResponseToJson)
}


    return (
        <NoteContext.Provider value={ { FetchUser , StoreUser,  User, SetUser , FetchSuggestedUsers , FetchPosts , Posts ,  SuggestedFriends , FetchFriends , Friends ,GetEvents , MyEvents , GetEventsByCity , EventsByCity, GetAllEvents , AllEvents , AddPost }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NotesStates;