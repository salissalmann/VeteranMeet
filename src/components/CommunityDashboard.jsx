import CommunityNavigation from './CommunityNavigation'
import React , { useEffect , useState , useContext} from "react";
import { TextField, Typography ,MenuItem , Select} from "@mui/material";
import {Snackbar} from "@mui/material"
import NoteContext from '../context/NotesContext';
import EventDisplay from './EventDisplay';
import EventDisplayByCity from './EventDisplayByCity';
import EventPost from './EventPost';

export default function CommunityDashboard() 
{
    const [openSnackbar, setOpenSnackbar] = useState(false);
 
    const handleSnackbarOpen = () => {
      setOpenSnackbar(true);
    };
  
    const Context = useContext(NoteContext);
    const [eventName , SetEventName] =useState()
    const [relatedHobby , SetrelatedHobby] = useState("Select Hobby")
    const [eventType , SeteventType] = useState("Event Type")
    const [city , SetCity ]= useState("Select City")
    const [stars , SetStars] = useState();
    const [date, SetDate] = useState();

    const [RunEffect , SetRunEffect] = useState(false);
    const [Community , SetCommunity] = useState();


    const HandleCity = (event)          => { SetCity(event.target.value);     };
    const HandlerelatedHobbyValue = (event)=> { SetrelatedHobby(event.target.value);};
    const HandleeventValue = (event)=> { SeteventType(event.target.value)};
    const HandleEventName = (event)=> { SetEventName(event.target.value)}
    const HandleDate = (event)=> { SetDate(event.target.value) }
    const HandleStars = (event)=> { SetStars(event.target.value)}

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
                    Context.GetEvents();
                    Context.GetEventsByCity(Community.city)
                    Context.GetAllEvents()
                    SetRunEffect(true)                    
            }
            if(RunEffect===false)
            {
                GetDetails()
            }
        })


    const HandleSubmit = async (event)=>{
        event.preventDefault();
        const Response = await fetch( `http://localhost:3001/events/AddEvent`,
        {
            method: "POST",
            headers:
            { 
                'Content-Type' : 'application/json',
                'Authorization-Token' : localStorage.getItem('Token')       
            },
            body: JSON.stringify({eventName,city,relatedHobby,eventType,stars,date})

        });
        const ResponseToJson = await Response.json();
        if(ResponseToJson.Success===true)
        {
          handleSnackbarOpen();
        }  
    }
  return (
    <>
    { RunEffect ? (
        <>
        <CommunityNavigation/>
        <div className="container my-5">
        <div className="row">
            <div className="col-lg-3">
                    {Community &&
                    <div className="container" id="viewProfile">
                          <h6 className="ProfileText"> <b>Name:</b> {Community.name}</h6>
                          <h6 className="ProfileText"> <b>Email:</b> {Community.email}</h6>
                          <h6 className="ProfileText"> <b>Type:</b> {Community.type}</h6>
                          <h6 className="ProfileText"> <b>City:</b> {Community.city}</h6>
                    </div>
                    } 
                    <div id="conn-1">
                      <Typography>Events By You</Typography>
                    </div>

                    {Context.MyEvents && Context.MyEvents.length > 0 &&
                      Context.MyEvents.map((element) => {
                        return (
                            <EventDisplay Event={element}/>
                        );
                      })}
 


            </div>
            <div className="col-lg-6" >
              <div className="container" id="addPost">
              <h6 className="ProfileText" >Create Event</h6>
              <form onSubmit={HandleSubmit}>
                <div className="container my-2">
                        <TextField name="eventName" id="eventName" value={eventName} onChange={HandleEventName} label="Event Name" sx={{width:"50%", marginRight:"0.5%", marginLeft:"0.5%" }} />
                </div>
                <div className="container my-2">
                    <Select sx={{width:"50.5%", marginRight:"0.5%" }}
                        placeholder='RelatedHobby'
                        label="relatedHobby"
                        id="relatedHobby"
                        name="relatedHobby"
                        value={relatedHobby}
                        onChange={HandlerelatedHobbyValue}
                    >
                        <MenuItem value={'Select Hobby'}>Select Hobby</MenuItem>
                        <MenuItem value={'Business'}>Business</MenuItem>
                        <MenuItem value={'Cricket'}>Cricket</MenuItem>
                        <MenuItem value={'Hiking'}>Hiking</MenuItem>
                        <MenuItem value={'Finance'}>Finance</MenuItem>
                        <MenuItem value={'Cooking'}>Cooking</MenuItem>
                        <MenuItem value={'Photography'}>Photography</MenuItem>
                        <MenuItem value={'Dancing'}>Dancing</MenuItem>
                        <MenuItem value={'Nature'}>Nature</MenuItem>
                        <MenuItem value={'Society'}>Society</MenuItem>
                        <MenuItem value={'Music'}>Music</MenuItem>
                    
                    </Select>

                    <Select sx={{width:"49%"}}
                        placeholder='Event Type'
                        label="eventType"
                        id="eventType"
                        name="eventType"
                        value={eventType}
                        onChange={HandleeventValue}
                    >
                        <MenuItem value={'Event Type'}>Select Type of Event</MenuItem>
                        <MenuItem value={'Public Talks'}>Public Talks</MenuItem>
                        <MenuItem value={'Motivational Talks'}>Motivational Talks</MenuItem>
                        <MenuItem value={'Professional Talks'}>Professional Talks</MenuItem>
                        <MenuItem value={'Public Talks'}>Plantation Drive</MenuItem>
                        <MenuItem value={'Orphanage Visit'}>Orphanage Visit</MenuItem>
                    </Select>
                </div>
                <div className="container my-2">
                <Select sx={{width:"50.5%", marginRight:"0.5%" }}
                        placeholder='City'
                        label="city"
                        id="city"
                        name="city"
                        value={city}
                        onChange={HandleCity}
                    >
                        <MenuItem value={'Select City'}>Select City</MenuItem>
                        <MenuItem value={'Karachi'}>Karachi</MenuItem>
                        <MenuItem value={'Islamabad'}>Islamabad</MenuItem>
                        <MenuItem value={'Lahore'}>Lahore</MenuItem>
                        <MenuItem value={'Peshawar'}>Peshawar</MenuItem>
                    </Select>
                    <TextField name="stars" id="stars" value={stars} onChange={HandleStars} label="Event Stars" sx={{width:"49%" }} />

                </div>
                <div className="container my-2">
                    <input className='date' value={date} onChange={HandleDate} type="date" name="date" id="date"/>
                </div>
                <div className="ButtonHolder">
                    <button class="button" type="submit">Create Event </button>
                </div>

              </form>
              </div>
              <Typography>Feed</Typography>
              {Context.AllEvents && Context.AllEvents.length > 0 &&
                      Context.AllEvents.map((element) => {
                        return (
                            <EventPost Event = { element}/>
                        );
                      })}

            </div>
            
            <div className="col-lg-3" >
              <div id="conn">
                <Typography>Events in {Community.city}</Typography>
              </div>
              {Context.EventsByCity && Context.EventsByCity.length > 0 &&
                      Context.EventsByCity.map((element) => {
                        return (
                            <EventDisplayByCity Event={element}/>
                        );
              })}
      

            </div>

        </div>
 
    </div>
    <Snackbar open={openSnackbar} autoHideDuration={2000}
          onClose={() => setOpenSnackbar(false)}
          message="Event Created Successfully"
          severity="success"
        />

    </>
    ):(
        <div>
            Waiting...
        </div>     
    )}
    </>
  )
}
