import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import reg1 from '../images/register/reg1.jpg';


function Cinemaadmin() {

  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  // const [counterId, setCounterid] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  const navigate = useNavigate();

  const counterid = localStorage.getItem("userId");


  const handleSubmit = async (e) => {
    e.preventDefault();
     if(secretKey !== "cinemaadmin"){
        alert("Invalid Admin. Please Register as a User");
    }   
    else if(secretKey === "cinemaadmin"){
      if (phonenumber === "" || email === "" || password === "" ) {
        setErrorMessage("Please fill all fields!"); 
        alert("Please fill all fields!"); 
      } else {
          const newUser = {
            phonenumber,
            email,
            password,
            userType: "cinemaadmin",
            counterId:counterid
          };

    fetch('http://localhost:6969/cinemaadmin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(newUser),
      })
      .then(() => {
        setPhonenumber('');
        setEmail('');
        setPassword('');
        alert('New user added');
        navigate('/login');
      })
      .catch(err => console.log(err))
    } 
  }
  }

    return (
      <div className="bg-black">
        <Nav />
        <div className="emregister">
          <div className="emregisterform ">
              <form onSubmit={handleSubmit}
              encType='multipart/form-data'>
                <h3 className="">Welcome to Eventbux</h3>
                    <div className="mb-3">
                        <label>Secret Key</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Secret Key"
                          onChange={(e) => setSecretKey(e.target.value)}
                        />
                      </div>
                        <div className=" registerinput my-2">
                        <label htmlFor="formGroupExampleInput">Phone Number</label>
                          <input type="phone" className="form-control" 
                          defaultValue={phonenumber}
                          required
                          placeholder="Enter Number" 
                          autoFocus
                          onChange={(e) => setPhonenumber(e.target.value)} 
                          />
                        </div>
                        <div className="registerinput my-2">
                        <label htmlFor="formGroupExampleInput">Email</label>
                        <input type="email" className="form-control" 
                        id="exampleFormControlInput1" 
                        defaultValue={email}
                          required                    
                        placeholder="name@example.com" 
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                        />            
                        </div>
                        <div className=" registerinput my-2">
                        <label htmlFor="formGroupExampleInput">Password</label>
                        <input type="password" className="form-control" 
                          defaultValue={password}
                          required 
                          id="inputPassword" 
                          placeholder="Password" 
                          autoFocus
                          onChange={(e) => setPassword(e.target.value)} 
                          />
                        </div>
                      <h6>Already have account?{" "}<span><Link to="/login">Log in</Link></span></h6>
                      {errorMessage && <p className="text-danger">{errorMessage}</p>} 
                        <div className="">
                          <button className="reg_" type="submit" >SIGN UP</button>
                        </div>
              </form>
            
          </div>
            <div className="emregisterimg"> 
              <img src={reg1} alt="img" className="img-responsive" width='100%' height='100%' />
            </div>
        </div>
      </div>
    );
  }

export default Cinemaadmin;