import React, { useEffect, useState } from "react";
import Adminleftnav from "./Adminleftnav";
import Admintopnav from "./Admintopnav";
import { useNavigate, useParams  } from "react-router-dom";


function Admineditlocation(){
    const nav = useNavigate();
    const [location, setLocation] = useState("");
    const  {id} = useParams();
  
    useEffect(() => {
      handleSaveEdit();
    });

    const handleSaveEdit = async () => {
      try {
        const response = await fetch(`http://localhost:6969/location/${id}`);
        if (response.ok) {
          const result = await response.json();
          setLocation(result.location);
        } else {
          console.error('Error fetching location data');
        }
      } 
      catch (error) {
        console.error('Error:', error);
      }
    };

    useEffect(() => {
      handleSaveEdit();
    });


      const updateLocation = async () =>{
        try{
            let response = await fetch(`http://localhost:6969/location/${id}`, 
            {
              method: 'PUT',
              body: JSON.stringify({ location }),
              headers:{
                'Content-Type': 'Application/json'
              }
            }
            );

            if (response.ok) {
              const result = await response.json();
              if (result) {
                alert("Update Successful");
                nav("/adminlocation");
              }
            } else {
                console.error("Error updating Location");
              }
          }
          catch (error) {
            console.error('Error:', error);
          }
      }
    

      

return(
<div className="">
      <div className='emadmindash'>
              <div>
                  <Admintopnav />
              </div>
              
              <div className='emaddashsmright'>
              <div>
                  <Adminleftnav/>
              </div>
                      <div>
                        <div>
                          <div className=" registerinput my-2">
                                <label htmlFor="formGroupExampleInput">Location</label>
                                  <input type="text" 
                                  className="form-control" 
                                  placeholder="Location" 
                                  defaultValue={location}
                                  onChange={(e) => setLocation(e.target.value)}           
                                  />
                          </div>
                            <div>
                                <button className="btn btn-success mx-1" onClick={updateLocation}>Save</button>
                                <button className="btn btn-danger mx-1" onClick={() => nav("/adminlocation")}>Cancel</button>
                            </div>
                          </div>
                      </div>
              </div>
      </div>
</div>
    )
}

export default Admineditlocation;

