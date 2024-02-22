import React from 'react';
import { Link } from 'react-router-dom';

function Cinemaleftnav() {

  return (
  <>
    <div className='emaddashsmleft' >
      <div className='d-flex justify-content-center align-items-center'>
        <p className='text-align-left'>Navigation</p>
      </div>

      <div>
        <Link style={{textDecoration: 'none'}} to="/cinemahall">
          <div className=''>
          <li><i className="fa-solid fa-film fa-lg"style={{color:"#a0a0a2", marginRight:"10%"}}></i>
                <span>CINEMA</span></li>
          </div>
        </Link>
      </div>

   </div>

   </>
  );
}

export default Cinemaleftnav;