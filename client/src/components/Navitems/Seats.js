import React, { useEffect, useState } from "react";
import emmoviechair from '../images/emmoviechair.png';
import cinemascreen from '../images/cinema.png';


function Seats() {
  const [selectedID, setSelectedId] = useState('');
  const [arrId, setArrId] = useState([]);
  const [dispArr, setDispArr] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [errmsg, setErrmsg] = useState(" ");
  const [sucmsg, setSucMsg] = useState(" ");
  const [showModal, setShowModal] = useState(true);


  const handleclick = async (e) => {
    e.preventDefault();
    setSelectedId(e.target.id);
    setArrId((currentArrId) => [...currentArrId, e.target.id]);
  };

  const handleAddId = async () =>{
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


  useEffect(() => {
    fetch("http://localhost:6969/bookingapi")
    .then((res) => res.json())
    .then((data) => {
                      setDispArr(data);
                      setTotalCount(data.length)});
                      setErrmsg("");
                      
      }, [arrId, selectedID]);


    const handleCloseModal = () => {
    setShowModal(!showModal);
  };


  return (
    <>
  <div className="container-fluid top">
      { showModal &&
      <>
        <div className="" >
              
            {sucmsg && 
                  <p className="text-center text-success"> 
                      {sucmsg} 
                  </p>
             }

             {errmsg && 
                  <p className="text-center text-danger"> 
                      {errmsg} 
                  </p>
             }
              <div className="modal-body emhomepagemodalbody ">
                <div className="emuserhomepageimg0">
                      <div><img src={cinemascreen} alt='cinemascreen' width={'250px'} />
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="emuserhomepageimg0">
                          <img src={emmoviechair} id='410' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                          <img src={emmoviechair} id='411' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                          <img src={emmoviechair} id='412' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                          <img src={emmoviechair} id='413' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                          <img src={emmoviechair} id='414' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                      </div>
                </div>
                  <div className="emuserhomepageimg0">
                      <img src={emmoviechair} id='310' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                      <img src={emmoviechair} id='311' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                      <img src={emmoviechair} id='312' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                      <img src={emmoviechair} id='313' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                      <img src={emmoviechair} id='314' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                      <img src={emmoviechair} id='315' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                      <img src={emmoviechair} id='316' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                      <img src={emmoviechair} id='317' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                  </div>
                  <div className="emuserhomepageimg0">
                      <img src={emmoviechair} id='210' alt='emmoviechair' name='selectedID' onClick={handleclick}/>
                      <img src={emmoviechair} id='211' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                      <img src={emmoviechair} id='212' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                      <img src={emmoviechair} id='213' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                      <img src={emmoviechair} id='214' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                      <img src={emmoviechair} id='215' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                      <img src={emmoviechair} id='216' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                      <img src={emmoviechair} id='217' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                      <img src={emmoviechair} id='218' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                      <img src={emmoviechair} id='219' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                      <img src={emmoviechair} id='220' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                  </div>
                    <br></br>
                    <button className='btn btn-primary' onClick={handleAddId}>select</button>
                    <p>ID from Array: {arrId}</p>
                    <p>Array number:{totalCount}</p>
                    <div>
                      {
                        dispArr.map((avIds, id) => {
                          return (
                            <div className="" key={id}>
                              <p>{avIds.selectedID}</p>
                            </div>
                          );
                        })
                      }
                    </div>
                    <hr></hr>
               </div>
        </div>
      </>
      }
        <div className="d-flex justify-content-end">
          <button onClick={handleCloseModal} className="btn btn-danger">close</button>
        </div>
  </div>
    </>
  );
}

export default Seats;

