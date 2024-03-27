import React, { useEffect, useState, useCallback } from "react";
import Cinemafromadminleft from "./Cinemafromadminleft";
import Admintopnav from "./Admintopnav";
import { Link } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';



function CinemaTheater(){

    const [users, showUsers] = useState();
    const [create, setCreate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secretKey, setSecretkey] = useState("");
    const [userLength, setUserLength] = useState("");
    const [changed, setChanged] = useState(false);
    const [err, setErr] = useState("");
    const [location, setLocation] = useState([]);
    const [firstname, setFirstname] = useState("");
    const [selectedlocation, setSelectedLocation] = useState([]);

    const CinemaFromAdminId = localStorage.getItem("cinemafromadminID");



    function handlesetchange( ){
      setCreate(!create);
      setEmail('');
      setSecretkey('');
      setPassword('');
      setErr("");
    }

    const submitForm = async (e) => {
      e.preventDefault();
      
        if (secretKey === "" || selectedlocation === "" || password === "") { 
              setErr("Please fill all fields!"); 
              alert("Please fill all fields!"); 
        } 
        else {
                const newUser = { firstname, CinemaFromAdminId, secretKey, password, email, userType:'theateradmin', selectedlocation: selectedlocation};

                fetch('http://localhost:6969/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser),
                  })
                  .then(() => {
                    setEmail('');
                    setSecretkey('');
                    setPassword('');
                    Userdata();
                    alert("Theater Successfully Created")
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
     }, [users]);


const handleLocationChange = (event) => {
  setSelectedLocation(event.target.value);
};

    
const Userdata = useCallback(async () => {
      fetch("http://localhost:6969/users")
      .then(res => res.json())
      .then(data => {
                      const f = data.filter(tu =>tu.CinemaFromAdminId === CinemaFromAdminId )                      
                      showUsers(f); 
                      setUserLength(data.length); 
                      setLoading(false); 
                    })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
        setChanged(true);
      });
    },[CinemaFromAdminId])

    useEffect(() => {
      Userdata();
    }, [Userdata]); 
  
    

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

  localStorage.setItem("userLength", userLength)
   
    return(
        <div className="">
          <div className='emadmindash '>
                  <div>
                      <Admintopnav />
                  </div>
                  <div style={{ width: "90vw" }} className="d-flex">
                      <div>
                          <Cinemafromadminleft />
                      </div>
                      <div className="w-100">
                            {  err && <div className="text-danger"> {err}</div> }
                            <div  className="m-3">
                                    <Link to="">
                                          <button type="button" className="btn btn-outline-dark mx-3 " onClick={handlesetchange} ><i className="fa-solid fa-plus px-2"></i>Create</button>
                                    </Link>
                            </div>
                            <div>
                                {
                                  create &&
                                  <div>
                                    <form onSubmit={submitForm} enctype="multipart/form-data"> 
                                          <div className="p-3">
                                            


                                          <div className=" registerinput my-1">
                                      <label htmlFor="formGroupExampleInput">Theater Name</label>
                                        <input type="text" 
                                        className="form-control" 
                                        placeholder="Enter Theater Name" 
                                        autoFocus
                                        required        
                                        defaultValue={firstname}
                                        style={{width:"30%"}}
                                        onChange={(e) => setFirstname(e.target.value)}           
                                        />
                                </div>
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
                                                    <label htmlFor="formGroupExampleInput">Theater Admin Email</label>
                                                      <input type="email" 
                                                      className="form-control" 
                                                      placeholder="Enter Theater Admin Email" 
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
                              <Table className="table m-3" border={"1px"}>
                                <Thead>
                                        <Tr>
                                            <Th >ID</Th>
                                            <Th >UserType</Th>
                                            <Th >Email</Th>
                                            <Th >Location</Th>
                                            <Th >First Name</Th>
                                            <Th >Actions</Th>
                                        </Tr>
                                </Thead>
                                  <Tbody>
                                  {
                                    users && users.map((user, id) => {
                                        return (
                                            <Tr key={id}>
                                                <Td >{user._id}</Td>
                                                <Td >{user.userType}</Td>
                                                <Td >{user.email}</Td>
                                                <Td >{user.selectedlocation}</Td>
                                                <Td >{user.firstname}</Td>
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
                          </div>
                      
                    </div>
                  </div>
          </div>
        </div>
    )
}

export default CinemaTheater;
