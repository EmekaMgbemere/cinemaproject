import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";    


function Admincinemamovie() {
    const [ movieshow, setMovieShow] = useState([]);
    const { id } = useParams();



    useEffect(() => {
        fetch(`http://localhost:6969/cinemahall/${id}`)
        .then((response) => response.json())
        .then((data) => setMovieShow(data))
        }, [id]);


  return (
<div>
    
    <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalToggleLabel">Modal 1</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="">
        <div className="text-center">
            <p className="text-uppercase m-1 fw-bolder" style={{"fontFamily": 'Concert One'}}>{movieshow.movietitle}</p>
            <p className="text-uppercase m-1 fw-bolder" style={{"fontFamily": 'Concert One'}}>{movieshow.moviedate}</p>
            <p className="text-uppercase m-1 fw-bolder" style={{"fontFamily": 'Concert One'}}>{movieshow.movietime}</p>
            <p className="text-uppercase m-1 fw-bolder" style={{"fontFamily": 'Concert One'}}>{movieshow.cinemahall}</p>
            <button className="btn btn-danger text-white rounded-pill">Get Tickets</button>
        </div>
    </div>
      </div>
      <div className="modal-footer">
        <button className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Open second modal</button>
      </div>
    </div>
  </div>
</div>
<div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalToggleLabel2">Modal 2</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        Hide this modal and show the first with the button below.
      </div>
      <div className="modal-footer">
        <button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">Back to first</button>
      </div>
    </div>
  </div>
</div>
<a className="btn btn-primary" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Open first modal</a>
</div>
  )
}

export default Admincinemamovie

