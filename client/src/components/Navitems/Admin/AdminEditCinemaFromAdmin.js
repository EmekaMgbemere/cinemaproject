import React, { useCallback, useEffect, useState } from "react";
import Adminleftnav from "./Adminleftnav";
import Admintopnav from "./Admintopnav";
import { useNavigate, useParams  } from "react-router-dom";


function AdminEditCinemaFromAdmin(){
    const nav = useNavigate();
    // const [editingUserId, setEditingUserId] = useState(null);
    const [selectedlocation, setselectedLocation] = useState("");
    const [email, setEmail] = useState("");
    const  params = useParams();

  
    const handleCancelEdit = () => {
      // setEditingUserId(null);
       nav("/cinemafromadmin");
    };

          const handleSaveEdit = useCallback (async () => {
            try {
              const response = await fetch(`http://localhost:6969/users/${params.id}`);
              if (response.ok) {
                const result = await response.json();
                setselectedLocation(result.selectedlocation);
                setEmail(result.email);
              } else {
                console.error('Error fetching user data');
              }
            } catch (error) {
              console.error('Error:', error);
            }
          },[params.id]);

          useEffect(() => {
            handleSaveEdit();
          }, [handleSaveEdit]);


          const updateUser =async () =>{
            let result = await fetch(`http://localhost:6969/users/${params.id}`, 
            {
              method: 'PUT',
            body: JSON.stringify({ selectedlocation, email }),
            headers:{
              'Content-Type': 'Application/json'
            }
            });
            result = await result.json();
            if( result ){
            alert("Update Successful");
            nav("/adminuser");
            }
          } 
    

    return(
<div className="">
      <div className='emadmindash d-flex'>
              <div>
                  <Adminleftnav/>
              </div>
              <div className='emaddashsmright'>
                      <div>
                          <Admintopnav />
                      
                          <div className=" registerinput my-2">
                                <label htmlFor="formGroupExampleInput">Location</label>
                                  <input type="text" 
                                  className="form-control" 
                                  placeholder="First name" 
                                  defaultValue={selectedlocation}
                                  onChange={(e) => setselectedLocation(e.target.value)}           
                                  />
                          </div>
                          <div className="registerinput my-2">
                              <label htmlFor="formGroupExampleInput">Email</label>
                              <input type="email" 
                              className="form-control" 
                              id="exampleFormControlInput1" 
                              defaultValue={email}
                                required                    
                              placeholder="name@example.com" autoFocus
                              onChange={(e) => setEmail(e.target.value)}
                              />            
                          </div>
                          <div>
                              <button className="btn btn-success mx-1" onClick={updateUser}>Save</button>
                              <button className="btn btn-danger mx-1" onClick={handleCancelEdit}> Cancel</button>
                          </div>
                      </div>
              </div>
      </div>
</div>
    )
}

export default AdminEditCinemaFromAdmin;

