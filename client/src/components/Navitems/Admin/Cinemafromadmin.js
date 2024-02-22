import React, { useEffect, useState, useCallback, useRef } from "react";
import Adminleftnav from "./Adminleftnav";
import Admintopnav from "./Admintopnav";
import { Link, useNavigate } from "react-router-dom";


function Cinemafromadmin(){

    const [users, showUsers] = useState();
    const [create, setCreate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secretKey, setSecretkey] = useState("");
    const [userLength, setUserLength] = useState("");
    const [err, setErr] = useState("");
    const [selectedlocation, setSelectedLocation] = useState([]);
    const [location, setLocation] = useState([]);
    const [displayUsertype, setDisplayUserType] = useState([]);
    const [displayCinema, setDisplayCinema] = useState([]);
    const [selectedCinemaName, setSelectedCinemaName] = useState([]);
    const [rendered, setRendered] = useState(false);
    const locationRef = useRef(location);


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
              setErr("Please fill all fields now!"); 
              alert("Please fill all fields! ALERT now"); 
        } 
        else {
                const newUser = { secretKey, password, email, userType:'cinemafromadmin', selectedlocation: selectedlocation};

                fetch('http://localhost:6969/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser),
                  })
                  .then(() => {
                    setEmail('');
                    setSecretkey('');
                    setPassword('');
                    alert("Theater Successfully Created")
                  })
                  .catch(err => console.log(err))
            } 
    }
    

    useEffect(() => {
      if (!rendered) {
        fetch("http://localhost:6969/location")
          .then((res) => res.json())
          .then((data) => {
                              setLocation(data.data);
                              locationRef.current = data.data;
                              setRendered(true);
          });
      } else {
        console.log("Location Unavailable");
      }
    }, [rendered]);


const handleLocationChange = (event) => {
  setSelectedLocation(event.target.value);
  alert(selectedlocation)
};

const handleCinemaChange = (event) => {
    setSelectedCinemaName(event.target.value);
    alert(selectedCinemaName);
};

    
const fetchData = useCallback(async () => {
  try {
    fetch("http://localhost:6969/users")
    .then((res) => res.json())
    .then((data) => {
                          showUsers(data);

                          const displayUserType = data.filter(user => user.userType === "cinemafromadmin");
                          setDisplayUserType(displayUserType);

                          const dc = data.filter(user => user.userType === "cinema");
                          setDisplayCinema(dc);

                          setUserLength(data.length);
                          setLoading(false);
                        });
  } 

  catch (error) {
    console.error('Error fetching data:', error);
    setLoading(false);
  }
  
}, []);


useEffect(() => {
  fetchData();
}, [fetchData]);

    
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
              fetchData();
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
                                            
                                        <div className="d-flex my-3">
                                                <div className=" registerinput mx-2">
                                                      <label htmlFor="formGroupExampleInput">Location</label>
                                                      <div>
                                                          <select className='p-2 ' onChange={handleLocationChange}>
                                                              <option value="location" disabled>Select Location</option>
                                                                  {location.map((f, index) => (
                                                                    <option key={index}>
                                                                          {f.location}
                                                                    </option>
                                                                  ))}
                                                            </select>
                                                      </div>
                                                  </div>

                                    <div className="registerinput mx-5">
                                          <label htmlFor="formGroupExampleInput">CINEMA</label>
                                          <div>
                                            <select className='p-2' onChange={handleCinemaChange} defaultValue="cinema">
                                              <option value="cinema" disabled>Select Cinema</option>
                                              {displayCinema.map((cc, index) => (
                                                cc.cinemaName && (
                                                <option key={index} className="">
                                                  {cc.cinemaName} 
                                                </option>
                                                )
                                              ))}
                                            </select>
                                          </div>
                                    </div>


                                        </div>
                                                <div className=" registerinput my-2">
                                                    <label htmlFor="formGroupExampleInput">Cinema Admin Mail</label>
                                                      <input type="email" 
                                                      className="form-control" 
                                                      placeholder="Enter Cinema Admin Mail" 
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
                              <table className="table m-3" border={"1px"}>
                                <thead>
                                        <tr>
                                            <th >ID</th>
                                            <th >UserType</th>
                                            <th >Email</th>
                                            <th >Location</th>
                                            <th >Actions</th>
                                        </tr>
                                </thead>
                                  <tbody>
                                  {
                                    displayUsertype && displayUsertype.map((user, id) => {
                                        return (
                                            <tr key={id}>
                                                <td >{user._id}</td>
                                                <td >{user.userType}</td>
                                                <td >{user.email}</td>
                                                <td >{user.selectedlocation}</td>
                                                <td>
                                                        <div>
                                                            <Link onClick={() => handleDeleteUser(user._id)}>
                                                            <i className="fa-solid fa-trash" style={{ color: "#ec1809", marginRight: "10px" }}></i>
                                                            </Link>
                                                            <Link to={"/admineditcinemafromadmin/"+user._id}>
                                                            <i className="fa-solid fa-pen-to-square" style={{ color: "#2450a8", marginRight: "10px" }} onClick={() => nav("/adminedituser", { state : users})}></i>
                                                            </Link>
                                                        </div>
                                                </td>
                                          </tr>
                                        );
                                    })
                                    }
                                  </tbody>
                                  
                              </table> 
                          </div>
                      
                    </div>
                  </div>
          </div>
        </div>
    )
}

export default Cinemafromadmin;
