import React, { useEffect, useState } from "react";
import Adminleftnav from "./Adminleftnav";
import Admintopnav from "./Admintopnav";
import { useNavigate, useParams  } from "react-router-dom";


function Admineditmovie(){
    const nav = useNavigate();
    const [ movietitle, setMovietitle] = useState("");
    const [ moviedescription, setMoviedescription ] = useState("");
    const [ movieimage, setMovieImage] = useState("");
    const [ moviedate, setMoviedate] = useState("");
    const [ movietime, setMovietime] = useState("");
    const [ pg, setPg] = useState("");
    const  params = useParams();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setMovieImage(reader.result);
        };
    };
  
    const handleCancelEdit = () => {
       nav("/adminmovie");
    };

    const getCurrentDateInput = () => {
        const dateObj = new Date();      
        const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
        const day = ("0" + dateObj.getDate()).slice(-2);
        const year = dateObj.getFullYear();
      
        const shortDate = `${year}-${month}-${day}`;
      
        return shortDate;
      };

          const handleSaveEdit = async () => {
            try {
              const response = await fetch(`http://localhost:6969/movie/${params.id}`);
              if (response.ok) {
                const result = await response.json();
                setMovietitle(result.movietitle);
                setMoviedescription(result.moviedescription);
                setMovieImage(result.movieimage);
                setMoviedate(result.moviedate);
                setMovietime(result.movietime);
                setPg(result.pg);
              } else {
                console.error('Error fetching user data');
              }
            } catch (error) {
              console.error('Error:', error);
            }
          };

          useEffect(() => {
            handleSaveEdit();
          });

          const updateMovie =async () =>{
            let result = await fetch(`http://localhost:6969/movie/${params.id}`, 
            {
              method: 'PUT',
            body: JSON.stringify({ movietitle, moviedescription, movieimage, moviedate,movietime, pg }),
            headers:{
              'Content-Type': 'Application/json'
            }
            });
            result = await result.json();
            if( result ){
            alert("Update Successful");
            nav("/adminmovie");
            }
          } 
    

    return(
<div className="">
      <div className='emadmindash d-flex'>
              <div>
                      <Adminleftnav/>
              </div>
              <div className='emaddashsmright'>
                      <div>
                          <Admintopnav />
                      </div>
                      <div>
                            <div>
                            <div className=""> 
                                    <div className="my-3 col-lg-6 ">
                                        <label htmlFor="formGroupExampleInput">Movie Title</label>
                                        <input 
                                              type="text" 
                                              className="form-control" 
                                                onChange={(e) => setMovietitle(e.target.value)}  
                                                id="inputText" 
                                                placeholder="Enter Movie Title" 
                                                autoFocus  
                                                defaultValue={movietitle}
                                        />
                                    </div>
                                    <div className="my-3">
                                        <label htmlFor="formGroupExampleInput">Movie Description</label>
                                        <input type="text" className="form-control" 
                                                onChange={(e) => setMoviedescription(e.target.value)}  
                                                id="inputText" placeholder="Describe Movie " autoFocus  
                                                defaultValue={moviedescription}
                                        />
                                    </div>
                                    <div className='d-flex gap-3'>
                                        <div className="my-3 col-lg-6">
                                            <label htmlFor="formGroupExampleInput">Movie Image</label>
                                            <input 
                                                    type="file" 
                                                    className="form-control" 
                                                    accept="image/*"
                                                    onChange={handleImageChange} 
                                                    placeholder="Select Image" 
                                                    autoFocus  
                                                    name="movieimage"
                                            />
                                        </div>
                                        <div className="my-3 col-lg-6">
                                                    <label htmlFor="formGroupExampleInput">Movie PG</label>
                                                    <input 
                                                          type="number" 
                                                          className="form-control" 
                                                            onChange={(e) => setPg(e.target.value)}  
                                                            id="inputText" placeholder="Select Age" 
                                                            autoFocus min={4}
                                                            defaultValue={ movieimage}
                                                    />
                                          </div>
                                    </div>
                                <div className="d-flex gap-3">
                                        <div className="my-3 col-lg-4">
                                                <label htmlFor="formGroupExampleInput">Movie Time</label>
                                                <input type="time" className="form-control" 
                                                        onChange={(e) => setMovietime(e.target.value)}  
                                                        id="inputText" 
                                                        placeholder="Enter Movie Time" 
                                                        autoFocus  
                                                        defaultValue={ movietime}
                                                />
                                            </div>
                                            <div className="my-3  col-lg-4">
                                                <label htmlFor="formGroupExampleInput">Movie Date</label>
                                                <input type="date"  className="form-control" 
                                                        autoFocus 
                                                        required
                                                        onChange={(e) => setMoviedate(e.target.value)}  
                                                        defaultValue={getCurrentDateInput()} 
                                                        id="inputText" 
                                                        placeholder="Select Date . . . "   
                                                />
                                            </div>
                                </div>
                                    </div>
                                            <div>
                                                <button className="btn btn-success mx-1" onClick={updateMovie}>Save</button>
                                                <button className="btn btn-danger mx-1" onClick={handleCancelEdit}> Cancel</button>
                                            </div>
                          </div>
                      </div>
              </div>
      </div>
</div>
    )
}

export default Admineditmovie;;

