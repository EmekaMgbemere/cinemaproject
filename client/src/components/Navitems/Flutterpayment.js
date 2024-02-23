import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate} from "react-router-dom";
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import bckimg from '../images/emheader.jpg'
import Nav from './Nav';


const Flutterpayment = () => {
  const[email, setEmail] = useState('');
  const[phone_number, setPhoneNumber] = useState('');
  const[name, setName] = useState('');
  const [theMovie] = useState({
    movieName: localStorage.getItem("Movietitle"),
    price: localStorage.getItem("totalStorage"),
    time: localStorage.getItem("time"),
    Chosendate: localStorage.getItem("Chosendate"),
  });

  const nav = useNavigate();


  const config = {
    public_key: 'FLWPUBK_TEST-41f2f202752d383f5af8b158cbcba3b1-X',
    tx_ref: Date.now(),
    amount: theMovie.price,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: email,
      phone_number: phone_number,
      name: name,
    },
    customizations: {
      title: theMovie.movieName,
      description: `Payment for ${theMovie.movieName}, on ${theMovie.Chosendate} at ${theMovie.time}.`,
      logo: theMovie.images,
    },
  };

  const backgroundStyle = {
    backgroundImage: `url(${bckimg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh', 
    boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,.7)'
  };

  const handleFlutterPayment = useFlutterwave(config);

  
  return (
    <>
    <div className=" ">
      <div>
        <Nav />
      </div>
      <div className="w-100 pt-5" style={backgroundStyle}>
            <h2 className='text-white' style={{"margin":"2% 10%"}}>Flutterwave Payment Integration</h2>
            <div className="bg-transparent emcounterdashboardcard">
                  <div className='' >
                      <div className='' >
                          <p>
                            <span>Movie Name: {theMovie.movieName}</span>
                          </p>
                          <p>
                            <span>Price: </span>
                              ₦{theMovie.price}
                          </p>
                          <p>
                            <span>Date: </span>
                              {theMovie.Chosendate}
                          </p>
                          <p>
                            <span>Time: </span>
                              {theMovie.time}
                          </p>
                      </div>
                  </div>
                  <div>
                            {
                              !theMovie.movieName || !theMovie.price || !theMovie.Chosendate || !theMovie.time ? (
                                <div className='' style={{marginTop:"10%"}}>
                                    <p className="bg-danger text-center fs-4"> One or more selections are missing. Click <Link to='/movies' className='fs-4 text-warning'>Movies</Link> to proceed. </p>
                                </div>
                              ) : 
                              (
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                  Proceed
                                </button>
                              )
                            }
                  </div>
            </div>
        </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Please Enter Details to proceed</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-3">
              <form className=''>
                  <div className='m-2'>
                    <label>Name :</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name"  className='mx-4' style={{width:"74%"}}/>
                  </div>
                  <div className='m-2'>
                    <label>Email : </label>
                    <input type="text" id="name" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email"  className='mx-4' style={{width:"74%", margin:'1.5%'}}/>
                  </div>
                  <div className='m-2'>
                    <label> Number :</label>
                    <input type="number" id="phone_number" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter phone"  className='mx-2' style={{width:"74%"}}/>
                  </div>
              </form>
            </div>
            <div className="modal-footer justify-content-center">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <div>
                    { email <= "" || phone_number <="" || name === '' 
                    ?
                      <button type="button" className="btn btn-light bg-secondary text-white">waiting . . .</button>
                      :
                      <div className='justify-content-left'>
                         <button type="button" className="btn btn-primary" onClick={() => {
                        handleFlutterPayment({
                          callback: (response) => {
                            axios.post('/flutterpayment', response)
                              .then((resp) => {
                                        console.log('Backend response:', resp.data);
                                        nav('/movies');
                              })
                              .catch((error) => {
                                console.error('Error sending data to the backend:', error);
                              });
                        
                            closePaymentModal();
                          },
                          onClose: () => {},
                        });             
                        }}
                    >
                      Proceed To Payment
                          </button>
                        </div>
                        }                    
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default Flutterpayment;

