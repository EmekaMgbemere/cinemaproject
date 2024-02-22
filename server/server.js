const express = require("express");
const mongoose  = require('mongoose');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('../server/models/User');
const Token = require('../server/models/Token');
const BookingId = require('../server/models/BookingId');
const Cinema = require('../server/models/Cinema');
const Cinemahall = require('../server/models/Cinemahall');
const Movie = require('../server/models/Movie');
const Location = require('../server/models/Location');
const theaterhall = require('./models/theaterhall');
const Theateradminbookings = require('./models/Theateradminbookings');
const { check, validationResult } = require('express-validator');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const Flutterwave = require('flutterwave-node-v3');
const Flutter = require('../../showbux/server/models/flutterpayment.js')
const flw = new Flutterwave('/server/process.env.FLW_PUBLIC_KEY', '/server/process.env.FLW_SECRET_KEY');
const dotenv = require('dotenv');
var store = require('store');
const multer = require("multer");
var path = require('path');


dotenv.config();
app.use(cors());

const URL = "mongodb://127.0.0.1:27017/showbux";


const port = process.env.PORT;

require('dotenv').config();

app.set("view engine", "ejs");
app.use(morgan('tiny'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static('public'));


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ parameterLimit: 50000, extended: false, limit: '50mb' }));

mongoose.connect(URL,{ 
  useNewUrlParser:true,
  useUnifiedTopology:true 
})
mongoose.connection.on('open',()=>console.log("Mongodb Connected"))
mongoose.connection.on('error',(e)=> console.log(e))

mongoose.set('strictQuery', false);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      console.log(req.file);
      const uniqueSuffix = Date.now();
      cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });



app.get("/",function(req,res){
	res.send({msg:"Directly from Server"})
});

app.post('/cinemaadmin', 
[
  check('phonenumber', 'phonenumber is required')
    .not()
    .isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please exter a password with 6 or more characters').isLength({ min:6})
],

async(req, res) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.json({ errors: errors.array()});
  }
  const { phonenumber, email, password, userType, secretKey } = req.body;
    try{
      if (!phonenumber || !email|| !password ||!userType || !secretKey ) {
         res.json( 'One or more fields are required');
      }

      let user = await User.findOne({email, phonenumber});
      if(user){
        res.json("User Already exists");
      }
      else{
      const avatar = gravatar.url(email, {
        s:'200',
        r: 'pg',
        d:'mm'
      })

user = new User({
  phonenumber,
  email,
  password,
  userType,
  secretKey,
  avatar,   movielocation,
  counterid,
  countername,
  CinemaFromAdminId
});

const salt = await bcrypt.genSalt(10);

user.password = await bcrypt.hash(password, salt);

await user.save();
    const payload ={
      user:{
        id: user.id
      }
    };

    jwt.sign(
      payload, 
      process.env.jwtSecret,
      {expiresIn: '1d'}, 
      (err, token) =>{
        if(err) throw err;
        res.json({token});
        console.log(`Signup token: ${token}`)
      }
      );
    }
    
    } catch (err) {
      console.error(err.message)
      res.json('An error occurred');
    }
});


app.post('/signup', 
async(req, res) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.json({ errors: errors.array()});
  }
  const { 
    cinemaName,
    adminID,
    firstname,
    lastname,
    phonenumber,
    email,
    password,
    userType,
    secretKey,
    companyAddress,
    companyId,
    theaterID,
    selectedlocation,
    avatar,
    CinemaFromAdminId,
    movielocation,
    counterid,
    countername,
    selectedusers,seatnumber,numImages,selectedOption } = req.body;
    try{
      let user = await User.findOne({email, phonenumber});
      if(user){
        res.json("User Already exists");
      }
      else{
      const avatar = gravatar.url(email, {
        s:'200',
        r: 'pg',
        d:'mm'
      })

user = new User({
  cinemaName,
  adminID,
  firstname,
  lastname,
  phonenumber,
  email,
  password,
  userType,
  secretKey,
  companyAddress,
  companyId,
  theaterID,
  selectedlocation,
  avatar,
  movielocation,
  counterid,
  countername,
  CinemaFromAdminId,
  selectedusers,
  seatnumber,
  numImages,
  selectedOption
});

const salt = await bcrypt.genSalt(10);

user.password = await bcrypt.hash(password, salt);

await user.save();

    const payload ={
      user:{
        id: user.id
      }
    };

    jwt.sign(
      payload, 
      process.env.jwtSecret,
      {expiresIn: '1d'}, 
      (err, token) =>{
        if(err) throw err;
        res.json({token});
        console.log(`Signup token: ${token}`)
      }
      );
    }
    
    } catch (err) {
      console.error(err.message)
      res.json('An error occurred');
    }
});


