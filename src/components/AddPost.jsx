import React, { useContext, useState } from "react";
import NavigationBar from "./NavigationBar"
import NoteContext from "../context/NotesContext";

export default function AddNotes() {
  const Context = useContext(NoteContext);

  const [Description, setDesc] = useState(""); /*Array Destructuring*/
  const [File , setFile] = useState("");

  const HandleDescValue = (event) => {
    setDesc(event.target.value);
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();

    Context.AddPost( Description, File );
  };

  return (
    <>
      <NavigationBar />

      <div className="container my-4">
        <h3>Add Post</h3>
        <div className="main">
          <div className="signup-form my-2">
            <div className="container ">
              <form onSubmit={HandleSubmit}>

                <div className="container" style={{ marginTop: "20px" }}>
                 <textarea class="form-control"type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Enter Description"
                    onChange={HandleDescValue}
                 ></textarea>
                </div>

                <input type="file" name="picture" onChange={handleFileChange} />
                <input className="signup-btn" type="submit" value="Add Article" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
