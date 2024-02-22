import React, { useEffect, useState, useCallback } from "react";
import Admintopnav from "../Navitems/Admin/Admintopnav";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import logo from "../images/register/eventbuxicon.png"
import Cinemaleftnav from "../Navitems/Admin/Cinemaleftnav";


function Cinemahall() {
  const { id } = useParams();

  const [movieshow, setMovieShow] = useState([]);
  const [table, setTable] = useState([]);
  const [ff, setFF] = useState([]);
  const [modalshow, setModalShow] = useState({});


  const baba = localStorage.getItem('selectedMovieId')

  const theaterID = localStorage.getItem("theaterId");


  const cinemaAdminId = localStorage.getItem("cinemaAdminId");

  const counterid = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://localhost:6969/cinema/${id}`)
      .then((response) => response.json())
      .then((data) => setModalShow(data));
  },[id]);

  
  const getCInemaHall = async () => {
      try {
        const response = await axios.get('http://localhost:6969/cinemahall')
          setMovieShow(response.data);
    } 
    catch (error) {
      console.error('Error fetching movie data:', error);
    }
  }


  useEffect(() => {
    getCInemaHall();
    },[]);

 

  const handleBookNow = (cin) => {
    setModalShow(cin);
  };
  
  const theaterbooking = async () => {
    await fetch('http://localhost:6969/theateradminbookings', {
              method: "POST",
              crossDomain: true,
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
              },
                body: JSON.stringify({cinemaId: cinemaAdminId, price: modalshow.price, movietitle: modalshow.movietitle, movietime: modalshow.movietime, theater:modalshow.theater, userType:'cinemaadmin', theaterid:theaterID})
              })
              .then( async (response) => {
                if(response.status === 200){   
                  alert("Booking Successfully Created");
                  getCInemaHall();
                  window.location.reload();                  
                }else{
                  throw new Error("Booking Failed");
                
                }
              })
              .catch(alert("Try Again"))
  } 


  const setThisCIn = useCallback ( async () =>{
    fetch('http://localhost:6969/theateradminbookings')
    .then((response) => response.json())
    .then((data) => {
                      const cinemaID = data.cinemaId;
                      const filteredMovies = data.filter(cin => cin.cinemaAdminId === cinemaID);
                      setTable(filteredMovies);
                    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
    
  },[])

  useEffect(() => {
    setThisCIn()    
  },[setThisCIn ])
  


  const handlePrint = async () => {

    const modalContent = document.querySelector('.modal-print-content');
    const pb = document.querySelector('.printbutton');
    pb.style.display ="none;"
    const printWindow = window.open('', '_blank', 'width=600,height=200');
    printWindow.document.open();
    printWindow.document.write('<html><head><title>TICKET PRINTING</title></head><body>');
    printWindow.document.write(modalContent.innerHTML);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();

    if(pb){
      pb.style.display = 'none';
    }

  };


  function handlePrintAndBook() {
    handlePrint();
    theaterbooking();  
  }


  return (
    <>
      <div className="">
          <div>
            <Admintopnav />
          </div>
          <div className="d-flex">
              <div>
                <Cinemaleftnav />
              </div>          
             
                    <div className=''>
                        <div className="m-2 w-100">
                            <p className="fs-2">Cinema ID:{counterid}</p>
                            <div className="" style={{ 'margin': '0 1%' }}>

                            </div>
                            <table className="table emtable"
                                border={"1px"}
                              >
                                <thead>
                                  <tr >
                                    <th>Movie Name</th>
                                    <th>Movie Date</th>
                                    <th>Movie Time</th>
                                    <th>Movie Hall</th>
                                    <th>Price</th>
                                    <th>Book Now</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    movieshow && movieshow.map((cin, _id) => {
                                      return (
                                        <tr key={_id}>
                                          <td>{cin.movietitle}</td>
                                          <td>{cin.moviedate}</td>
                                          <td>{cin.movietime}</td>
                                          <td>{cin.theater}</td>
                                          <td>{cin.price}</td>
                                          <td><button className="btn btn-primary" onClick={() => handleBookNow(cin)} data-bs-toggle="modal" data-bs-target="#exampleModalToggle"> Book Now</button></td>
                                        
                                        </tr>
                                      )
                                    })
                                  }
                                </tbody>
                            </table>
                        </div>
                        <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalToggleLabel">Booking Details</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                <div className="">
                                  <div className="text-center">
                                    <p className="text-uppercase m-1 fw-bolder" >Movie Selected: {modalshow.movietitle}</p>
                                    <p className="text-uppercase m-1 fw-bolder" >Movie Time: {modalshow.movietime}</p>
                                    <p className="text-uppercase m-1 fw-bolder" >Cinema Hall: {modalshow.theater}</p>
                                    <p className="text-uppercase m-1 fw-bolder" >Price: {modalshow.price}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button onClick={() => setFF(modalshow.theater)} className="btn btn-danger text-white rounded-pill" data-bs-target="#exampleModalToggle2"  data-bs-toggle="modal" data-bs-dismiss="modal">Place Order</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="modal fade " id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalToggleLabel2">PROCEED TO PRINT</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body modal-print-content">
                                  <div style={{borderBottom:"2px solid gray"}}>
                                        <img src={logo} alt="logo" width={80}/>
                                  </div>
                                  <div>
                                      <p className="text-uppercase m-1 fw-bolder" >Movie Selected: {modalshow.movietitle}</p>
                                      <p className="text-uppercase m-1 fw-bolder" >Movie Time: {modalshow.movietime}</p>
                                      <p className="text-uppercase m-1 fw-bolder" >Cinema Hall: {modalshow.theater}</p>
                                      <p className="text-uppercase m-1 fw-bolder" >Price: {modalshow.price}</p>
                                  </div>
                              </div>
                              
                              <div className="modal-footer d-flex justify-content-between ">
                                  <div className='d-flex justify-content-end '>
                                      <button className="printbutton" onClick={handlePrintAndBook}> Click to Continue</button>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>
             <div className="" style={{ 'margin': '0 2%' }}>
                <p className="fs-2">Successful Bookings: </p>
                  <table className="table emtable"
                      border={"1px"}
                    >
                      <thead>
                        <tr >
                          <th>Movie Name</th>
                          <th>Movie Time</th>
                          <th>Movie Hall</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          table && table.map((cin, _id) => {
                            return (
                              <tr key={_id}>
                                <td>{cin.movietitle}</td>
                                <td>{cin.movietime}</td>
                                <td>{cin.theater}</td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                  </table>
              </div>
                    </div>
                  </div>
        </div>
        
    </>
  )
}

export default Cinemahall;