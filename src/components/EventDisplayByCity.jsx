import React from 'react'
import "./styles/eventDisplay.css"

export default function EventDisplayByCity(props) 
{

  let date = new Date(props.Event.date)
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <>
    {props.Event &&
        <div className="container my-2" id="wrapper-1">
            <div className='wrapper-text'><b>Event Title:</b> {props.Event.eventName} </div>
            <div className='wrapper-text'><b>City:</b> {props.Event.city}</div>
            <div className='wrapper-text'><b>Type:</b> {props.Event.eventType}</div>
            <div className='wrapper-text'><b>Stars:</b> {props.Event.stars}</div>
            <div className='wrapper-text'><b>Date:</b> {formattedDate}</div>
        </div>
    }
    </>
  )
}