app.post('/cinemafromadmin', 

async(req, res) =>{

  const { 
    adminID,
    firstname,
    lastname,
    phonenumber,
    email,
    password,
    userType,
    secretKey,
    companyAddress,
    companyId,
    theaterID,
    selectedlocation,
    avatar,
    CinemaFromAdminId,
    movielocation,
    counterid,
    countername,
    selectedusers,seatnumber,numImages,selectedOption } = req.body;
    try{
      let user = await User.findOne({email, phonenumber});
      if(user){
        res.json("User Already exists");
      }
      else{
          user = new User({
            adminID,
            firstname,
            lastname,
            phonenumber,
            email,
            password,
            userType,
            secretKey,
            companyAddress,
            companyId,
            theaterID,
            selectedlocation,
            avatar,
            movielocation,
            counterid,
            countername,
            CinemaFromAdminId,
            selectedusers,
            seatnumber,
            numImages,
            selectedOption
          });
          await user.save();
          res.json(`Saved data: ${user}`)
          console.log(`Saved data: ${user}`)
      }
    } catch (err) {
      console.error(err.message)
      res.json('An error occurred');
    }
});


app.post('/theatersignup', async (req, res) => {
  const { secretKey, password, email, userType, theaterID, selectedlocation } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      secretKey,
      password,
      email,
      userType,
      theaterID,
      selectedlocation
    });

    await user.save();

    res.json({ msg: 'Theater Admin successfully created' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get("/users", (req, res) => {
  User.find()
  .then(user => res.json(user))
});

app.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, secretKey } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid Credentials A' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid Credentials: Password is incorrect' });
    }

else{ 
const payload = {
user: {
  id: user.id,
},
};

jwt.sign(
payload,
process.env.jwtSecret,
{ expiresIn: '1d' },
async (err, token) => {
  if (err) throw err;

  try {
    const newToken = new Token({
      token: token
    });
    await newToken.save();
    console.log(`Token saved to the database.`);
    
    res.json({ token, user });
    const UserId = user._id;
    store.set('user', UserId )

    console.log(`Login token: ${token} and userID: ${UserId}`);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to save token to the database.' });
  }
}
);
}

  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/logout', (req, res) => {
  const {Utoken} = req.body;
  Token.findOneAndDelete({ Utoken }, (err, doc) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred during logout' });
    } else if (!doc) {
      res.status(404).json({ message: 'Token not found or already expired' });
    } else {
      res.json({ message: 'Logout successful' });
    }
  });
});

