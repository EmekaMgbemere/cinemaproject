import React, { useState, useEffect, useCallback } from "react";
import Adminleftnav from "./Adminleftnav";
import Admintopnav from "./Admintopnav";
import { Link, useNavigate } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


function Adminlocation() {
  const [create, setCreate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLocation, setShowLocation] = useState ("");
  const [image, setImage] = useState([]);
  const [ thisLocation, setThisLocation] = useState([]);
  const [location, setLocation] = useState("");
  const [locnum, setLocnum] = useState("");
  const [err, setErr] = useState("");
  const [allImage, setAllImage] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [street, setStreet] = useState([]);
  const [housenumber, setHousenumber] = useState([]);


  const nav = useNavigate();


  useEffect(() => {
    fetch('http://localhost:3000/location')
      .then(response => response.json())
      .then(data => {
                        setThisLocation(data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [thisLocation]);


  function convertToBase64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("error: ", error);
    };
  }

  const uploadImage = async (e) => {
    if (!location || !image) {
      alert("Please Provide Data for all fields");
      setErr("Please Provide Data for all fields");
    } 
    else {
        const response = await fetch("http://localhost:6969/location", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            base64: image,
            location: location,
            state:state,
            city:city,
            street:street,
            housenumber:housenumber          
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.status);
        }

        const responseData = await response.json();

        if (responseData.status === "ok") {
          setErr("");
          setLocation("");
          setCreate("");
          setState("");
          setCity("");
          setStreet("");
          setHousenumber("");
          alert("Location Created Successfully");
        } else {
          alert("Error. Please Retry")
        }
    }
  };


  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:6969/location", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setAllImage(data.data);
      setLocnum(data.data.length);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []); 

  useEffect(() => {
    fetchData();
  }, [fetchData, showLocation]); 

  
    const handleDeleteLocation = async (id) => {
    try {
      const response = await fetch(`http://localhost:6969/location/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedLocation = thisLocation.filter(location=> location._id !== id);
        setShowLocation(updatedLocation);
        alert("Location Deleted Successfuly");
      } else {
        console.error('Error deleting cinema');
        alert("Error Deleting Location");

      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  if (loading) {
    return <p>Loading...</p>;
  }


  function handlesetchange() {
    setCreate(!create);
  }

  localStorage.setItem("locnum", locnum)


  return (
    <>
      <div className="">
        <div>
          <Admintopnav />
        </div>
        <div className="d-flex">
            <div className="">
              <Adminleftnav />
            </div>
            <div className="">
              <div> {err && <div className="text-danger"> {err}</div>}</div>
                  <div>
                      <div className="m-4">
                            <Link to="">
                              <button
                                type="button"
                                className="btn btn-outline-dark mx-3 "
                                onClick={handlesetchange}
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                              >
                                <i className="fa-solid fa-plus px-2"></i>Create
                              </button>
                            </Link>
                      </div>
                      {create && (
                        <div>
                          <form>
                              <div className="emmoviedisplay">
                                  <div className="m-4 ">
                                  <label>Theater State</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setState(e.target.value)}
                                    value={state}
                                    placeholder="Enter State Name"
                                  />
                                  </div>
                                  <div className="m-4 ">
                                    <label>Theater City</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      onChange={(e) => setCity(e.target.value)}
                                      value={city}
                                      placeholder="Enter City Name"
                                    />
                                  </div>
                                  <div className="m-4 ">
                                    <label>Theater Street</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      onChange={(e) => setStreet(e.target.value)}
                                      value={street}
                                      placeholder="Enter Street Name"
                                    />
                                  </div>
                              </div>
                              <div className="emmoviedisplay">
                                    <div className="m-4 ">
                                      <label>Theater House Number</label>
                                      <input
                                        type="number"
                                        className="form-control"
                                        onChange={(e) => setHousenumber(e.target.value)}
                                        value={housenumber}
                                        placeholder="Enter House Number"
                                      />
                                    </div>
                                    <div className="m-4 ">
                                      <label>Theater Name</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => setLocation(e.target.value)}
                                        value={location}
                                        placeholder="Enter Theater Name"
                                      />
                                    </div>
                              </div>
                            <div className="m-4 ">
                              <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                placeholder="locimg"
                                onChange={convertToBase64}
                              />
                            </div>
                            <div className="m-4">
                              {image === "" || image == null ? (
                                ""
                              ) : (
                                <img width={100} height={100} src={image} alt="" />
                              )}
                            </div>
                            <button className="btn btn-primary m-4" onClick={uploadImage}>
                              Create
                            </button>
                          </form>
                        </div>
                      )}
                  </div>
                <div className="">
              <Table className="table"
                  border={'1px'}
                  >
                    <Thead>
                      <Tr>
                        <Th>Location</Th>
                        <Th>Picture</Th>
                        <Th>State</Th>
                        <Th>City</Th>
                        <Th>Street</Th>
                        <Th>House Number</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody className="">
                      {allImage.map((data, _id) => (
                        <Tr key={data._id}>
                          <Td >{data.location}</Td>
                          <Td><img width={50} height={50} src={data.image} alt="thisimg" /></Td>
                          <Td >{data.state}</Td>
                          <Td >{data.city}</Td>
                          <Td >{data.street}</Td>
                          <Td >{data.housenumber}</Td>
                          <Td >
                            <div >
                                <Link onClick={() => handleDeleteLocation(data._id)} >
                                <i className="fa-solid fa-trash" style={{ color: "#ec1809", marginRight: "10px" }}></i>
                                </Link>
                                <Link to={"/admineditlocation/"+data._id}>
                                <i className="fa-solid fa-pen-to-square" style={{ color: "#2450a8", marginRight: "10px" }} onClick={() => nav("/admineditlocation", { state : thisLocation})}></i>
                                </Link>
                            </div>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </div>
            </div>
           
        </div>
        
      </div>
    </>
  );
}

export default Adminlocation;