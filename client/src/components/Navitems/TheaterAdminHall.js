import React, { useState, useEffect,useCallback } from "react";
import Admintopnav from "./Admin/Admintopnav";
import TheaterAdminleftnav from "./TheaterAdminleftnav";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';




function TheaterAdminHall(){

    const [create, setCreate] = useState(false);
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(true);
    const [ movielocation, setMovieLocation] = useState([]);
    const [ hallname, setHallname] = useState([]);
    const [ movloc, setMovLoc] = useState([]);
    const [cinemas, showCinema] = useState ( " " );
    const [ setCinema, setThisCinema] = useState([]);


    const nav = useNavigate();

    const uniqueID = uuidv4();
    const theaterID = localStorage.getItem("theaterID");

    useEffect(() => {
      fetch('http://localhost:6969/location')
        .then(response => response.json())
        .then(data => setMovLoc(data.data))
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        })
      }, [loading]);

      
    function handlesetchange( ){
      setCreate(!create);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:6969/cinema', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({  movielocation, hallid: uniqueID, hallname, theaterid:theaterID }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setErr("");
          setCreate("");         
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

  const cin = useCallback( async()=> {
    fetch('http://localhost:6969/cinema')
      .then((response) => response.json())
      .then((data) => {
                        setThisCinema(data.data);
                        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  },[]);

  useEffect(() => {
    cin()  
  },[cin, setCinema])

  
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
        } else {
          console.error('Error deleting cinema');
          alert("Error Deleting Cinema");

        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    

    function handleMovieLocation(e){
      setMovieLocation(e.target.value);
    }


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
                        <form onSubmit={handleSubmit} encType="multipart/form-data"> 
                          <div > 
                            <div className="mx-4"> 
                                <div className="mx-1">
                                    <p>Location</p>
                                      <select name='selectedDate' onClick={handleMovieLocation} className='p-2' required>
                                          <option value="location" disabled 
                                              placeholder="Select Location . . . "> 
                                              Select Location...
                                          </option>
                                          {movloc && movloc.map((dat, _id) => {
                                            return(
                                              <option key={_id}>
                                                <p className=''>{dat.location}</p>
                                              </option>
                                            )
                                          })}
                                      </select> 
                                  </div>
                                  <div className="my-3">
                                        <label htmlFor="formGroupExampleInput">Hall Name</label>
                                        <input type="text" className="form-control" 
                                              onChange={(e) => setHallname(e.target.value)}  
                                              id="inputText" placeholder="Enter Hall Name " autoFocus  
                                        />
                                  </div>                             
                            </div>
                                <div className="m-4">
                                    <button className="btn btn-primary" type="submit" >Create</button>
                                </div>
                          </div>
                        </form> 
                      </div>                     
                        }
                <div>
                    <Table className="table mx-4"
                      border={"1px"}
                    >
                        <Thead>
                                <Tr>
                                    <Th >Hall Name</Th>
                                    <Th >Hall Id</Th>
                                    <Th > ACTIONS </Th>
                                </Tr>
                        </Thead>
                          <Tbody>
                              {
                                  setCinema && setCinema.map((cinema, id) => {
                                    if(cinema.hallname && cinema.hallid){
                                      return (
                                          <Tr key={id}>
                                              <Td >{cinema.hallname}</Td>
                                              <Td >{cinema.hallid}</Td>
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
                                      )
                                    } return "";
                                  })
                                }
                            </Tbody>
                    </Table>
                </div>
             </div>
          </div>
      </div>
    )
}

export default TheaterAdminHall; 

