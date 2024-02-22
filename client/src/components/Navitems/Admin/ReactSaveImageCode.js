
import React, { useState, useEffect } from "react";
// import Adminleftnav from "./Adminleftnav";
// import Admintopnav from "./Admintopnav";
// import { Link } from "react-router-dom";
// import axios from "axios";


function Adminlocation(){

    const [create, setCreate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [ allImage, setAllImage] = useState([]);
    const [ image, setImage] = useState([]);


    function convertToBase64(e){
      console.log(e);
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        console.log(reader.result);
        setImage(reader.result);
      };
      reader.onerror = error =>{
        console.log("error: ", error)
      }
    }

    function uploadImage(){
      fetch("http://localhost:6969/location",{
        method:"POST",
        crossDomain: true,
        headers:{
          "Content-Type":"application/json",
          Accept:"application/json",
          "Access-Control-Allow-Origin":"*",
        },
        body: JSON.stringify({
          base64: image
        })
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
    }

    function getImage(){
      fetch("http://localhost:6969/location",{
        method:"GET",
    })
        .then((res) => res.json())
        .then((data) => setAllImage(data.data),
        setLoading(false))
    }

    useEffect(() =>{
      getImage()
    },[image])


    if (loading) {
      return <p>Loading...</p>;
    }


    return( 
      <>
      <div>
          <input 
            type="file"
            accept="image/*"
            placeholder="locimg"
            onChange={convertToBase64} 
          />
          {image ==="" || image == null ? "" :<img width={100} height={100} src={image} alt="" />}
        <button onClick={uploadImage}>Create</button>
      </div>
      <div>
      {
        allImage.map((data, _id) => (
          <div key={data._id}>
            <img width={100} height={100} src={data.image} alt="thisimg"/>
          </div>
        ))
      }
      </div>
      
      </>
    )
}

export default Adminlocation; 


//BACKEND: 
// const multer = require("multer");
// var fs = require('fs');
// var path = require('path');


// dotenv.config();
// app.use(cors());

// const URL = "mongodb://127.0.0.1:27017/showbux";

// const port = process.env.PORT;

// require('dotenv').config();

// app.set("view engine", "ejs");
// app.use(morgan('tiny'));
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
// app.use(cookieParser());
// app.use(express.urlencoded({extended:true}))
// // app.use(express.static(process.env.STATIC_DIR));

// app.use(express.static(path.join(__dirname, 'uploads')));
// app.use(express.static('public'));


// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ parameterLimit:50000, extended: false, limit: '50mb' })); 


// mongoose.connect(URL,{ 
//   useNewUrlParser:true,
//   useUnifiedTopology:true 
// })
// mongoose.connection.on('open',()=>console.log("Mongodb Connected"))
// mongoose.connection.on('error',(e)=> console.log(e))

//   const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "uploads");
//     },
//     filename: function (req, file, cb) {
//       console.log(req.file);
//       const uniqueSuffix = Date.now();
//       cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
//     }
//   });
  
//   const upload = multer({ storage: storage });


// app.post('/location', upload.single('locimg'), async (req, res) => {
//     const {base64, location} = req.body;
//     try{
//       await Location.create({image:base64, location: location});
//       res.send({status:"ok"});
//     }
//     catch(error){
//       res.send({status:"error", data:error});
//     }
//   })


// app.post('/location', upload.single('locimg'), async (req, res) => {
//     const {base64, location} = req.body;
//     try{
//       await Location.create({image:base64, location: location});
//       res.send({status:"ok"});
//     }
//     catch(error){
//       res.send({status:"error", data:error});
//     }
//   })
  
  
  
//   app.get('/location', async (req, res) => {
//     try{
//       await Location.find({})
//       .then(data => {
//         res.send({ status: "ok", data: data})
//       })
//     }
//       catch(error){
  
//       }
//   });