app.post('/flutterpayment', async (req, res) => {
  const response = req.body;
  const UserId = store.get('user');

      console.log(`Server ${JSON.stringify(response)}`);
  
      res.send('Received payment response successfully');
  
      if(response.status == "successful"){

        const newFlutter = new Flutter({
          transaction_id: response.transaction_id,
          tx_ref:response.tx_ref,
          amount: response.amount,
          created_at: response.created_at,
            customer: {
                    email: response.customer.email,
                    name: response.customer.name,
                    phone_number: response.customer.phone_number,
                  },
                  UserId: UserId,
                });
  
          newFlutter.save((error) => {
            if (error) {
              console.error('Error saving payment data:', error);
            } else {
              console.log('Payment data saved successfully' + newFlutter);
            }

          })

        }
  
        else {
        console.error('Error saving payment response to MongoDB:');
        }

    });

    app.get('/flutterpayment/:userId', async (req, res) => {
      try {

        const {UserId} = req.params;
    
        const paymentData = await Flutter.find({ UserId: UserId });
    
        res.json(paymentData);
      } catch (error) {
        console.error('Error fetching payments:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    });


    app.get('/flutterpayment', (req, res) => {
      Flutter.find({}, (error, paymentData) => {
        if (error) {
          console.error('Error retrieving paymentData:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(paymentData);
        }
      });
    });


    app.post('/bookingapi', async (req, res) => {
      const { arrId, selectedID } = req.body;

      try {
        console.log(`This is a list: ${arrId}`);
    
        const IdSelect = await BookingId.findOne({ selectedID });
    
        if (IdSelect) {
          return res.status(400).json({ msg: 'ID already exists. Please select another.' });
        }
    
        const newId = new BookingId({
          arrId, selectedID
        });
    
        await newId.save();
    
        res.status(200).json({ msg: 'Seat Reserved Successfully!' });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err.message });
      }
    });

    app.get('/bookingapi', async (req, res) => {
      try {
        const bookingIds = await BookingId.find();
        res.json(bookingIds);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching BookingIds' });
      }
    });

app.post('/movie', upload.single('movieimage'), async (req, res) => {
    const { nowshowingID, comingsoonID, cinemafromadminID, movieduration, movietitle, moviedescription, movietrailer, pg, base64, movielocation, theaterid } = req.body;
;    try {
          if (!movietitle || !moviedescription ||!pg ||!movietrailer ||!movieduration|| !movietrailer || !base64) {
            res.json( 'One or more fields are required');
        }
        else{ 
          await Movie.create({
          image:base64, 
          movietitle: movietitle,
          moviedescription: moviedescription,
          movieimage:base64,
          movieduration: movieduration,
          movietrailer: movietrailer,
          pg: pg,
          movielocation,
          theaterid,
          cinemafromadminID,
          comingsoonID,
          nowshowingID
        });

      res.json('Movie Created Successfully');

    }
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: ' This Internal Server Error' });
    }
  });
app.post('/comingsoon', upload.single('movieimage'), async (req, res) => {
    const { comingsoonID, cinemafromadminID, movieduration, movietitle, moviedescription, movietrailer, pg, base64, movielocation, theaterid } = req.body;
;    try {
          if (!movietitle || !moviedescription ||!pg ||!movietrailer ||!movieduration|| !movietrailer || !base64) {
            res.json( 'One or more fields are required');
        }
        else{ 
          await Movie.create({
          image:base64, 
          movietitle: movietitle,
          moviedescription: moviedescription,
          movieimage:base64,
          movieduration: movieduration,
          movietrailer: movietrailer,
          pg: pg,
          movielocation,
          theaterid,
          cinemafromadminID,
          comingsoonID
        });

      res.json('Movie Created Successfully');

    }
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: ' This Internal Server Error' });
    }
  });

  app.get("/comingsoon", async (req, res) => {
    try {
      const data = await Movie.find({});

      if (!data) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      return res.json(data);
    } 
    
    catch (error) {
      res.status(500).send("Internal Server Error");
    }
  });
  app.get("/movie", async (req, res) => {
    try {
      const data = await Movie.find({});

      if (!data) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      return res.json(data);
    } 
    
    catch (error) {
      res.status(500).send("Internal Server Error");
    }
  });

  app.delete('/comingsoon/:id', async (req, res) => {
    try {
      const cinemaId = req.params.id;
      const deletedCinema = await Movie.findByIdAndDelete(cinemaId);
      
      if (!deletedCinema) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      
      res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.delete('/movie/:id', async (req, res) => {
    try {
      const cinemaId = req.params.id;
      const deletedCinema = await Movie.findByIdAndDelete(cinemaId);
      
      if (!deletedCinema) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      
      res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.get('/comingsoon/:id', async (req, res) => {
    const CinemaId = req.params.id;
  
    try {
      const cinema = await Movie.findById(CinemaId);
      if (!cinema) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      return res.json(cinema);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/movie/:id', async (req, res) => {
    const CinemaId = req.params.id;
  
    try {
      const cinema = await Movie.findById(CinemaId);
      if (!cinema) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      return res.json(cinema);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  app.post('/theateradminbookings', async (req, res) => {
    const {userType, price, movietitle, movietime, theater, theaterid, cinemaId } = req.body;

    try {
  
      const newData = new Theateradminbookings({
        cinemaId, userType, price, movietitle, movietime, theater, theaterid });
  
      await newData.save();
  
      res.status(200).json({ msg: 'Booking Reserved Successfully!' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Unsuccessful. Please Redo " });
    }
  });

  app.get('/theateradminbookings', async (req, res) => {
    try {
      const data = await Theateradminbookings.find({});

      if (!data) {
      return res.status(400).json({ error: 'Booking not found' });
    }
    return res.json(data);

    } 
    catch (error) {
      res.status(500).send("Internal Server Error");
    }
  });

  app.post('/cinemahall', async (req, res) => {
    const { moviedescription, movieimages, theaterlocation, cinematheaterID, numImages,selectedusers, price, sendcin , movietitle, movietime, moviedate, theater, movieid, theaterid} = req.body; 
  
    try {
      const cin = await Cinemahall.findOne({ theater, movietime }); 
  
      if (cin) {
        return res.status(400).json({ msg: 'Movie already Selected at this hall at the same time. Please select another.' });
      }
      const cine = new Cinemahall({ moviedescription, movieimages, theaterlocation, cinematheaterID, numImages,selectedusers, price, sendcin , movietitle, movietime, moviedate, theater, movieid, theaterid});
      await cine.save();
      res.status(200).json({ msg: 'Cinema Created Successfully!' });
    } 
    catch (err) {
      console.log(err);
      return res.status(500).json({ err:"Location Name and Cinema Name cannot be Empty." });
    }
  });
  
  app.get('/cinemahall', async (req, res) => {
    try {
      const data = await Cinemahall.find({});
  
      if (!data) {
        return res.status(404).json({ error: 'Cinema not found' });
      }
      return res.json(data);
    } 
      catch(error){
        res.send("Not Available")
      }
  });


  app.get('/cinemahall/:id', async (req, res) => {
    const id= req.params.id;
  
    try {
      const cinhallid = await Cinemahall.findById(id);
      if (!cinhallid) {
        return res.status(404).json({ error: 'Cinema hall not found' });
      }
      return res.json(data);

    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.delete('/cinemahall/:id', async (req, res) => {
    try {
      const cinemahallId = req.params.id;
      const deletedcinemahallId = await Cinemahall.findByIdAndDelete(cinemahallId);
      
      if (!deletedcinemahallId) {
        return res.status(404).json({ error: 'Cinema Hall not found' });
      }
      
      res.json({ message: 'Cinema Hall deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
  app.put('/movie/:id', async (req, res) => {
   
      let result = await Movie.updateOne(
        { _id : req.params.id}, 
        { $set: req.body  }
      )
     res.send({ result });
  });


  // LOCATION: 

app.post('/location', upload.single('locimg'), async (req, res) => {
  const {base64, location,state,city,street,housenumber} = req.body;
  try{
    await Location.create({image:base64, location: location, state,city,street,housenumber});
    res.send({status:"ok"});
  }
  catch(error){
    res.send({status:"error", data:error});
  }
})

app.get('/location', async (req, res) => {
  try{
    await Location.find({})
    .then(data => {
      res.send({ status: "ok", data: data})
    })
  }
    catch(error){
      res.send("Not Available")
    }
});

app.delete('/location/:id', async (req, res) => {
  try {
    const locationId = req.params.id;
    const deletedLocation = await Location.findByIdAndDelete(locationId);
    
    if (!deletedLocation) {
      return res.status(404).json({ error: 'Location not found' });
    }
    
    res.json({ message: 'Location deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/location/:id', async (req, res) => {
  const LocationId = req.params.id;

  try {
    const location = await Location.findById(LocationId);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    return res.json(location);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/location/:id', async (req, res) => {
  try {
    const result = await Location.findByIdAndUpdate(
      req.params.id,
      { location: req.body.location },
      { new: true }
    );

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: 'Location not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating Location' });
  }
});



  // USER: 
app.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/users/:id', async (req, res) => {
 
    let result = await User.updateOne(
      { _id : req.params.id}, 
      { $set: req.body  }
    )
   res.send({ result });
});

app.post('/cinema', upload.single('cinemaimage'), async (req, res) => {
  const {hallname, countername, counterid, movielocation, hallid, theaterid } = req.body; 

  try {
    const cin = await Cinema.findOne({ hallname, countername }); 

    if (cin) {
      return res.status(400).json({ msg: 'Theater already exists. Please select another.' });
    }
    const cine = new Cinema({hallname ,countername, movielocation, hallid, counterid, theaterid });
    await cine.save();
    res.status(200).json({ msg: 'Cinema Created Successfully!' });
    console.log("CINEMA RERENDERING")
  } 
  catch (err) {
    console.log(err);
    return res.status(500).json({ err:"Location Name and Cinema Name cannot be Empty." });
  }
});

app.get('/cinema', async (req, res) => {
  try{
    await Cinema.find({})
    .then(data => {
      res.send({ status: "ok", data: data})
    })
  }
    catch(error){
      res.send("Not Available")
    }
});

app.delete('/cinema/:id', async (req, res) => {
  try {
    const cinemaId = req.params.id;
    const deletedCinema = await Cinema.findByIdAndDelete(cinemaId);
    
    if (!deletedCinema) {
      return res.status(404).json({ error: 'Cinema not found' });
    }
    
    res.json({ message: 'Cinema deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/cinema/:id', async (req, res) => {
  const CinemaId = req.params.id;

  try {
    const cinema = await Cinema.findById(CinemaId);
    if (!cinema) {
      return res.status(404).json({ error: 'Cinema not found' });
    }
    return res.json(cinema);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/cinema/:id', async (req, res) => {
  try {
    const result = await Cinema.findByIdAndUpdate(
      req.params.id,
      { cinemaname: req.body.cinemaname },
      { new: true }
    );

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: 'Cinema not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating Cinema' });
  }

});


app.listen(port, error => {
      if (error) throw error;
      console.log('Your server is running on port 6969');
    });