import React, { useState, useEffect, useCallback } from "react";
import Admintopnav from "./Admin/Admintopnav";
import TheaterAdminleftnav from "./TheaterAdminleftnav";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';



function TheaterAdmincinema(){

    const [create, setCreate] = useState(false);
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(true);
    const [cinemas, showCinema] = useState ( " " );
    const [selectedlocation, setSelectedLocation] = useState([]);
    const [ setCinema, setThisCinema] = useState([]);
    const [ table, setTable] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secretKey, setSecretkey] = useState("");
    const [location, setLocation] = useState([]);



    const nav = useNavigate();

    const handleLocationChange = (event) => {
      setSelectedLocation(event.target.value);
    };

    const theaterID = localStorage.getItem("theaterID");

    const uniqueID = uuidv4();

    function handlesetchange( ){
      setCreate(!create);
      setEmail('');
      setSecretkey('');
      setPassword('');
      setErr("");
    }

    function locationAPI() {
      fetch("http://localhost:6969/location")
        .then((res) => res.json())
        .then((data) => {
                            setLocation(data.data);
                          })
        .catch((error) => {
                            console.error('Error fetching data:', error);
                            setLoading(false);
                          });
    }

  useEffect(() => {
    locationAPI();
  }, []);


    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:6969/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({secretKey, password, email, userType:'counter', selectedlocation, counterid: uniqueID, theaterID:theaterID }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setErr("");
          setCreate("");         
          setThisCIn();
          alert('Cinema Created Successfully');
        } 
        
        else {
          setErr(data.err);
          alert("Location Name and Cinema Name cannot be Empty.");
        }
      }    
  
      catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
      }
      
    };


    const setThisCIn = useCallback ( async () =>{
      fetch('http://localhost:6969/users')
      .then((response) => response.json())
      .then((data) => { setThisCinema(data);
                        const filteredMovies = data.filter(cin => cin.theaterID === theaterID);
                        setTable(filteredMovies);
                        setLoading(false);
                      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
      
    },[theaterID])

    useEffect(() => {
      setThisCIn()    
    },[setThisCIn ])


  
    if (loading) {
      return <p>Loading...</p>;
    }


    const handleDeleteCinema = async (id) => {
      try {
        const response = await fetch(`http://localhost:6969/cinema/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          const updatedCinemas = setCinema.filter(cinema=> cinema._id !== id);
          showCinema(updatedCinemas);
          alert("Cinema Deleted Successfuly");
          setThisCIn();
        } else {
          console.error('Error deleting cinema');
          alert("Error Deleting Cinema");

        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    
    return( 
    <div className= "">
         <div>
          <Admintopnav />
        </div>
        <div style={{ width: "90vw" }} className="d-flex">
        <div><TheaterAdminleftnav /> </div>

             <div className="w-100">
                {  err && <div className="text-color-red"> {err}</div> }
                <div  className="m-3">
                      <div  className="">
                              <Link to="">
                                    <button type="button" className="btn btn-outline-dark mx-3 " onClick={handlesetchange} ><i className="fa-solid fa-plus px-2"></i>Create</button>
                              </Link>
                      </div>
                      <div className="d-flex justify-content-end">Theater ID: {theaterID}</div>
                </div>
                    {
                       create &&
                       <div>
                       {
                         create &&
                         <div>
                           <form onSubmit={handleSubmit} enctype="multipart/form-data"> 
                                  <div className="p-3">
                                    
                                        <div className=" registerinput my-2">
                                              <label htmlFor="formGroupExampleInput">Location</label>
                                              <div>
                                                  <select className='p-2 ' onChange={handleLocationChange}>
                                                      <option value="location" disabled selected> <i>Select Location</i></option>
                                                          {location.map((f, index) => (
                                                            <option key={index}>
                                                              {f.location}
                                                            </option>
                                                          ))}
                                                  </select>
                                              </div>
                                          </div>

                                        <div className=" registerinput my-2">
                                            <label htmlFor="formGroupExampleInput">Counter Email</label>
                                              <input type="email" 
                                              className="form-control" 
                                              placeholder="Enter Counter Email" 
                                              defaultValue={email}
                                              onChange={(e) => setEmail(e.target.value)}           
                                              />
                                          </div>

                                          <div className="registerinput my-2">
                                              <label htmlFor="formGroupExampleInput">Secret Key</label>
                                                <input type="text" className="form-control" 
                                                required 
                                                placeholder="Create Secret key" 
                                                autoFocus
                                                defaultValue={secretKey}
                                                onChange={(e) => setSecretkey(e.target.value)}
                                                />
                                          </div>

                                          <div className="registerinput my-2">
                                              <label htmlFor="formGroupExampleInput">Password</label>
                                                <input type="password" className="form-control" 
                                                required 
                                                placeholder="Enter Password" 
                                                autoFocus
                                                defaultValue={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                />
                                          </div>
                                            
                                        <div className="my-4">
                                          <button className="btn btn-primary" type="submit" >Create</button>
                                        </div>
                                  </div>
                            </form> 
                         </div>                     
                       }
                 </div>                  
                        }

                <div>
                    <Table className="table mx-4"
                      border={"1px"}
                    >
                        <Thead>
                                <Tr>
                                    <Th >Counter</Th>
                                    <Th >Counter Id</Th>
                                    <Th >Theater Id</Th>
                                    <Th > ACTIONS </Th>
                                </Tr>
                        </Thead>
                          <Tbody>
                              {
                                  table && table.map((cinema, id) => {

                                      return (
                                          <Tr key={id}>
                                              <Td >{cinema.selectedlocation}</Td>
                                              <Td >{cinema._id}</Td>
                                              <Td >{cinema.theaterID}</Td>
                                              <Td >
                                                <div>
                                                    <Link onClick={() => handleDeleteCinema(cinema._id)} >
                                                      <i className="fa-solid fa-trash" style={{ color: "#ec1809", marginRight: "10px" }}></i>
                                                    </Link>
                                                    <Link to={"/admineditcinema/"+cinema._id}>
                                                      <i className="fa-solid fa-pen-to-square" style={{ color: "#2450a8", marginRight: "10px" }} onClick={() => nav("/admineditcinema", { state : setCinema})}></i>
                                                    </Link>
                                                </div>
                                              </Td>
                                          </Tr>
                                      );
                              }
                              )
                                }
                            </Tbody>
                    </Table>
                </div>
             </div>
          </div>
      </div>
    )
}

export default TheaterAdmincinema; 

