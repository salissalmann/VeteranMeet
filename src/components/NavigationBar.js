import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography} from "@mui/material";
import { IoNotificationsOutline } from "react-icons/io5";
import { CgDarkMode} from "react-icons/cg"
import NoteContext from "../context/NotesContext";
import { useContext } from "react";

const NavigationBar = () => 
{
  const Context = useContext(NoteContext);
  const navigate = useNavigate()
  const UserName = `${Context.User.firstName} ${Context.User.lastName} ` ;

  return (
    <>
          <div className="row" id="nav-body">
              <div className="col-lg-4" id="nav-left">   
                        <Typography fontWeight="bold" fontSize="2.25rem" color="#69D4C6" marginLeft="3rem"  onClick={() => navigate("/home")}>VeteranMeet</Typography>
              </div>
              <div className="col-lg-4 my-2">
                        <input id="Search" required="" type="text" placeholder="Search"/>
              </div>
              <div className="col-lg-4">

                    <div>
                        <CgDarkMode className="Mode"/> 
                        <IoNotificationsOutline className="Notify"/>
                        <a class="fancy" href="/">
                            <span class="text">{UserName}</span>
                        </a>
                    </div>


              </div>
          </div>
      
    </>
  );
};

export default NavigationBar;
