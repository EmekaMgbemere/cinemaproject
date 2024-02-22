import React from "react";
import { Link } from "react-router-dom";

function Admininfo(){

    return(
    <div className="emadmininfo">
        <div className='d-flex flex-wrap'>
            <div class="card" style={{'width': '24.5rem', 'margin': '1.5%'}}>
                <div class="card-body text-white">
                    <h5 class="card-title fs-3">LOCATIONS</h5>
                    <Link to="/adminlocation">
                    <button class='btn btn-lg btn-primary'>View Location</button>
                    </Link>

                </div>
            </div>
            <div class="card" style={{'width': '24.5rem', 'margin': '1.5%'}}>
                <div class="card-body text-white">
                    <h5 class="card-title fs-3 ">CINEMAS</h5>
                    <Link to="/admincinema">
                    <button class='btn btn-lg btn-primary'>View Cinemas</button>
                    </Link>
                </div>
            </div>
            <div class="card" style={{'width': '24.5rem', 'margin': '1.5%'}}>
                <div class="card-body text-white">
                    <h5 class="card-title fs-3">USERS</h5>
                    <Link to="/adminuser">
                        <button class='btn btn-lg btn-primary'>View Users</button>
                    </Link>
                </div>
            </div>
            <div class="card" style={{'width': '24.5rem', 'margin': '1.5%'}}>
                <div class="card-body text-white">
                    <h5 class="card-title fs-3">MOVIES</h5>
                    <Link to="/adminmovie">
                        <button class='btn btn-lg btn-primary'>View Movies</button>
                    </Link>
                </div>
            </div>
            <div class="card " style={{'width': '24.5rem', 'margin': '1.5%'}}>
                <div class="card-body text-white">
                    <h5 class="card-title fs-3">BOOKINGS</h5>
                    <Link to="/adminbookings">
                        <button class='btn btn-lg btn-primary'>View Bookings</button>
                    </Link>
                </div>
            </div>
        </div> 
    </div>
    )
}

export default Admininfo;