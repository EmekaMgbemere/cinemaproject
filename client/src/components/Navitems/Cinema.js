import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import bckimg from '../images/emheader.jpg';
import car11 from '../images/car11.jpg';
import flag2 from '../images/flag.png';
import mov8 from '../images/mov8.jpg';
import Nav from './Nav';
import Footer from './Footer';
import axios from 'axios';

function Cinema() {
  const [matchmov, setMatchMov] = useState([]);
  const [loading, setLoading] = useState(true);


  const LocName = localStorage.getItem("locname");

    const handleLinkClick = (movieId) => {
      localStorage.setItem('selectedMovieId', movieId);
  };


  useEffect(() => {
    const fetchLocationMovies = async () => {
      try {
        const response = await axios.get('http://localhost:6969/cinemahall');
        const movies = response.data;
        
        const filteredMovies = movies.filter(movie => movie.theaterlocation === LocName);
        
        const uniqueMovieIds = Array.from(new Set(filteredMovies.map(movie => movie.movieid)));
        
        const uniqueMovies = uniqueMovieIds.map(movieId => filteredMovies.find(movie => movie.movieid === movieId));
        
        setMatchMov(uniqueMovies);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cinema hall data:', error);
      }
    };
  
    fetchLocationMovies();
  }, [LocName]);

  const backgroundStyle = {
    backgroundImage: `url(${bckimg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,.7)',
  };


  return (
        <>
          <div style={backgroundStyle}>
            <div className='' >
                <div>
                  <Nav />
                </div>
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                     
                      <div className="carousel-inner" style={{height:"80vh"}}>
                            <div className="carousel-item active emcin1" >
                                <img src={car11} className="d-block w-100 img-fluid " alt="car11" />
                                <div className="carousel-caption d-md-block emcin2">
                                    <h3 className='display-2'>Welcome To {LocName} Cinemas</h3>
                                </div>
                            </div>
                            
                            <div className="carousel-item ">
                              <div className='emcin4'></div>
                                <img src={mov8} className="d-block w-100 img-responsive " alt="mov8" />
                                  <div className="carousel-caption d-md-block emcin3">
                                      <span className=' text-white d-flex justify-content-end'>Enjoy FREE POP CORN this Independence Day Weekend</span>
                                      <div className="d-flex justify-content-center emcin3img">
                                        <img src={flag2} className="d-block -none w-25 img-responsive" alt="flag" />
                                      </div>
                                  </div>
                              </div>
                      </div>
                      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Previous</span>
                      </button>
                      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                          <span className="carousel-control-next-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Next</span>
                      </button>
                </div>  
                <div className='text-light display-6' style={{ fontWeight: '600', margin: '7% 2% 0 2%' }}>
                    Movies Now Showing in {LocName}
                </div>
                <hr style={{ color: 'white', margin: '1%' }} />
            </div>
            <div>
              { 
                <div className="d-flex flex-wrap bg-transparent ">
                    { loading ? 
                        (
                          <p className="display-3 text-white">Waiting . . .</p>
                        )
                        : matchmov === null ? (
                            <p className="display-3 text-white m-5 p-5">No Movie Found!</p>
                        ) :
                            (  
                              matchmov.map((movie, _id) => {
                                return(
                                    <div key={_id} className="m-3 row">
                                        <div className="col p-1 text-white" >
                                              <img className="" src={movie.movieimages} alt="thisimg" style={{"width": "15vw", "height":"17vw"}}/>
                                            <div className="text-center ">
                                                <p className="text-uppercase m-1 fw-bolder" style={{"fontFamily": 'Concert One'}}>{movie.movietitle}</p>
                                                <span className=""> <b>Duration:</b> {movie.movieduration} Mins</span>
                                                <p className=""><b>PG:</b> {movie.pg}</p>
                                        <Link to={`/moviesdetails/${movie.movieid}`} style={{ textDecoration: 'none' }} onClick={() => handleLinkClick(movie.movieid)}>
                                                <button className="btn btn-danger text-white rounded-pill fw-bold">Get Tickets</button>
                                        </Link>
                                            </div>
                                        </div>
                                    </div>
                                    )
                              })
                            )
                    }
                </div>
              }
            </div>
              
            <Footer />
            
          </div>
        </>
      );
    }
    
    export default Cinema;


