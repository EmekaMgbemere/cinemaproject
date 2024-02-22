import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import reg1 from '../images/register/reg1.jpg';



  function Cinemalogin (){
    
  const [countername, setCountername] = useState("");
  const [password, setpassword] = useState("");
  const [err, setErr] = useState("");
  const [cinemaAdmin, setcinemaAdmin] = useState("");

  const nav = useNavigate();

   const handleSubmit = async(e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:6969/cinema', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ countername, password }),
    }) 

    const data = await response.json();

    if (response.ok) {
      const userId = data.user._id;
      localStorage.setItem("userId", userId);


      const backendUsertype = data.user.userType;
      localStorage.setItem("bkusertype", backendUsertype);
      alert(`Welcome, ${backendUsertype}`)


      if(backendUsertype === "cinemaadmin"){
        setcinemaAdmin("cinemaadmin");
        localStorage.setItem("cinemaAdmin", cinemaAdmin);
        alert(`Welcome, ${backendUsertype}`)
        nav('/cinemahall')
      }
      
      else{
        nav('/movies');
      }


    }     
    
    else {
      setErr(data.error);
      alert("FATAL ERROR");
      setCountername("");
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
                            <input type="countername" className="form-control" 
                            id="exampleFormControlInput1" 
                            onChange={(e) => setCountername(e.target.value)} 
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

export default Cinemalogin;