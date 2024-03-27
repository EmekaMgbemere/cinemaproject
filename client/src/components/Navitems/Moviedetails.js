import React, { useCallback, useEffect, useState, useRef } from 'react';
import Nav from "./Nav";
import { useParams, useNavigate, Link} from "react-router-dom";
import Footer from './Footer';
import emmoviechair from '../images/emmoviechair.png';
import cinemascreen from '../images/cinema.png';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


function Moviedetails(){

  const [quantity, setQuantity] = useState(0);

  const { id } = useParams();

  const [ posts , setPosts ] = useState([]);

    const [errorMessage, setErrorMessage] = useState('');

  const moviename = `${posts.movietitle}`;

  localStorage.setItem("Movietitle", `${posts.movietitle}`);
  localStorage.setItem("productDescription", `${posts.description}`);
  localStorage.setItem("productPrice", `${posts.price}`);

  const [selectedOption, setSelectedOption] = useState('');


  const navigate = useNavigate();

  const [selectedID, setSelectedId] = useState('');
  const [arrId, setArrId] = useState([]);
  const [dispArr, setDispArr] = useState([]);
  JSON.stringify(dispArr);
  const [errmsg, setErrmsg] = useState(" ");
  const [sucmsg, setSucMsg] = useState(" ");
  const [seatTrue, setSeatTrue] = useState(false);
  const [numImgs, setNumImages] = useState(0);
  const [movieImages, setMovieImages] = useState([]);
  const [comparemovie, setCompareMovie] = useState([]);
  const [This, NoteThis] = useState([]);
  const [cinhall, setCinemahall] = useState([]);
  const [Open, setOpen] = useState(false);

  const [ni, setNI] = useState([]);

  const [rendered, setRendered] = useState(false);
  const movieRef = useRef(cinhall);
  
  const movieeeeeee = localStorage.getItem("selectedMovieId");

  const rr = localStorage.getItem('locname');
  
  const[moviedate, setMovieDate] = useState([]);
  const[movietime, setMovieTime] = useState([]);

  function handleChange2(dat){
    setOpen(!Open)
    NoteThis(dat.price);
    setSelectedOption(dat.theater);
    setMovieDate(dat.moviedate);
    setMovieTime(dat.movietime);
  }

  localStorage.setItem('time', movietime);


  const subtotal = This * quantity;

  const total = This * quantity;

  localStorage.setItem("totalStorage", `${total}`);


const BookingApi = useCallback(async () => {
fetch("http://localhost:6969/bookingapi")
    .then((res) => res.json())
    .then((data) => {   
                        setDispArr(data);
                        setMovieImages(data.map(item => item.selectedID)); 
                        setErrmsg("")});
    }, []);
                  
    useEffect(() => {
      BookingApi();                      
    },[BookingApi])


  function Seat(){
    setSeatTrue(!seatTrue);
  }


 localStorage.setItem('Chosendate', moviedate);

  const message = `You have chosen to buy ${quantity} tickets with seats from ${selectedOption} hall.`;
  const none= '';  

  

  useEffect(() =>{

    if (!rendered) {
  fetch('http://localhost:6969/cinemahall')
  .then((response) => response.json())
  .then((data) => { 
                      const ff = data.filter(cinema => cinema.movieid === movieeeeeee && cinema.theaterlocation === rr );
                      // const ff = data.filter(cinema => cinema.movieid === movieeeeeee && cinema.theaterlocation === rr );
                      const notff = data.some(cinema => cinema.movieid !== movieeeeeee && cinema.theaterlocation === rr);

                      if(notff){
                        setCompareMovie("Movie Not Available At This Location");
                      }
                      else{
                        setCompareMovie(ff);
                      }
                      

                      setCinemahall(data);

                      setNI(ff[0].numImages);

                      setNumImages(ni);

                      movieRef.current = data;

                      setRendered(true);
                    }
                    );
                  } else {
                    console.log("Currently Unavailable");
                  }
                },[movieeeeeee, ni, rr, rendered])



  useEffect(() =>{
    fetch(`http://localhost:6969/movie/${id}`)
          .then((res) => res.json())
          .then((data) => {
                            setPosts(data);
                          })
        },[id])



   const flutterpaymm = () => {
        if (!quantity) {
           setErrorMessage('Please Make a Selection');
         }
         else {
           setErrorMessage('');
           navigate('/flutterpayment');
         }
       }
       


  const sendtouser = [selectedOption, selectedID, movietime, moviedate, moviename];

  localStorage.setItem('sendtouser', JSON.stringify(sendtouser));

  const backgroundStyle = {
    backgroundImage: `url(${posts.movieimage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '90vh', 
    boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,.7)'
  };

  const link = posts.movietrailer;

const openVideoInNewTab = () => {
  window.open(link, '_blank');
};


const ImageClick = (index) => {
  return (e) => {
    e.preventDefault();
    setSelectedId(index);
    setArrId((currentArrId) => [...currentArrId, index]);
  };
};


const AddId = async () =>{
  try {
    const response = await fetch('http://localhost:6969/bookingapi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ arrId, selectedID })
    });

    if (response.status===200) {
      setErrmsg("")
      const { msg } = await response.json();
      const successmsg = JSON.stringify(msg);
      setErrmsg(" ");
      setSucMsg(successmsg);
    } 


    if(response.status===400){
      const { msg } = await response.json();
      const badmsg = JSON.stringify(msg);
      setErrmsg(badmsg);
      setSucMsg(" ")     
    }

  } catch (error) {
    console.error('Error:', error);
  }
}


const TheImages = [];
for (let i = 1; i <= numImgs; i++) {
  TheImages.push(i);
}


const seatColors = (index) => {
  const isSelected = selectedID === index;
  const isBooked = dispArr.some((item) => item.selectedID === index);

  return {
    backgroundColor: isBooked ? 'gray' : (isSelected ? 'blue' : 'transparent'),
    cursor: 'pointer',
  };
};



  return(
  <div className=''> 
      <Nav />
    <div className='' >
      <div className="w-100 pt-5 pb-2" style={backgroundStyle}>
          <div className="bg-transparent emcounterdashboardcard">
            <div className='row d-flex '>
                    <div className=" col-lg-6 col-md-12 text-center mt-3 emmm" >
                      <img className="" src={posts.movieimage} alt="thisimg" width={'300'} height={'400'}/>
                    </div>
                  <div className='col-lg-6 col-md-12 emmovdets' >
                      <h1 className="">{posts.movietitle}</h1>
                      <h5 className="">{posts.moviedescription}</h5>
                      <div> 
                          <button className='btn rounded-pill bg-danger text-white px-3 fs-5 m-3' onClick={openVideoInNewTab}>Watch Trailer</button>
                      </div>
                  </div>
            </div>
          </div>
          
            <div className='p-1'>
                <div name='selectedOption' className='p-2 bg-transparent text-white'  defaultValue={selectedOption}  required>
                        {
                          Array.isArray(comparemovie) ? (
                          comparemovie.map((dat, _id) => {
                                return(
                                <div className='movmov'>
                                    <div className="row ">
                                      <div className="text-center">
                                        <p class="">Cinema Hall: {dat.theater}</p>
                                        <p class="">Cinema Date: {dat.moviedate}</p>
                                        <p class="">Cinema Time: {dat.movietime}</p>
                                        <p class="">Price: ₦{dat.price}.00</p>
                                        <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handleChange2(dat)} > SELECT</button>
                                      </div>
                                    </div>
                                </div> 
                              )
                            }
                          )
                          ) : (
                            <div className='text-center fs-2'>
                               <p> Movie Not Available At this Location  </p>
                                <button  className='btn btn-success'>
                                < Link to="/movies" className="fs-5 b" style={{color:'white', textDecoration:'none'}}>Go Back To Movies
                                </Link>  
                                </button>
                            </div>

                          )
                      }
                      
                </div>
            </div>
        </div>



    <div className=" w-80 m-4 justify-content-center align-content-center border rounded"> 
          {  
            Open ? ( 
              
                <div className=''>
                    <div className=''>
                          <div className='card-header text-center'>
                                <h4>Booking Details</h4>
                            </div>
                    </div>
                  
                    <div>
                        <Table className="table table-sm"> 
                              <Thead>
                                <Tr>
                                  <Th scope=" text-left">Selection</Th>
                                  <Th scope="col">Price</Th>
                                  <Th scope="col">Seat</Th>
                                  <Th scope="col">Quantity</Th>
                                  <Th scope="col">Subtotal</Th>
                                </Tr>
                              </Thead>
                                
                              <Tbody>
                                { selectedOption  && 
                                    <Tr className=''>
                                        <Th scope="row">{selectedOption}</Th>
                                        <Td id='goldseat4did'> ₦ {This}.00</Td>
                                        <Td> 
                                            <button type="button" className="btn btn-success" onClick={Seat} >Select Seat  </button>
                                        </Td>
                                        <Td><input type="number" id='goldseat4did' value={quantity} min="0" max="50" className='w-50' onChange={e=>setQuantity(e.target.value)} />
                                        </Td>
                                        <Td>{total}</Td>
                                    </Tr>
                                  }

                                    { selectedOption ? `${none}` :
                                      <Tr>
                                          <Th scope="row"> </Th>
                                          <Td className=''></Td>
                                          <Td className=''></Td>
                                          <Td className='fst-italic fw-bold'>Final Total:</Td>
                                          <Td className=''>₦ {total}</Td>
                                      </Tr>
                                    }
                              </Tbody>
                        </Table>
                        
                          <div>
                              {seatTrue &&
                              <>


                              {errmsg && <p className="text-center text-danger"> {errmsg} </p>}
                                    <div className="emuserhomepagedflex">
                                      <div className="emuserhomepageimg0">
                                          <div className='mb-5'><img src={cinemascreen} alt='cinemascreen' width={'200px'} /></div>
                                              <div className='emuserhomepageimgimg'>
                                                    {
                                                      TheImages.map((index) => (
                                                        <img key={index} src={emmoviechair} 
                                                          alt={`Movie ${index}`} 
                                                          onClick={ImageClick(index)} 
                                                          name='selectedID' 
                                                          style={seatColors(index)}
                                                        />
                                                      ))
                                                    }
                                              </div>
                                              {sucmsg && <p className="text-center text-success my-4">{sucmsg}</p>}

                                      </div>
                                      
                                    </div>
                                
                                    {errmsg && <p className="b text-danger"> {errmsg} </p>}

                                      <button type="button" className="btn m-2 bg-success text-white"  onClick={AddId}>Book Seat</button>

                              </>
                              } 
                          </div>

                          
                          <div>
                              <p>{subtotal <= 0  ? `${none}` : `${message}`}</p>
                              <p>{total <= 0 ? `${none}` : `The Total for the selected movies is: ₦${total}`}</p>
                                  <div>
                                    {
                                        subtotal <= 0  
                                        ? 
                                          `${none}`
                                        :
                                        <div className='justify-content-right'>
                                          <button onClick={flutterpaymm}> Click to Continue</button>
                                          {errorMessage && <p className='text-danger b'>{errorMessage}</p>}
                                        </div> 
                                    }
                                  </div>
                            </div>
                    </div> 
                </div> 
            ):
            (<div>{none}</div>)
            
          }
      </div> 


    </div>

    <Footer />
  </div>
  );
}

export default Moviedetails;
