import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/Navitems/Nav';
import Signup from './components/Navitems/Signup';
import Login from './components/Navitems/Login';
import Home from './components/Navitems/Home';
import AdminProtected from './components/Navitems/AdminProtected';
import CinemaProtected from './components/Navitems/CinemaProtected';
import Moviedetails from './components/Navitems/Moviedetails';
import Userhomepage from './components/Navitems/Userhomepage';
import Contactform from './components/Navitems/Contactform';
import Flutterpayment from './components/Navitems/Flutterpayment';
import Seats from "./components/Navitems/Seats";
import Footer from './components/Navitems/Footer';
import TheaterAdmincinema from "./components/Navitems/TheaterAdmincinema"
import AdminDashboard from "./components/Navitems/Admin/AdminDashboard"
import Admineditcinema from "./components/Navitems/Admin/Admineditcinema"
import Admineditlocation from "./components/Navitems/Admin/Admineditlocation"
import Admineditmovie from "./components/Navitems/Admin/Admineditmovie"
import AdminEditUser from "./components/Navitems/Admin/AdminEditUser"
import Adminleftnav from "./components/Navitems/Admin/Adminleftnav"
import Cinemaleftnav from "./components/Navitems/Admin/Cinemaleftnav"
import Adminlocation from "./components/Navitems/Admin/Adminlocation"
import Adminmovie from "./components/Navitems/Admin/Adminmovie"
import Admintopnav from "./components/Navitems/Admin/Admintopnav"
import Adminuser from "./components/Navitems/Admin/Adminuser"
import Admininfo from "./components/Navitems/Admin/Admininfo"
import Adminbookings from "./components/Navitems/Admin/Adminbookings"
import Cinemahall from "./components/Navitems/Cinemahall"
import NoPage from "./components/Navitems/NoPage";
import Location from "./components/Navitems/Location";
import Cinema from "./components/Navitems/Cinema";
import History from "./components/Navitems/History";
import Cinemaadmin from "./components/Navitems/Cinemaadmin";
import Theateradmin from "./components/Navitems/Theateradmin";
import Theateradminmovie from "./components/Navitems/Theateradminmovie";
import TheaterAdminleftnav from "./components/Navitems/TheaterAdminleftnav";
import TheaterAdminProtected from "./components/Navitems/TheaterAdminProtected";
import TheaterAdminBookings from "./components/Navitems/TheaterAdminBookings";
import TheaterAdminHall from "./components/Navitems/TheaterAdminHall";
import AdminCinema from "./components/Navitems/Admin/AdminCinema";
import Cinemafromadmin from "./components/Navitems/Admin/Cinemafromadmin";
import AdminEditCinemaFromAdmin from "./components/Navitems/Admin/AdminEditCinemaFromAdmin";
import Cinemalogin from "./components/Navitems/Cinemalogin";
import CinemaTheater from "./components/Navitems/Admin/CinemaTheater";
import Cinemafromadminleft from "./components/Navitems/Admin/Cinemafromadminleft";
import Comingsoon from "./components/Navitems/Admin/Comingsoon";
import Cinemafromadminseatselection from "./components/Navitems/Admin/Cinemafromadminseatselection";
import Locationroute from "./components/Navitems/Locationroute";

import './App.css';
import './Checkout.css';



function App() {

  return (
    <BrowserRouter>
        <div className="App">
          <Routes>
              <Route element={<AdminProtected />}>
                  <Route path="/admindashboard" element={<AdminDashboard />} />
                  <Route path="/cinemafromadmin" element={<Cinemafromadmin />} />
                  <Route path="/admincinema" element={<AdminCinema />} />
                  <Route path="/admininfo" element={<Admininfo />} />
                  <Route path="/adminleftnav" element={<Adminleftnav />} />
                  <Route path="/adminlocation" element={<Adminlocation />} />
                  <Route path="/adminmovie" element={<Adminmovie />} />
                  <Route path="/adminbookings" element={<Adminbookings />} />
                  <Route path="/admintopnav" element={<Admintopnav/>} />
                  <Route path="/adminuser" element={<Adminuser />} />
                  <Route path="/cinematheater" element={<CinemaTheater />} />
                  <Route path="/cinemafromadminseatselection" element={<Cinemafromadminseatselection />} />
                  <Route path="/admineditcinemafromadmin/:id" element={<AdminEditCinemaFromAdmin />} />
                  <Route path="/cinemafromadminleft" element={<Cinemafromadminleft />} />
                  <Route path="/comingsoon" element={<Comingsoon />} />
              </Route>
              
              <Route element={<TheaterAdminProtected />}>
                  <Route path="/theateradminleftnav" element ={<TheaterAdminleftnav />} />         
                  <Route path="/theateradmin" element={<Theateradmin />} />
                  <Route path="/theateradminmovie" element={<Theateradminmovie />} />
                  <Route path="/theateradmincinema" element={<TheaterAdmincinema />} />
                  <Route path="/theateradminbookings" element={<TheaterAdminBookings />} />
                  <Route path="/theateradminhall" element={<TheaterAdminHall />} />
              </Route>
               
              <Route element={<CinemaProtected />}>
                  <Route path="/cinemahall" element={<Cinemahall />} />
                  <Route path="/cinemaleftnav" element={<Cinemaleftnav />} />
                  <Route path="/cinemalogin" element={<Cinemalogin />} />
              </Route>
              <Route path="/admineditcinema/:id" element={<Admineditcinema />} />
                  <Route path="/admineditlocation/:id" element={<Admineditlocation />} />
                  <Route path="/admineditmovie/:id" element={<Admineditmovie />} />
                  <Route path="/adminedituser/:id" element={<AdminEditUser />} />
              <Route path="/" element={<Home/>} />
              <Route path="/movies" element ={<Userhomepage />} />         
              <Route path="/nav" element={<Nav />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/moviesdetails/:id" element={<Moviedetails/>} />
              <Route path="/contactform" element={<Contactform />} />
              <Route path="/seats" element={<Seats />} />
              <Route path="/flutterpayment" element={<Flutterpayment />} />
              <Route path="/footer" element={<Footer />} />
              <Route path="/location" element={<Location />} />
              <Route path="/history" element={<History />} />
              <Route path="/cinemaadmin" element={<Cinemaadmin />} />
              <Route path="/locationroute" element={<Locationroute />} />
              <Route path="/cinema/:location" element={<Cinema />} />
              <Route path="/login" element={<Login />} /> 
              <Route path="*" element={<NoPage />} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;

