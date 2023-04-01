import React from 'react'
import {Buffer} from 'buffer';
import "./styles/PostDisplay.css"

export default function VeteranEventDisplay(props)
{
    const MarkInterested = async()=>
    {
        const Response = await fetch( `http://localhost:3001/events/MarkInterested/${props.Event._id}`,
        {
            method: 'PUT',
            headers:
            { 
              'Content-Type' : 'application/json',
              'Authorization-Token' : localStorage.getItem('Token')       
            }
          })
          const ResponseToJson = await Response.json();
          if(ResponseToJson.Success)
          {
             console.log('Success')
          }
  
    }
    
    let src = "/public/favicon.ico";

    if (typeof props.Event.img.data !== 'undefined') {
        const base64String = Buffer.from( props.Event.img.data , 'base64')
        src = URL.createObjectURL(
            new Blob([base64String.buffer], { type: 'image/png' } /* (1) */)
        );  
    }

    let date = new Date(props.Event.date)
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const formattedDate = `${day}/${month}/${year}`;
  
    return (
    <>
        <div id="Posts-2" > 
            <div className='container my-1 mx-3' id="event-placeholder">
                <img id="profile" src={src} width={35} height={35} alt="Profile"/>
                <h6>{props.Event.name}</h6>
            </div>
            <div className='container my-1 mx-3' id="dated">        
                  <h6 className='event-text'>{props.Event.eventName}</h6>
                  <h6 className='event-text'> {props.Event.eventType}</h6>
            </div>
            <div className='container my-1 mx-3' id="dated">
                <h6 className='event-text-1' >Date</h6>        
                <h6 className='event-text' >{formattedDate}</h6>
                <h6 className='event-text'>{props.Event.stars}</h6>
            </div>
            <div className='container my-1 mx-3' id="dated">        
                {props.Already?(<button className='Event-btn-2' >Interested</button>
                ):
                (<button className='Event-btn' onClick={MarkInterested}>Mark As Interested</button>)}
            </div>

        </div>

    </>
)}

