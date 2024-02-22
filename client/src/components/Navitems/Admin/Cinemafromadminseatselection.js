import React, { useEffect, useState, useCallback } from "react";
import Cinemafromadminleft from "./Cinemafromadminleft";
import Admintopnav from "./Admintopnav";
import { Link } from "react-router-dom";


function Cinemafromadminseatselection(){

    const [users, showUsers] = useState();
    const [create, setCreate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userLength, setUserLength] = useState("");
    const [err, setErr] = useState("");
    const [location, setLocation] = useState([]);
    const [selectedlocation, setSelectedLocation] = useState([]);
    const [selectedusers, setSelectedUsers] = useState([]);
    const [numImages, setNumImages] = useState(0);
    const [seatnumber, setSeatNumber] = useState([]);
    const [ moviecinema, setMoviecinema] = useState([]);
    const [ dd, setDD] = useState([]);
    const [ CinAdSeat, setCinAdSeat] = useState([]);

    const [selectedOption, setSelectedOption] = useState('');

    const CinemaFromAdminId = localStorage.getItem("cinemafromadminID");
      
      const seatamount = (e) => setSeatNumber(parseInt(e.target.value, 10) || 0);

      const AddImages = () => setNumImages(seatnumber);

      localStorage.setItem("numImages", numImages);
      
      const TheImages = [];
      for (let i = 1; i <= numImages; i++) {
        TheImages.push(i);
      }

    function handlesetchange( ){
      setCreate(!create);
    }

    const submitForm = async (e) => {
      e.preventDefault();
        if (selectedlocation === "" || selectedusers==="" || users==="") { 
              setErr("Please fill all fields "); 
              alert("Please fill all fields"); 
        } 
        else {
                const newUser = {numImages, selectedOption, CinemaFromAdminId, userType:'theateradmin', selectedlocation: selectedlocation, selectedusers};

                fetch('http://localhost:6969/cinemafromadmin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser),
                  })
                  .then(() => {
                    alert("Theater Successfully Created")
                  })
                  .catch(err => console.log(err))
            } 
    }
    

    // useEffect(() => {
    //   fetch("http://localhost:6969/location", {
    //     method: "GET",
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setLocation(data.data);
    //     });
    //  }, [users]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:6969/location", {
            method: "GET",
          });
    
          const data = await response.json();
          setLocation(data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      fetchData();
    }, []);


     useEffect(() => {
        fetch('http://localhost:6969/cinema')
        .then((response) => response.json())
        .then((data) => setMoviecinema(data.data))
        .catch(error => { console.error('Error fetching data:', error)})
        }, []);

const handleLocationChange = (event) => {
  setSelectedLocation(event.target.value);
};
const handleUserChange = (event) => {
  setSelectedUsers(event.target.value);
};

const feed = useCallback(() => {
  fetch("http://localhost:6969/movie")
    .then((res) => res.json())
    .then((data) => {
      const f = data.filter((tu) => tu.cinemafromadminID);
      setCinAdSeat(f);
    });
}, []);

useEffect(() => {
  feed();
}, [feed]);


    
const Userdata = useCallback(async () => {
      fetch("http://localhost:6969/users")
      .then(res => res.json())
      .then(data => { setDD(data);
                      const f = data.filter(tu =>tu.CinemaFromAdminId === CinemaFromAdminId)                      
                      showUsers(f); 
                      setUserLength(data.length); 
                      setLoading(false); 
                    })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
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


function handleChange2(event){
    setSelectedOption(event.target.value);
  }


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

                                            <div className=" registerinput my-3">
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

                                            <div className=" registerinput my-3">
                                                <label htmlFor="formGroupExampleInput">Theater Admin </label>
                                                <div>
                                                    <select className='p-2' onChange={handleUserChange} >
                                                        <option value="location" disabled selected> <i>Select Theater Admin</i></option>
                                                            {users
                                                            .map((f, index) => (
                                                              <option key={index}>
                                                                {f.firstname}
                                                              </option>
                                                            ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className='p-1 my-3'>
                                                <div><label htmlFor="formGroupExampleInput">Movie Hall : </label></div>
                                                    <select name='selectedOption' className='p-1' placeholder="Select Theater" defaultValue={selectedOption} onChange={handleChange2} required>
                                                        <option defaultValue={selectedOption} disabled selected> <i> Movie Hall </i></option>
                                                            {
                                                                moviecinema && moviecinema.map((dat, _id) => {
                                                                if(dat.hallname){
                                                                    return(
                                                                        <option  key={_id} >
                                                                            <option className="m-1"  value={selectedOption}>{dat.hallname}</option>
                                                                        </option>
                                                                    )
                                                                } return"";
                                                                })
                                                            }
                                                    </select>  
                                            </div>

                                            <label className="">
                                              Number of Seats:
                                                <input
                                                  type="number"
                                                  defaultValue={numImages}
                                                  onChange={seatamount}
                                                  className="mx-1"
                                                />
                                            </label>
                                            <button type="button" className="btn m-2 bg-success text-white"  onClick={AddImages}>Add</button>
                      
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
                                            <th >Theater Name</th>
                                            <th >Seat Number</th>
                                            <th >Actions</th>
                                        </tr>
                                </thead>
                                  <tbody>
                                  {
                                    users && users.map((user, id) => {
                                        return (
                                            <tr key={id}>
                                                <td >{user._id}</td>
                                                <td >{user.userType}</td>
                                                <td >{user.email}</td>
                                                <td >{user.selectedlocation}</td>
                                                <td >{user.firstname}</td>
                                                <td >{user.selectedusers}</td>
                                                <td>
                                                    <div>
                                                        <Link onClick={() => handleDeleteUser(user._id)}>
                                                        <i className="fa-solid fa-trash" style={{ color: "#ec1809", marginRight: "10px" }}></i>
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

export default Cinemafromadminseatselection;
