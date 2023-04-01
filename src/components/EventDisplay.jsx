import React from 'react'
import "./styles/eventDisplay.css"
import {AiOutlineDelete} from "react-icons/ai"
export default function EventDisplay(props) 
{
  const DeleteEvent = async()=>
  {
    const Response = await fetch( `http://localhost:3001/events/DeleteEvent/${props.Event._id}`,
    {
        method: 'DELETE',
        headers:
        {   
            'Content-Type' : 'application/json',
            'Authorization-Token' : localStorage.getItem('Token')       
        }
    })
  }

  return (
    <>
    {props.Event &&
        <div className="container my-2" id="wrapper-1">
            <div className='wrapper-text'><b>Event Title:</b> {props.Event.eventName} </div>
            <div className='wrapper-text'><b>City:</b> {props.Event.city}</div>
            <div className='wrapper-text'><b>Type:</b> {props.Event.eventType}</div>
            <button className='sample-btn' onClick={DeleteEvent}>Suspend Event <AiOutlineDelete/> </button>            
        </div>
    }
    </>
  )
}
