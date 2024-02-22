import React, { useCallback, useState, useEffect } from "react";
import Nav from './Nav';
import Footer from './Footer';
import mov1 from '../images/mov1.jpg';
import mov5 from '../images/mov5.jpg';
import mov14 from '../images/mov14.png';
import { Link } from "react-router-dom";    


function Userhomepage() {
    const [ display, setDisplay] = useState([]);

      const handleLinkClick = (movieId) => {
        localStorage.setItem('selectedMovieId', movieId);
        // alert(movieId);
    };
    
      const Nowshowing = useCallback(async () => {
        fetch("http://localhost:6969/movie")
          .then((res) => res.json())
          .then((data) =>{ 
                            setDisplay(data);
                            const fd = data.filter( (h) => h.nowshowingID);
                            setDisplay(fd); 
                         })
      },[])

    useEffect(() => {
        Nowshowing()
      }, [Nowshowing]);

      const Comingsoon = useCallback(async () => {
        fetch("http://localhost:6969/comingsoon")
          .then((res) => res.json())
          .then((data) =>{ 
                            const fd = data.filter( (h) => h.comingsoonID);
                            setDisplay(fd);
                         })
      },[])

    useEffect(() => {
        Comingsoon()
      }, [Comingsoon]);


  return (
    <div className="embg ">
        <Nav />
        <div id="carouselExampleIndicators" className="carousel slide emuserhomepageimgdiv" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                </div>   
                <div className="emcarousel">
                    <div className=" carousel-inner h-80">
                        <div className="carousel-item active ">
                            <img src={mov5} className="d-block w-100" alt="mov5"  />
                            <p className="emcarouseltext w-50 ">Come See Your Favorite Marvel Characters In all Our Cinemas Nationwde. </p>
                        </div>
                        <div className="carousel-item ">
                            <img src={mov1} className="d-block w-100 h-100" alt="mov1" />
                            <p className="emcarouseltext w-50">Craving For <b className="text-danger">Horror</b> Movies? Come See the Sick And Twisted Every Friday</p>
                        </div>
                    </div>
                </div>
        </div>

    <div className="emparallax">
            <div className="text-uppercase fw-bolder text-decoration-none text-white px-3">
                <h4 className="font-italic  ">
                    <span className="emheader mx-2 bg-transparent ">
                        <button onClick={() => Nowshowing()} className="bg-transparent text-uppercase">
                            now showing
                        </button>
                    </span> 
                    <span className="emheader mx-1">/ </span> 
                    <span className="emheader mx-1">
                        <button onClick={() => Comingsoon()} className="bg-transparent text-uppercase">
                            Coming Soon
                        </button>
                    </span>
                </h4>
                <div className="" style={{ "width":"90vw", "color":"white", "height":"1px", "backgroundColor":"gray"}}></div>
            </div>
           
            
            <div className="d-flex flex-wrap bg-transparent emmoviedisplay">
                { 
                    display && display.map((mov, _id) =>{
                        return(
                            <div key={_id} className="m-3 row " >
                                <Link to="/location" style={{ textDecoration: 'none' }} onClick={() => handleLinkClick(mov._id)}>
                                    <div className="col py-3 ">
                                            <img className="" src={mov.movieimage} alt="thisimg" style={{"width": "200px", "height":"250px"}}/>
                                            <div className="text-center text-white">
                                                <p className="text-uppercase m-1 fw-bolder" style={{"fontFamily": 'Concert One'}}>{mov.movietitle}</p>
                                                <span className=""> <b>Duration:</b> {mov.movieduration} Mins</span>
                                                <p className=""><b>PG:</b> {mov.pg}</p>
                                                <button className="btn btn-danger text-white rounded-pill fw-bold">Get Tickets</button>
                                            </div>
                                    </div>
                                </Link>
                            </div>
                        )
                        })
                }
            </div>

    </div>
    <div className="emmoviead ">
        <div className="img-fluid"><img src={mov14} alt="oppenheimer" className="w-100 h-50" /></div>
    </div>
     <Footer />
</div>
  );
}

export default Userhomepage;
