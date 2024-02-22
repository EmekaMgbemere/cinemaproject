import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import reg1 from '../images/register/reg1.jpg';



  function Login (){
    
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [err, setErr] = useState("");
  const [cinemaAdmin, setcinemaAdmin] = useState("");
  const [admin, setAdmin] = useState("");
  const [theateradmin, setTheateradmin] = useState("");
  const [cinemafromadmin, setCinemafromadmin] = useState([]);

  const nav = useNavigate();

   const handleSubmit = async(e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:6969/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }) 

    const data = await response.json();

    if (response.ok) {
      const userId = data.user._id;
      localStorage.setItem("userId", userId);

      const adminToken = data.token;
      localStorage.setItem("adminToken", adminToken);

      setErr('')

      const userFname = data.user.firstname;
      localStorage.setItem('UserFname', userFname);

      const backendUsertype = data.user.userType;
      localStorage.setItem("bkusertype", backendUsertype);
      alert(`Welcome, ${backendUsertype}`)


      if(backendUsertype === "counter"){
        setcinemaAdmin("cinemaadmin");
        localStorage.setItem("cinemaAdmin", cinemaAdmin);
        localStorage.setItem("cinemaAdminId", userId);
        const TID = data.user.theaterID;
        localStorage.setItem("theaterId", TID);
        nav('/cinemahall')
      }

      else if(backendUsertype === "admin"){
        setAdmin("admin");
        localStorage.setItem("admin", admin);
        const adminid = data.user._id;
        localStorage.setItem("adminid", adminid);
        // alert(`ADMIN ID: ${adminid}`);
        nav('/admindashboard');      
      }

      else if(backendUsertype === "cinema"){
        setAdmin("admin");
        localStorage.setItem("admin", admin);
        const cinemaId = data.user._id;
        localStorage.setItem("cinemaId", cinemaId);
        // alert(`ADMIN ID: ${cinemaId}`)
        nav('/cinematheater');      
      }
      
      else if(backendUsertype === "theateradmin"){
        setTheateradmin("theateradmin");
        localStorage.setItem("theateradmin", theateradmin);
        localStorage.setItem("cfai", data.user.CinemaFromAdminId);
        localStorage.setItem("cfailoc", data.user.selectedlocation);
        localStorage.setItem("theaterID", userId);
        // alert(`THIS IS THE location, ${localStorage.getItem("cfailoc")}`)
        nav('/theateradmin');      
      }

      else if(backendUsertype === "cinemafromadmin"){
        setCinemafromadmin("cinemafromadmin");
        localStorage.setItem("cinemafromadmin", cinemafromadmin);
        localStorage.setItem("cinemafromadminID", userId);
        // alert(`THIS IS THE cinemafromadminID, ${userId}`);
        nav('/cinematheater');      
      }
      
      else{
        nav('/movies');
      }

    }     
    
    else {
      setErr(data.error);
      alert("FATAL ERROR");
      setemail("");
      setpassword("");
    }


  };


  return (
    
    <div className="bg-black">
        <Nav />
        <div className="emregister ">
            <div className="emregisterform ">
                <form onSubmit={handleSubmit}>
                  <p className="fs-3">Welcome to Eventbux</p>
                  {err && <div className='text-danger align-self-center'>{err} </div>}
                      <div className=""> 
                     
                        <div className="registerinput my-3">
                          <label htmlFor="formGroupExampleInput">Email</label>
                            <input type="email" className="form-control" 
                            id="exampleFormControlInput1" 
                            onChange={(e) => setemail(e.target.value)} 
                            placeholder="" autoFocus/>            
                        </div>
                        <div className=" registerinput my-3">
                              <label htmlFor="formGroupExampleInput">Password</label>
                              <input type="password" className="form-control" 
                              onChange={(e) => setpassword(e.target.value)}  
                              id="inputPassword" placeholder="Password" autoFocus/>
                        </div>
                        <div className="m-3">
                            <button className="reg_" type="submit" >Login</button>
                        </div>
                        <div>
                        <p>Don't have an account, <button className="reg_"><Link to="/signup" style={{textDecoration: "none", color:"white"}} >Signup</Link></button></p>
                      </div>
                      </div>
                </form>
            </div>
            <div className="emregisterimg"> 
                <img src={reg1} alt="img here" className="img-responsive" width='100%' height='auto'/>
            </div>
        </div>

    </div>
  );
}

export default Login;
