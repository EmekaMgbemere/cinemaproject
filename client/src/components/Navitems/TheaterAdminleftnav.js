import React from 'react';
import { Link } from 'react-router-dom';

function TheaterAdminleftnav() {
  

  return (
  <>
    <div className='emaddashsmleft' >
      <div className='d-flex justify-content-center align-items-center'>
        <p className='text-align-left'>Navigation</p>
      </div>
      <div>
        <Link style={{textDecoration: 'none'}} to="/theateradmincinema">
          <div className=''>
          <li><i className="fa-solid fa-person-booth" style={{color: "#a0a0a2", marginRight:"10%"}}></i><span>Counter</span></li>
          </div>
        </Link>
      </div>
      <div>
        <Link style={{textDecoration: 'none'}} to="/theateradminhall">
          <div className=''>
          <li><i className="fa-solid fa-film fa-lg"style={{color:"#a0a0a2", marginRight:"10%"}}></i><span>Halls</span></li>
          </div>
        </Link>
      </div>
     
      <div>
        <Link style={{textDecoration: 'none'}} to="/theateradminmovie">
          <div className=''>
          <li><i className="fa-solid fa-camera fa-lg" style={{color: "#a0a0a2", marginRight:"10%"}}></i><span>Movies</span></li>
          </div>
        </Link>
      </div>
      <div>
        <Link style={{textDecoration: 'none'}} to="/theateradminbookings">
          <div className=''>
          <li><i className="fa-regular fa-bookmark" style={{color: "#a0a0a2", marginRight:"10%"}}></i><span>Bookings</span></li>
          </div>
        </Link>
      </div>
   </div>
   </>
  );
}

export default TheaterAdminleftnav;