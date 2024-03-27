import React, { useCallback, useEffect, useState } from "react";
import TheaterAdminleftnav from "./TheaterAdminleftnav";
import Admintopnav from "./Admin/Admintopnav";
import { Link, useNavigate } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


function Theateradmin(){
    
    const [users, showUsers] = useState();
    const [create, setCreate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secretKey, setSecretkey] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [location, setLocation] = useState([]);
    const [book, setTBook] = useState([]);
    const [selectedlocation, setSelectedLocation] = useState([]);

    const [table, setTable] = useState([]);

    const cfai = localStorage.getItem("cfai",);

    const [err, setErr] = useState("");

    const theaterID = localStorage.getItem("theaterID");

    const nav = useNavigate();

    function handlesetchange( ){
      setCreate(!create);
      setEmail('');
      setSecretkey('');
      setPassword('');
      setErr("");
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
        if (selectedlocation === "" || email === "" || password === ""|| secretKey === "") { 
              setErr("Please fill all fields!"); 
              alert("Please fill all fields!"); 
        } 
        else {
                const newUser = { secretKey, password, email, userType:'cinemaadmin', theaterID: theaterID, selectedlocation };

                fetch('http://localhost:6969/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser),
                  })
                  .then(() => {
                    setEmail('');
                    setSecretkey('');
                    setPassword('');
                    alert("Counter Successfully Created")
                  })
                  .catch(err => console.log(err))
            } 
    }

    useEffect(() => {
      fetch("http://localhost:6969/location", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setLocation(data.data);
        });
     }, []);


const handleLocationChange = (event) => {
  setSelectedLocation(event.target.value);
};


const setThisCIn = useCallback ( async () =>{
  fetch('http://localhost:6969/theateradminbookings')
  .then((response) => response.json())
  .then((data) => {
                    setTBook(data.theaterID);
                    const filteredMovies = data.filter(cin => cin.book === theaterID);
                    setTable(filteredMovies);
                  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
  
},[theaterID])

useEffect(() => {
  setThisCIn()    
},[setThisCIn ])

    
    const Getuser = useCallback (async () =>  {
      try {
        const response = await fetch("http://localhost:6969/users");
        const data = await response.json();
    
        showUsers(data);
        setLoading(false);
    
        const fd = data.filter(item => item.theaterID === theaterID);
        setFilteredData(fd);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }, [theaterID]);
    
    useEffect(() => {
      Getuser();
    }, [Getuser]);


    if (loading) {
      return <p>Loading...</p>;
    }


    const handleDeleteUser = async (id) => {
        try {
          const response = await fetch(`http://localhost:6969/users/${id}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            const updatedUsers = users.filter(user => user._id !== id);
            showUsers(updatedUsers);
          } else {
            console.error('Error deleting user');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    return(
        <div className="">
          <div className='emadmindash '>
                  <div>
                      <Admintopnav />
                  </div>
                  <div style={{ width: "90vw" }} className="d-flex">
                      <div>
                          <TheaterAdminleftnav />
                      </div>
                      <div className="w-100">
                            {  err && <div className="text-danger"> {err}</div> }
                            <div  className="m-3">
                                <div className="d-flex justify-content-between">
                                        <Link to="">
                                              <button type="button" className="btn btn-outline-dark mx-3 " onClick={handlesetchange} ><i className="fa-solid fa-plus px-2"></i>Create</button>
                                        </Link>
                                        <div className="float-left">Theater ID: {theaterID}</div>
                                </div>
                            </div>
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
                                                <label htmlFor="formGroupExampleInput">Counter </label>
                                                  <input type="email" 
                                                  className="form-control" 
                                                  placeholder="Enter Counter Admin Name" 
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
                                                    <input type="text" className="form-control" 
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
                      <div>
                          {(!filteredData ? <p className="fs-2">Data Unavailable</p> :
                              <Table className="table m-3" border={"1px"}>
                                <Thead>
                                    <Tr>
                                        <Th >ID</Th>
                                        <Th >UserType</Th>
                                        <Th >Email</Th>
                                        <Th >selected location</Th>
                                        <Th >Actions</Th>
                                    </Tr>
                                </Thead>
                                  <Tbody>
                                  {
                                    filteredData && filteredData.map((user, id) => {
                                        return (
                                            <Tr key={id}>
                                                <Td >{user._id}</Td>
                                                <Td >{user.userType}</Td>
                                                <Td >{user.email}</Td>
                                                <Td >{user.selectedlocation}</Td>
                                                <Td>
                                                    <div>
                                                        <Link onClick={() => handleDeleteUser(user._id)}>
                                                        <i className="fa-solid fa-trash" style={{ color: "#ec1809", marginRight: "10px" }}></i>
                                                        </Link>
                                                    </div>
                                                </Td>
                                            </Tr>
                                        );
                                    })
                                  }
                                  </Tbody>
                              </Table> 
                              )}
                      </div>
                    </div>
                  </div>
          </div>
        </div>
    )
}

export default Theateradmin;