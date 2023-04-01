import React from 'react'
import {Buffer} from 'buffer';
import "./styles/PostDisplay.css"

export default function EventPost(props)
{
    
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
        <div id="Posts-1"> 
         <div className="container my-2" id='table'>
                  <img id="profile-1" src={src} width={50} height={50} alt="Profile"/>
                  <h6 className='table-text'>{props.Event.name}</h6>
                  <h6 className='table-text'>{props.Event.eventName}</h6>
        </div>
        <div className="container my-2" id='table'>
                  <h6 className='table-text'>{formattedDate}</h6>
                  <h6 className='table-text'>{props.Event.relatedHobby}</h6>
                  <h6 className='table-text'>{props.Event.eventType}</h6>
                  <h6 className='table-text'>{props.Event.stars}</h6>
        </div>
        </div>
    </>
)}

