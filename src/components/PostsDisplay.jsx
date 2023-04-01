import React, {useEffect , useState} from 'react'
import {Buffer} from 'buffer';
import "./styles/PostDisplay.css"
import { Typography } from "@mui/material";
import { AiOutlineLike , AiOutlineComment } from "react-icons/ai"

export default function PostsDisplay(props)
{
    const [User, SetUser] = useState()
    const [Eff , SetEff] = useState(false)
    useEffect( ()=>{
        const Run = async()=>
        {
            const Response = await fetch( `http://localhost:3001/authorization/GetProfile/${props.Posts.user}`,
            {
              method: "GET",
            }
          );
          const ResponseToJson = await Response.json();
          SetUser(ResponseToJson)
          SetEff(true)
      }
      Run()
    })
    
    let src = "/public/favicon.ico";
    let src2 = "/public/favicon.ico";

    if (typeof props.Posts.img.data !== 'undefined') {
        const base64String = Buffer.from( props.Posts.img.data , 'base64')
        src = URL.createObjectURL(
            new Blob([base64String.buffer], { type: 'image/png' } /* (1) */)
        );  
    }
    if(Eff)
    {
        if (typeof User[0].img.data !== 'undefined') {
            const base64String = Buffer.from( User[0].img.data , 'base64')
            src2 = URL.createObjectURL(
                new Blob([base64String.buffer], { type: 'image/png' } /* (1)*/ )
            );  
        }
    }
    const today = new Date();
    const date = today.toLocaleDateString();

    return (
    <>
        {Eff ? (
        <div id="Posts"> 
         <div className='UserDetails'>
              <div className="container" id="UserPicture">
                    <img id="profile" src={src2} width={50} height={50} alt="Profile"/>
              </div>
              <div className="container my-2" id="Username">
                  <Typography>{User[0].firstName} {User[0].lastName} </Typography>
                  <Typography>{date}</Typography>
             </div>
         </div>
         {props.Posts.description &&
         <>
           <h1 className='post-desc'>{props.Posts.description}</h1>
           <div className='post-container'>          
                <img id="post-picture"src={src} width={500} height={500} alt="Post"/>
            </div>          
            <div className='comments'>
                    <AiOutlineComment/>
                    <AiOutlineLike className='Like'/>

            </div>
          </>
        }   
        </div>
         ) : (
        <div>
              <Typography>Waiting for data...</Typography>
        </div>)}
    
    </>
  )
}
