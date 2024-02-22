import React, { useState, useEffect } from "react";
import Adminleftnav from "./Adminleftnav";
import Admintopnav from "./Admintopnav";
import { useNavigate, useParams  } from "react-router-dom";


function Admineditcinema(){
    const nav = useNavigate();
    const [ cinemaname, setCinemaName] = useState("");
    const  {id} = useParams();


        const handleSaveEdit = async () => {
            try {
              const response = await fetch(`http://localhost:6969/users/${id}`);
              if (response.ok) {
                const result = await response.json();
                setCinemaName(result.secretKey);
              } else {
                console.error('Error fetching Cinema data');
              }
            } catch (error) {
              console.error('Error:', error);
            }
          };
    
          useEffect(() => {
            handleSaveEdit();
          });
    
          
        const updateCinema =async () =>{
          try{
            let response = await fetch(`http://localhost:6969/users/${id}`, 
            {
              method: 'PUT',
            body: JSON.stringify({cinemaname}),
            headers:{
              'Content-Type': 'Application/json'
            }
            });


          if (response.ok) {
              const result = await response.json();
              if (result) {
                alert("Update Successful");
                nav("/admincinema");
              }
            } else {
                console.error("Error updating Cinema");
              }
          }
          catch (error) {
            console.error("Error:", error);
          } 
        }

     
    return( 
    <div className= "d-flex">
          <div>
                  <Adminleftnav />
          </div>
          <div style={{"width": "100vw"}} className="container">
                <div className="my-3">
                    <Admintopnav />
                </div>
                  <div>
                      <div className=""> 
                            <div className="my-3">
                                  <label htmlFor="formGroupExampleInput">Cinema</label>
                                  <input type="text" 
                                        className="form-control" 
                                        onChange={(e) => setCinemaName(e.target.value)}  
                                        id="inputText" 
                                        placeholder="Enter Cinema Name "
                                         autoFocus  
                                         defaultValue={cinemaname}
                                  />
                            </div>
                            <div>
                                    <button className="btn btn-success mx-1" onClick={updateCinema}>Save</button>
                                    <button className="btn btn-danger mx-1" onClick={() => nav("/admincinema")}>Cancel</button>
                                </div>
                      </div>
                  </div>  
          </div>
      </div>
    )
}

export default Admineditcinema; 

