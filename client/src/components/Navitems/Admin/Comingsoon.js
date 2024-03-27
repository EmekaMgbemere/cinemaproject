import React, { useCallback, useEffect, useState } from "react";
import Admintopnav from "./Admintopnav";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Adminleftnav from "./Adminleftnav";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';



function Comingsoon() {

    const [ movietitle, setMovietitle] = useState("");
    const [ moviedescription, setMoviedescription ] = useState("");
    const [ movieimage, setMovieImage] = useState("");
    const [ movieduration, setMovieduration] = useState("");
    const [ movietrailer, setMovietrailer] = useState("");
    const [ movloc, setMovLoc] = useState([]);
    const [create, setCreate] = useState(false);
    const [ pg, setPg] = useState("");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(true);
    const [ movielocation, setMovieLocation] = useState([]);
    const [ users, showUsers] = useState([]);
    const [movies, showMovies] = useState();

    const nav = useNavigate();


const FindUser = useCallback(async () => {
    fetch('http://localhost:6969/comingsoon')
    .then(response => response.json())
          .then(data => { 
                          const fd = data.filter( (h) => h.comingsoonID );                    

                          showUsers(fd); 

                          setLoading(false);
                          console.log('Admin movie' + JSON.stringify(data));
                        })
          .catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false);
          });
        },[])

  useEffect(() => {
    FindUser()
    }, [FindUser]);


    useEffect(() => {
      fetch('http://localhost:6969/location')
        .then(response => response.json())
        .then(data => setMovLoc(data.data))
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        })
      }, []);


    function convertToBase64(e){
      console.log(e);
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        console.log(reader.result);
        setMovieImage(reader.result);
      };
      reader.onerror = error =>{
        console.log("error: ", error)
      }
    }

  
    if (loading) {
      return <p>Loading...</p>;
    }

    function handlesetchange( ){
        setCreate(!create);
        setErr(" ");
      }


    
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!movietitle || !movieimage || !moviedescription ||!pg || !movieduration || !movietrailer || !movielocation ) {
        alert("Please fill all fields!");
     }
     else{
      try {
        const response = await fetch('http://localhost:6969/comingsoon', {
          method:"POST",
          crossDomain: true,
          headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow-Origin":"*",
          },
          body: JSON.stringify({
            movietitle, 
            moviedescription, 
            base64: movieimage, 
            movieduration,
            movietrailer,
            pg,
            movielocation,
            comingsoonID: uuidv4()
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setErr("");
          setMovietitle("");
          setMoviedescription("");
          setMovieImage("");
          setMovieduration("");   
          setMovietrailer("");   
          setPg("");
          setCreate("");         
          setMovieLocation("");         
          alert('Movie Created Successfully');
          FindUser();
        } 
        
        else {
          setErr(data.error);
          alert('Error: ' + data.error);
        }
      }    

      catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
      }
    };
  }


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:6969/comingsoon/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedMovies = movies.filter(movie => movie._id !== id);
        showMovies(updatedMovies);
      } else {
        console.error('Error deleting user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  function handleMovieLocation(e){
    setMovieLocation(e.target.value);
  }

  

return(
<>
<div className="">
    <div>
        <Admintopnav />
    </div>
    <div className='emadmindash d-flex'>
        <div>
          <Adminleftnav/>
        </div>
            <div className=''>
                <div className="">
                    <div className="" style={{'margin':'2%'}}>
                        {  err && <div className="text-color-red"> {err}</div> }
                            <div  className="d-flex justify-content-start">
                                <Link to="">
                                    <button type="button" className="btn btn-outline-dark " onClick={handlesetchange} data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-solid fa-plus px-2"></i>Create</button>
                                </Link>
                            </div>
                        {
                          create &&
                          <form onSubmit={handleSubmit} encType="multipart/form-data"> 
                                  <div className=""> 
                                      <div className="d-flex gap-3 emflexmdsm">
                                          <div className="my-3 col-lg-6 col-sm-4">
                                              <label htmlFor="formGroupExampleInput">Movie Title</label>
                                              <input type="text" className="form-control" 
                                                      onChange={(e) => setMovietitle(e.target.value)}  
                                                      id="inputText" placeholder="Enter Movie Title" autoFocus  
                                              />
                                          </div>
                                          <div className="my-3 col-lg-6 col-sm-4">
                                              <label htmlFor="formGroupExampleInput">Movie Duration</label>
                                              <input type="number" className="form-control" 
                                                      onChange={(e) => setMovieduration(e.target.value)}  
                                                      id="inputText" placeholder="Enter Length Of Movie" autoFocus  
                                              />
                                          </div>
                                      </div>
                                      <div className="d-flex gap-3 emflexmdsm">
                                          <div className="my-3 col-lg-6 col-sm-4">
                                              <label htmlFor="formGroupExampleInput">Movie Description</label>
                                                <input type="text" className="form-control" 
                                                        onChange={(e) => setMoviedescription(e.target.value)}  
                                                        id="inputText" placeholder="Describe Movie " autoFocus  
                                                />
                                          </div>
                                          <div className="my-3 col-lg-6 col-sm-4">
                                              <label htmlFor="formGroupExampleInput">Movie Trailer</label>
                                              <input type="text" className="form-control" 
                                                      onChange={(e) => setMovietrailer(e.target.value)}  
                                                      id="inputText" placeholder="Paste Trailer Link" autoFocus  
                                              />
                                          </div>
                                      </div>
                                      <div className='d-flex gap-3 emflexmdsm'>
                                          <div className="my-3 col-lg-6 col-sm-4">
                                              <label htmlFor="formGroupExampleInput">Movie Image</label>
                                              <input 
                                                      type="file" 
                                                      className="form-control" 
                                                      accept="image/*"
                                                      onChange={convertToBase64} 
                                                      placeholder="Select Image" 
                                                      autoFocus  
                                                      name="movieimage"
                                              />
                                          </div>
                                          <div className="my-3 col-lg-6 col-sm-4">
                                                      <label htmlFor="formGroupExampleInput">Movie PG</label>
                                                      <input type="number" className="form-control" 
                                                              onChange={(e) => setPg(e.target.value)}  
                                                              id="inputText" placeholder="Select Age" autoFocus min={4}
                                                      />
                                            </div>
                                      </div>
                                      <div className="mx-1">
                                            <label htmlFor="formGroupExampleInput">Location</label>
                                              <div>
                                              <select name='selectedDate' onClick={handleMovieLocation} className='p-2' required>
                                                      <option value="location" disabled 
                                                          placeholder="Select Location . . . "> 
                                                          Select Location...
                                                      </option>
                                                      {movloc && movloc.map((dat, _id) => {
                                                        return(
                                                          <option key={_id}>
                                                            <p className=''>{dat.location}</p>
                                                          </option>
                                                        )
                                                      })}
                                                  </select> 
                                              </div>
                                      </div>
                                </div>
                                      <div className="my-4">
                                      <button className="btn btn-primary" type="submit" >Create</button>
                                      </div>
                            </form>
                        }
                    </div>
                    {err && <div className='text-danger'>{err} </div>}
                </div>
                <div className="m-3">
                    <Table className="table emtable" border={"1px"}>
                        <Thead>
                            <Tr className="" >
                                <Th>Movie Title</Th>
                                <Th>Movie Description</Th>
                                <Th>Movie Trailer</Th>
                                <Th>Movie Duration</Th>
                                <Th>Movie Location</Th>
                                <Th>PG</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                          <Tbody>
                                {
                                users.map((movie, _id) => 
                                {
                                  return(
                                    <Tr key={movie._id}>
                                    <Td>{movie.movietitle}</Td>
                                    <Td>{movie.moviedescription}</Td>
                                    <Td>{movie.movietrailer}</Td>
                                    <Td>{movie.movieduration}</Td>
                                    <Td>{movie.movielocation}</Td>
                                    <Td>{movie.pg}</Td>
                                    <Td>
                                        <div>
                                            <Link onClick={() => handleDelete(movie._id)}>
                                            <i className="fa-solid fa-trash" style={{ color: "#ec1809", marginRight: "10px" }}></i>
                                            </Link>
                                            <Link to={"/admineditmovie/"+movie._id}>
                                            <i className="fa-solid fa-pen-to-square" style={{ color: "#2450a8", marginRight: "10px" }} onClick={() => nav("/admineditmovie", { state : movie})}></i>
                                            </Link>
                                        </div>
                                    </Td>
                                  </Tr>
                                  )
                                })}
                          </Tbody>
                    </Table>
                </div>
            </div>
      </div>
</div>
</>
    )
}


export default Comingsoon;
