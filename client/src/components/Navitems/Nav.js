import React, {useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import eventbuxicon from '../images/eventbuxicon.png';


function Nav() {  
  const loggedInUserType = localStorage.getItem("bkusertype");
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);


  const navigate  = useNavigate();

    const handleLogout = async () => {
      localStorage.clear();
      navigate("/movies")
  };


  const fetchMovies = () => {
    fetch("http://localhost:6969/movie")
      .then((res) => res.json())
      .then((data) => setFilterData(data))
      .catch(err => console.log(err))
  };

  useEffect(() => {
    const dmov = setTimeout(() =>{fetchMovies()}, 10000); 
    return () => {clearTimeout(dmov)};
  },[]);



  const handleChange = (value) => {
  const res = filterData.filter(f => f.movietitle.toLowerCase().includes(value));
  setData(res);  

  if(value===""){
    setData([]);
  }
};

function admindashboard(){
  navigate("/admindashboard")
}

const click = () =>{
  setSearchVisible(!searchVisible);
}


const backendUsertype = localStorage.getItem("bkusertype");


return(
<div className=''>
      <div className="emnavdiv">
          
          <nav className="navbar navbar-expand-lg navbar-inverse sticky-top">
            
            <div className="container-fluid">
                            <a className="navbar-brand" href="/">
                                <img src={eventbuxicon} alt='eventbuxicon' style={{width:'100px', height:'60px'}} className="d-inline-block align-text-top" />
                            </a>
                            
                            <div className='emshownavlinksaa emshownavlinksa'>

                                <Link to='/locationroute' style={{'textDecoration':'none', color:"white" }} className='emshownavlinks1 px-3' >
                                    Find a Theater
                                </Link>

                                <Link to='/movies ' style={{'textDecoration':'none', color:"white", borderLeft:"1px solid white"}} className='emshownavlinks1 px-2 '>
                                    <li className="nav-item">
                                        <i className="fa-solid fa-video px-2"></i>See a Movie
                                    </li>
                                </Link>
                            </div>

                          <div className='emnavsearchdiv'>
                                <div className='emloc'>
                                    <input 
                                      type='search'
                                      placeholder='Enter Movie Name'
                                      id='emnavsearch'
                                      onChange={e => handleChange(e.target.value)}   
                                      className='bg-transparent' 
                                      style={{borderRadius:"15px", border:"1px solid gray", padding:"0 10px", color:"#fff"}}
                                    />
                                </div>
                                <div className='emnavsearchdivsearchbsmall'>
                                    <div className='emnavsearchres'>
                                      { 
                                        data && data.map((d, _id) =>(
                                            <div key={_id}>
                                              <Link to={`/moviesdetails/${d._id}`} style={{'textDecoration':'none'}} >
                                                  <p className='b text-dark bg-white p-1'>{d.movietitle}</p>
                                              </Link>
                                            </div>
                                          ))
                                        }
                                    </div>
                                </div>
                            </div>

                          <button className="navbar-toggler border border-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon border border-white"></span>
                          </button>

                        <div className="collapse navbar-collapse emshownavlinks" id="navbarNavDropdown">
                              <ul className=" nav navbar-nav">
                                  <div className=''>
                                        { 
                                        !loggedInUserType ? (
                                    <div className='emshownavlinksaa emshownavlinksa'>

                                          <Link to='/movies' className="emshownavlinks2" >
                                              <li className="nav-item">
                                                <button type="button" className="btn"><i className="fa-solid fa-video"></i>See a Movie</button>
                                              </li>
                                          </Link>

                                          <Link to='/location' style={{'textDecoration':'none', color:"white", }} className='emshownavlinks2 ' >
                                            <li className="nav-item ">
                                                  <button type="button" className="btn p-2"  style={{border:"none", fontSize:"15px"}}><i className="fa-solid fa-magnifying-glass" style={{color: "#ffffff", border:"0"}}></i>Find a Theater</button>              
                                              </li>
                                          </Link>

                                          <Link onClick={click} className="emnavsearchdivsearchbsmall" >
                                                <li className="nav-item ">
                                                    <button type="button" className="btn p-2"  style={{border:"none", fontSize:"15px"}}><i className="fa-solid fa-magnifying-glass" style={{color: "#ffffff", border:"0"}}></i> Search</button>              
                                                </li>
                                          </Link>

                                            <Link to='/login'>
                                                <li className="nav-item">
                                                  <button type="button" className="btn"><i className="fa-regular fa-user"></i>Login</button>
                                                </li>
                                              </Link>
                                      </div>
                                        )
                                        :( 
                                      <div className='emshownavlinksaa emshownavlinksa'>
                                        {
                                              backendUsertype === "admin" ? 
                                              (
                                                <div className='emshownavlinksaa'>
                                                  <p className='text-white m-2 '>Welcome, {loggedInUserType}</p>
                                                  <li className="nav-item">
                                                    <button type="button" onClick={admindashboard}  className="btn mx-1"><i className="fa-solid fa-book"></i>
                                                        Dashboard
                                                    </button>
                                                  </li>
                                                  <li className="nav-item">
                                                      <button type="button" onClick={handleLogout} className="btn mx-1"><i className="fa-sharp fa-solid fa-right-from-bracket"></i>Logout</button>
                                                  </li>
                                                  <Link to='/adminbookings'>
                                                    <li className="nav-item">
                                                      <button type="button" className="btn mx-1"><i className="fa-solid fa-bookmark"></i>History</button>
                                                    </li>
                                                  </Link>
                                                </div>
                                                ) 
                                                : 
                                                (
                                                <div className='emshownavlinksaa'>
                                                    <p className='text-white m-2 '>Welcome, {loggedInUserType}</p>
                                                    <li className="nav-item">
                                                        <button type="button" onClick={handleLogout} className="btn mx-1"><i className="fa-sharp fa-solid fa-right-from-bracket"></i>Logout</button>
                                                    </li>
                                                    <Link to='/history'>
                                                      <li className="nav-item">
                                                        <button type="button" className="btn mx-1"><i className="fa-solid fa-bookmark"></i>History</button>
                                                      </li>
                                                    </Link>
                                                </div>
                                                )
                                            }                     
                                      </div>
                                      )
                                      }
                                  </div>
                              </ul>
                          </div>
            </div>
           
          </nav>
          
           
      </div>   
        <div className='emnavsearchdivsearchb'>
              {
                searchVisible &&
                (
                    <div className=''>
                          <div className=' emcin3img'  style={{margin:"0"}}>
                              <i className="fa-solid fa-magnifying-glass" style={{color: "#ffffff", border:"0"}}></i>
                                  <input 
                                    type='search'
                                    placeholder='Enter Movie Name'
                                    id='emnavsearch'
                                    onChange={e => handleChange(e.target.value)}   
                                    className='' 
                                    style={{border:"2px solid white", color:"#fff", width:"95%"}}
                                  />
                          </div>
                          <div className='emnavsearchres'>
                              { 
                                      data.map((d, _id) =>(
                                        <div key={_id}>
                                          <Link to={`/moviesdetails/${d._id}`} style={{'textDecoration':'none'}} >
                                              <p className='b text-dark bg-white p-1'>{d.movietitle}</p>
                                          </Link>
                                        </div>
                                  ))
                                }
                          </div>
                    </div>
                )
              }  
        </div>  
        
</div>
);

}

export default Nav;

