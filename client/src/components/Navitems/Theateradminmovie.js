import React, { useEffect, useState, useCallback } from "react";
import Admintopnav from "../Navitems/Admin/Admintopnav";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import logo from "../images/register/eventbuxicon.png";
import TheaterAdminleftnav from "./TheaterAdminleftnav";




function Theateradminmovie() {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [create, setCreate] = useState(false);
  const [err, setErr] = useState("");
  const [moviecinema, setMoviecinema] = useState([]);
  const [moviecinemahall, setMoviecinemaHall] = useState([]);
  const [movieshow, setMovieShow] = useState([]);
  const [deletedHall, showDelCInHall] = useState([]);
  const [moviedate, setMoviedate] = useState("");
  const [movietime, setMovietime] = useState("");
  const [movietitle, setMovietitle] = useState("");
  const [movieid, setMovieID] = useState("");
  const [movieimages, setMovieImages] = useState("");
  const [moviedescription, setMoviedescription] = useState("");
  const [movies, setMovies] = useState([]);
  const [ff, setFF] = useState([]);
  const [fff, setfff] = useState("");
  const [modalshow, setModalShow] = useState({});
  const [price, setPrice] = useState(0);
  const [numImages, setNumImages] = useState(0);
  const [seatnumber, setSeatNumber] = useState([]);
  const [CinAdSeat, setCinAdSeat] = useState([]);
  const [comparemovie, setCompareMovie] = useState([]);
  const [userLength, setUserLength] = useState([]);
  const [theater, setTheater] = useState('');



  const theaterID = localStorage.getItem("theaterID");

  const LoggedIncinemaid = localStorage.getItem("cinemaAdmin");

  const cinematheaterID = localStorage.getItem("cfai");

  const theaterlocation = localStorage.getItem("cfailoc");


  const seatamount = (e) => setSeatNumber(parseInt(e.target.value, 10) || 0);

  const AddImages = () => setNumImages(seatnumber);

  localStorage.setItem("numImages", numImages);
  
  const TheImages = [];
  for (let i = 1; i <= numImages; i++) {
    TheImages.push(i);
  }


  const feed = useCallback(() => {
    fetch("http://localhost:6969/movie")
      .then((res) => res.json())
      .then((data) => {
                        const f = data.filter((tu) => tu.cinemafromadminID);
                        setCinAdSeat(f);
                        setMovies(data);
                        setLoading(false);
                      })
      .catch(error => {console.error('Error fetching data:', error);setLoading(false);
      });
  }, []);
  
  useEffect(() => {
    feed();
  }, [feed]);


  const Userdata = useCallback(async () => {
    fetch("http://localhost:6969/users")
    .then(res => res.json())
    .then(data => { 
                    const ff = data.filter((user) => {
                    return CinAdSeat.some((cinema) => cinema.cinemafromadminID === user.CinemaFromAdminId);
      });
                    setCompareMovie(ff);
                    setUserLength(data.length); 
                    setLoading(false); 
                  })
    .catch(error => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
  },[CinAdSeat])

  useEffect(() => {
    Userdata();
  }, [Userdata]); 



  useEffect(() => {
    fetch(`http://localhost:6969/cinema/${id}`)
      .then((response) => response.json())
      .then((data) => setModalShow(data))
      .catch((error) => {console.error('Error fetching data:', error)})
      },[id]);


  useEffect(() => {
    fetch('http://localhost:6969/AdminMovieHall')
      .then(response => response.json())
      .then(data => {setMoviecinemaHall(data);})
      .catch(error => {console.log('Error fetching data:', error);setLoading(false);});
      }, []);


  useEffect(() => {
    fetch('http://localhost:6969/cinema')
      .then(response => response.json())
      .then(data => {setMoviecinema(data.data);})
      .catch(error => {console.error('Error fetching data:', error);setLoading(false);});
  }, []);

  
  const getCInemaHall = useCallback ( async () =>{
    fetch("http://localhost:6969/cinemahall")
    .then(res => res.json())
    .then(data => { setMovieShow(data)})
    .catch(error => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                    });
  },[])


  useEffect(() => {
    getCInemaHall();
    },[getCInemaHall]);


    
  if (loading) {
    return <p>Loading...</p>;
  }


  function handleChange2(event){
    setTheater(event.target.value);
  }

  const handleCreateChange = () => {
    setCreate(!create);
    setErr("");
  };

  const selectedDate = (event) => {
    setfff(event.target.value);
  };

  const getSelectedDayInFull = () => {
    const date = new Date(fff);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const jj = getSelectedDayInFull();

  
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:6969/cinemahall/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        const updatedCinemahall = deletedHall.filter(movieshow => movieshow._id !== id);
        showDelCInHall(updatedCinemahall);
        alert("Booking Deleted");
        getCInemaHall();
      } else {
        console.error('Error deleting MOvie');
        alert("Error Deleting Movie");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  const handleSend = async (e) => {
    e.preventDefault();
    if (!movietitle ) {
      alert("One or more fields are empty. Please enter data in all fields.");
    } else {
      try {
        const response = await fetch('http://localhost:6969/cinemahall', {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ moviedescription, movieimages, theaterlocation, cinematheaterID, numImages, theater, price,moviedate: jj,movietime,movietitle,movieid,  theaterid: theaterID }),
        });

        const data = await response.json();

        if (response.ok) {
          setErr("");
          setCreate(false);
          setMoviedate("");
          setMovietime("");
          alert('Hall Created Successfully');
          getCInemaHall();

        } else {
          setErr(data.error);
          alert('Error: ' + err);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
      }
    }
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
                body: JSON.stringify({cinemaId: LoggedIncinemaid, price: modalshow.price, movietitle: modalshow.movietitle, movietime: modalshow.movietime, theater:modalshow.theater, userType:'cinemaadmin', theaterid:theaterID})
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
              .catch(err => {console.log(err); alert("Try Again"); }
                )
  } 
  
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
                <TheaterAdminleftnav />
              </div>          
              <div>
                
                  <div className=''>
                    <div className=''>
                        <div className="m-2 w-100">
                          <div className="" style={{ 'margin': '0 1%' }}>
                            {err && <div className="text-color-red"> {err}</div>}
                            <div className="d-flex justify-content-end">Theater ID: {theaterID}</div>

                            <div className="my-4">
                              <button type="button" className="btn btn-outline-dark mx-1 " onClick={handleCreateChange} data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-solid fa-plus px-2"></i>Create</button>
                            </div>

                            {
                              create &&
                              <form onSubmit={handleSend}
                                encType="multipart/form-data"
                                id="adminhallform"
                              >
                                <div className="emflexmdsm">
                                  <div className="m-3 col-lg-4">
                                    <label htmlFor="formGroupExampleInput">Movie Time</label>
                                    <input type="time" className="form-control"
                                      onChange={(e) => setMovietime(e.target.value)}
                                      id="inputText" placeholder="Enter Movie Time" autoFocus
                                    />
                                  </div>
                                  <div className="m-3 col-lg-4">
                                    <label htmlFor="formGroupExampleInput">Movie Date</label>
                                    <input type="date"
                                      className="form-control"
                                      autoFocus
                                      required
                                      onChange={selectedDate}
                                      id="inputText" placeholder="Select Date . . . "
                                    />
                                  </div>
                                </div>

                                <div className="emflexmdsm">

                                        <div className="mx-4">
                                          <label htmlFor="formGroupExampleInput">Movie Name</label>
                                          <div>
                                            <select
                                              name=""
                                              className=""
                                              required
                                              onChange={(e) => {
                                                setMovietitle(e.target.value);
                                                const selectedCinema = movies.find(
                                                  (dat) => dat.movietitle === e.target.value
                                                );
                                                if (selectedCinema) {
                                                  setMovieID(selectedCinema._id);
                                                  setMovieImages(selectedCinema.movieimage)
                                                  setMoviedescription(selectedCinema.moviedescription)
                                                  
                                                }
                                              }}
                                            >
                                              <option value="" disabled>
                                                Select Movie...
                                              </option>
                                              {movies.map((dat, _id) => (
                                                <option key={_id} value={dat.movietitle}>
                                                  {dat.movietitle}
                                                </option>
                                              ))}
                                            </select>
                                          </div>
                                        </div>

                                        <div className='mx-4'>
                                                <div><label htmlFor="formGroupExampleInput">Movie Hall : </label></div>
                                                    <select name='theater' className='p-1' placeholder="Select Theater" defaultValue={theater} onChange={handleChange2} required>
                                                        <option defaultValue={theater} disabled selected> <i> Movie Hall </i></option>
                                                            {
                                                                moviecinema && moviecinema.map((dat, _id) => {
                                                                if(dat.hallname){
                                                                    return(
                                                                        <option  key={_id} >
                                                                            <option className="m-1"  value={theater}>{dat.hallname}</option>
                                                                        </option>
                                                                    )
                                                                } return"";
                                                                })
                                                            }
                                                    </select>  
                                            </div>
                                    
                                </div>
                                <div className="m-4 col-lg-4">
                                    <label htmlFor="formGroupExampleInput">Price</label>
                                    <input type="number" className="form-control"
                                      onChange={(e) => setPrice(e.target.value)}
                                      id="inputText" placeholder="Set Price" autoFocus
                                    />
                                </div>

                                <label>
                                    Number of Seats:
                                    <input
                                      type="number"
                                      defaultValue={numImages}
                                      onChange={seatamount}
                                    />
                                </label>
                                <button type="button" className="btn m-2 bg-success text-white"  onClick={AddImages}>Add</button>
                        

                                <div className="my-4">
                                  <button className="btn btn-primary" type="submit" >Create</button>
                                </div>
                              </form>
                            }
                          </div>
                          {err && <div className='text-danger'>{err} </div>}
                          <table className="table emtable my-5"
                              border={"1px"}
                            >
                              <thead>
                                <tr >
                                  <th>Movie Name</th>
                                  <th>Movie Date</th>
                                  <th>Movie Time</th>
                                  <th>Movie Hall</th>
                                  <th>Price</th>
                                  <th>NumImages</th>
                                  <th>Theaterlocation</th>
                                  <th>Actions</th>
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
                                        <td>{cin.numImages}</td>
                                        <td>{cin.theaterlocation}</td>
                                        <td>
                                          <Link onClick={() => handleDelete(cin._id)} >
                                            <i className="fa-solid fa-trash" style={{ color: "#ec1809", marginRight: "10px" }}></i>
                                          </Link>
                                        </td>
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
                    </div>
                  </div>
              </div>
          </div>
        </div>
        
    </>
  )
}

export default Theateradminmovie;