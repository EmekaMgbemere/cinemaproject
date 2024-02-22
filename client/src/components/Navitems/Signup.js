import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { v4 as uuidv4 } from 'uuid';
import reg1 from '../images/register/reg1.jpg';


function Signup() {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [adminID, setadminID] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userType = ""; const secretKey ="";
    if (userType === "admin" && secretKey !== "2092402019") {
      alert("Invalid Admin. Please Register as a User");
    }     
    else {
      if (
        firstname === "" || lastname === "" || phonenumber === "" || email === "" || password === "" || companyAddress === "") {
        setErrorMessage("Please fill all fields!"); 
        alert("Please fill all fields!"); 
        
      } else {
          const newUser = {
            adminID,
            firstname,
            lastname,
            phonenumber,
            email,
            password,
            companyAddress, 
            companyId: uuidv4(),
            userType:'user'
          };

    fetch('http://localhost:6969/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })
      .then(() => {
        setFirstname('');
        setLastname('');
        setPhonenumber('');
        setEmail('');
        setPassword('');
        setCompanyAddress('');
        setadminID('');
                setCompanyId(uuidv4());
        alert(`New user added: ${companyId}`);
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
          <div className="emregisterform">
              <form onSubmit={handleSubmit}
              encType='multipart/form-data'>
                <h3 className="">Welcome to Eventbux</h3>
                    
                      <div className=" registerinput my-1">
                        <label htmlFor="formGroupExampleInput">First Name</label>
                          <input type="text" 
                          className="form-control" 
                          placeholder="First name" 
                          autoFocus
                          required        
                          defaultValue={firstname}
                          onChange={(e) => setFirstname(e.target.value)}           
                          />
                      </div>
                        <div className="registerinput my-2">
                        <label htmlFor="formGroupExampleInput">Last Name</label>
                          <input type="text" className="form-control" 
                          required 
                          placeholder="Last name" 
                          autoFocus
                          defaultValue={lastname}
                          onChange={(e) => setLastname(e.target.value)}
                          />
                        </div>

                        <div className="registerinput my-2">
                        <label htmlFor="formGroupExampleInput">Address </label>
                          <input type="text" className="form-control" 
                          required 
                          placeholder="Last name" 
                          autoFocus
                          defaultValue={companyAddress}
                          onChange={(e) => setCompanyAddress(e.target.value)}
                          />
                        </div>
                        <div className="registerinput my-2">
                        <label htmlFor="formGroupExampleInput">Email</label>
                        <input type="email" className="form-control" 
                        id="exampleFormControlInput1" 
                        defaultValue={email}
                          required                    
                        placeholder="name@example.com" autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                        />            
                        </div>
                        <div className="d-flex flex-sm-column flex-lg-row">
                            <div className=" registerinput m-2">
                            <label htmlFor="formGroupExampleInput">Phone Number</label>
                              <input type="phone" className="form-control" 
                              defaultValue={phonenumber}
                              required
                              placeholder="Enter Number" 
                              autoFocus
                              onChange={(e) => setPhonenumber(e.target.value)} 
                              />
                            </div>
                            <div className=" registerinput my-2">
                            <label htmlFor="formGroupExampleInput">Password</label>
                            <input type="password" className="form-control" 
                              defaultValue={password}
                              required 
                              id="inputPassword" placeholder="Password" autoFocus
                              onChange={(e) => setPassword(e.target.value)} 
                              />
                            </div>
                        </div>

                        <div className="">
                          <button className="reg_" type="submit" >SIGN UP</button>
                        </div>
                      <h6 className="m-3">Already have account?{" "}<span><Link to="/login">Log in</Link></span></h6>
                      {errorMessage && <p className="text-danger">{errorMessage}</p>} 
                        
              </form>
          </div>
            <div className="emregisterimg"> 
              <img src={reg1} alt="img" className="img-responsive" width='100%' height='100%' />
            </div>
        </div>
      </div>
    );
  }

export default Signup;
