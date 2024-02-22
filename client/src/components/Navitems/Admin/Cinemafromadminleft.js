import React from 'react';
import { Link } from 'react-router-dom';

function Cinemafromadminleft() {

  return (
  <>
    <div className='emaddashsmleft' >
      <div className='d-flex justify-content-center align-items-center'>
        <p className='text-align-left'>Navigation</p>
      </div>
      <div>
        <Link style={{textDecoration: 'none'}} to="/cinematheater">
          <div className=''>
            <li>
                <i className="fa-solid fa-circle-user fa-lg" style={{color: "#a0a0a2", marginRight:"3%"}}></i>
                    <span>Theater Admin</span>
            </li>
          </div>
        </Link>
      </div>

      <div>
        <Link style={{textDecoration: 'none'}} to="/cinemafromadminseatselection">
          <div className=''>
            <li>
                <i className="fa-solid fa-file-video fa-lg" style={{color: "#a0a0a2", marginRight:"3%"}}></i>
                    <span>Seat Selection</span>
            </li>
          </div>
        </Link>
      </div>

      
   </div>

   </>
  );
}

export default Cinemafromadminleft;