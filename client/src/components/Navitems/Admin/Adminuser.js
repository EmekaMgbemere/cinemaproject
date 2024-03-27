import React, { useEffect, useState } from "react";
import Adminleftnav from "./Adminleftnav";
import Admintopnav from "./Admintopnav";
import { Link, useNavigate } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';



function Adminuser(){

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
    const [selectedlocation, setSelectedLocation] = useState([]);

    const nav = useNavigate();

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
              setErr("Please fill all fields NOW!"); 
              alert("Please fill all fields! ALERT NOW"); 
        } 
        else {
                const newUser = { secretKey, password, email, userType:'theateradmin', selectedlocation: selectedlocation};

                fetch('http://localhost:6969/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser),
                  })
                  .then(() => {
                    setEmail('');
                    setSecretkey('');
                    setPassword('');
                    alert("Created Successfully ")
                  })
                  .catch(err => console.log(err))
            } 
    }
    

    useEffect(() => {
      fetch("http://localhost:6969/location", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {setLocation(data.data)});
     }, []);

    


const handleLocationChange = (event) => {
  setSelectedLocation(event.target.value);
};

    
    useEffect(() => {
      if (!changed) {
      fetch("http://localhost:6969/users")
      .then(res => res.json())
      .then(data => {showUsers(data); setUserLength(data.length); setLoading(false); })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
        setChanged(true);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
    }
  }, [changed, users]);

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
                          <Adminleftnav />
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
                                                    <label htmlFor="formGroupExampleInput">Theater Admin</label>
                                                      <input type="email" 
                                                      className="form-control" 
                                                      placeholder="Enter Theater Admin name" 
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
                                            <Th >Last Name</Th>
                                            <Th >Email</Th>
                                            <Th >Phone</Th>
                                            <Th >Location</Th>
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
                                                <Td >{user.lastname}</Td>
                                                <Td >{user.email}</Td>
                                                <Td >{user.phonenumber}</Td>
                                                <Td >{user.selectedlocation}</Td>
                                                <Td>
                                                        <div>
                                                            <Link onClick={() => handleDeleteUser(user._id)}>
                                                            <i className="fa-solid fa-trash" style={{ color: "#ec1809", marginRight: "10px" }}></i>
                                                            </Link>
                                                            <Link to={"/adminedituser/"+user._id}>
                                                            <i className="fa-solid fa-pen-to-square" style={{ color: "#2450a8", marginRight: "10px" }} onClick={() => nav("/adminedituser", { state : users})}></i>
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

export default Adminuser;
