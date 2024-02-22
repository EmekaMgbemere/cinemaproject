const express = require('express');
const auth = require("../../Middleware/auth")
const User = require("../../models/User");

const routes = function (app) {
  app.get('/', auth, async (req, res) => 
  {
    try{
      const user = await User.findById(req.user.id).select('-password');
      req.json(user);
    }
    catch(err){
      console.error(err.message);
      res.status(500).send('Server Error');
    }  
  }

  )
}
module.exports = routes;



  // app.post('/signup', async (req, res) => {
  //   try{
  //   const { firstname, lastname, phonenumber, email, password } = req.body;
  //   const userDetails= await User.findOne({ firstname, lastname, phonenumber, email, password });

  //   if (userDetails) return res.status(400).json({ msg: "One or More Details already exists!" });

  //     const Newuser = new User({
  //       firstname, lastname, phonenumber,email, password
  //     })
  //       await Newuser.save()
  //       res.status(200).send({msg:"User created"});                
  //   }
  //   catch (err) {
  //     console.log(err)
  //     return res.status(500).json({msg: err.message})
  //   }
  //   });

  // app.post("/login", async (req, res) => {
  //   try{
  //     let user = await User.findOne({ email:req.body.email });
  
  //     if (!user) {
  //         return res.send({ msg: "Invalid User"})
  //     }
  //     const validPassword = await bcrypt.compare(req.body.password, user.password)
  //      !validPassword && res.status(400).json("Invalid Entered Credential")
  
  //     res.status(200).send({ user, msg: "Login successful" });

  //     const userData = await User.findById({ _id:req.session.user_id});
  //     res.render('home',{ user:userData});
  
  //     }catch(err){
  //     console.log(err.response.data)
  //     res.status(500).send({ msg: "Server error", code: 500})
  //     }
  // });


  //   app.post('/signup', async (req, res) => {
  //   try{
  //   const { firstname, lastname, phonenumber, email, password } = req.body;
  //   const userDetails= await User.findOne({ firstname, lastname, phonenumber, email, password });

  //   if (userDetails) return res.status(400).json({ msg: "One or More Details already exists!" });

  //     const Newuser = new User({
  //       firstname, lastname, phonenumber,email, password
  //     })
  //       await Newuser.save()
  //       res.status(200).send({msg:"User created"});                
  //   }
  //   catch (err) {
  //     console.log(err)
  //     return res.status(500).json({msg: err.message})
  //   }
  //   });


  

  // app.post("/login", async (req, res) => {
  //   try{
  //     let user = await User.findOne({ email:req.body.email });
  
  //     if (!user) {
  //         return res.send({ msg: "Invalid User"})
  //     }
  //     const validPassword = await bcrypt.compare(req.body.password, user.password)
  //      !validPassword && res.status(400).json("Invalid Entered Credential")
  
  //     res.status(200).send({ user, msg: "Login successful" });

  //     const userData = await User.findById({ _id:req.session.user_id});
  //     res.render('home',{ user:userData});
  
  //     }catch(err){
  //     console.log(err.response.data)
  //     res.status(500).send({ msg: "Server error", code: 500})
  //     }
  //     });


// app.post('/signup', async (req, res) => {
  //   [
  //     check('firstname', 'Name is required')
  //       .not()
  //       .isEmpty(),
  //     check('email', 'Please include a valid email').isEmail(),
  //     check('passowrd', 'Please exter a password with 6 or more characters').isLength({ min:6})
  //   ],

  //   async(req, res) =>{
  //     const errors = validationResult(req);
  //     if(!errors.isEmpty()){
  //       return res.status(400).json({ errors: errors.array()});
  //     }
  //     const { firstname, lastname, phonenumber, email, password } = req.body;
  //       try{
  //         let user = await User.findOne({email});
  //         if(user){
  //           res.status(400).json({errors: [{msg: "User Already exists" }] });
  //         }

  //         const avatar = gravatar.url(email, {
  //           s:'200',
  //           r: 'pg',
  //           d:'mm'
  //         })

  //   user = new User({
  //     firstname,
  //     lastname,
  //     phonenumber,
  //     email,
  //     password,
  //     avatar
  //   });

  //   const salt = await bcrypt.genSalt(10);

  //   user.password = await bcrypt.hash(password, salt);

  //   await user.save();
  //         res.send('User Registered');

  //       } catch (err) {
  //         console.error(err.message)
  //         res.status(500).json({ error: 'An error occurred' });
  //       }
  //   }
  // });



// app.post("/register", async (req, res) => {
//   try {
//       // const { email, password } = req.body

//           const { firstname, lastname, phonenumber, email, password } = req.body;

//       if(!email || !password)
//       return res.status(400).json({msg: "One or more fields are empty"})

//       const user_email = await User.findOne({ email })
//       if (user_email) return res.status(400).json({ msg: "This email already exists!" })

//       if (password.length < 6)
//           return res.status(400).json({ msg: "Password must be at least 6 characters!" })

//       const passwordHash = await bcrypt.hash(password, 12)

//       const newUser = new User({
//           email, password: passwordHash
//       })

//       const access_token = createAccessToken({ id: newUser._id });
//       const refresh_token = createRefreshToken({ id: newUser._id })

//       res.cookie('refreshtoken', refresh_token, {
//           httpOnly: true,
//           path: '/api/refresh_Token',
//           maxAge: 30 * 7 * 24 * 60 * 60 * 1000
//       })

//       // console.log(newUser)

//       await newUser.save()

//       res.json({
//           msg: 'Registration Success!',
//           access_token,
//           user: {
//               ...newUser._doc,
//               password: ''
//           }
//       })
//   }
//   catch (err) {
//       return res.status(500).json({msg: err.message})
//   }
// });


  // app.post('/signup', async (req, res) => {
  //   try{
  //   const { firstname, lastname, phonenumber, email, password } = req.body;
  //   const userDetails= await User.findOne({ firstname, lastname, phonenumber, email, password });

  //   if (userDetails) return res.status(400).json({ msg: "One or More Details already exists!" });

  //     const Newuser = new User({
  //       firstname, lastname, phonenumber,email, password
  //     })
  //       await Newuser.save()
  //       res.status(200).send({msg:"User created"});                
  //   }
  //   catch (err) {
  //     console.log(err)
  //     return res.status(500).json({msg: err.message})
  //   }
  //   });





        // app.post('/signup', (req, res) => {
        //   const firstname = req.body.firstname;
        //   const lastname = req.body.lastname;
        //   const phonenumber = req.body.phonenumber;
        //   const email = req.body.email;
        //   const password = req.body.password;

        //   try{
        //   const newUser = new User({
        //     firstname, lastname, phonenumber, email, password
        //   })
        //   newUser.save();
        //   res.status(200).send({msg:"User created"});   
        // }
        //   catch (err) {
        //           console.log(err)
        //           return res.status(500).json({msg: err.message})
        //         }
        // })
            
            



// const routes = function (app) {

    // app.post('/signup', async (req, res) => {
    //   const { email, password, phoneNumber, firstName, lastName } = req.body;

    //     bcrypt.genSalt(10,(err,salt) =>{
    //       bcrypt.hash(req.body.password,salt,(err,hashedPassword) =>{
    //         const password = hashedPassword;
    //         const newUser = new User({email, password, phoneNumber, firstName, lastName });
    //         newUser.save()
    //         .then(() => res.json("User Added"))
    //         .catch(err => res.status(400).json("Error : " +err))

    //       })
    //     })      
    // })

    //     app.post("/login", async (req, res) => {
    //       try{
    //         var user = await User.findOne({username : req.body.username});
    //         if(!user){
    //           return res.status(400).send('User not found. Please Register')
    //         }
    //         var validPassword = await bcrypt.compare(req.body.password, user.password);
    //         if(!validPassword){
    //           return res.status(400).send('Password Is Incorrect.')
    //         }
    //         res.send('Login Successful')

    //       }
    //       catch(error){
    //         return res.status(500).json({msg: error.message})
    //       }
    //     })

//}
// module.exports = routes;




// const User = require('../../models/Use')
// const Post = require('../../models/post')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

// const routes = function (app) {
//     app.post("/register", async (req, res) => {
//         try {
//             const { email, password } = req.body

//             if(!email || !password)
//             return res.status(400).json({msg: "One or more fields are empty"})

//             const user_email = await User.findOne({ email })
//             if (user_email) return res.status(400).json({ msg: "This email already exists!" })

//             if (password.length < 6)
//                 return res.status(400).json({ msg: "Password must be at least 6 characters!" })

//             const passwordHash = await bcrypt.hash(password, 12)

//             const newUser = new User({
//                 email, password: passwordHash
//             })

//             const access_token = createAccessToken({ id: newUser._id })
//             const refresh_token = createRefreshToken({ id: newUser._id })

//             res.cookie('refreshtoken', refresh_token, {
//                 httpOnly: true,
//                 path: '/api/refresh_Token',
//                 maxAge: 30 * 7 * 24 * 60 * 60 * 1000
//             })

//             // console.log(newUser)

//             await newUser.save()

//             res.json({
//                 msg: 'Registration Success!',
//                 access_token,
//                 user: {
//                     ...newUser._doc,
//                     password: ''
//                 }
//             })
//         }
//         catch (err) {
//             return res.status(500).json({msg: err.message})
//         }
//     });

//     app.post("/login", async (req, res) => {
//         try {
//             const { email, password } = req.body

//             const user = await User.findOne({ email })
//                 .populate("followers following", "-password")

//             if (!user) return res.status(400).json({ msg: "This email does not exist!" })

//             const isMatch = await bcrypt.compare(password, user.password)
//             if (!isMatch) return res.status(400).json({ msg: "Password is incorrect!" })

//             const access_token = createAccessToken({ id: user._id })
//             const refresh_token = createRefreshToken({ id: user._id })

//             res.cookie('refreshtoken', refresh_token, {
//                 httpOnly: true,
//                 path: '/api/refresh_token',
//                 maxAge: 30 * 7 * 24 * 60 * 60 * 1000
//             })

//             res.json({
//                 msg: 'Login Success!',
//                 access_token,
//                 user: {
//                     ...user._doc,
//                     password: ''
//                 }
//             })
//         }
//         catch (err) {
//             return res.status(500).json({msg: err.message})
//         }
//     });


//     app.post("/logout", (req, res) => {
//         try {
//             res.clearCookie('refreshtoken', { path: '/refresh_token' })
//             return res.json({ msg: "Logged out!" })
//         }
//         catch (err) {
//             return res.status(500).json({msg: err.message})
//         }
//     });

//     const createAccessToken = (payload) => {
//         return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
//     }

//     const createRefreshToken = (payload) => {
//         return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' })
//     }
// }
// module.exports = routes;





// const User = require('../../models/user')
// const Post = require('../../models/post')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

// const routes = function (app) {
//     app.post("/register", async (req, res) => {
//         try {
//             const { email, password } = req.body

//             if(!email || !password)
//             return res.status(400).json({msg: "One or more fields are empty"})

//             const user_email = await User.findOne({ email })
//             if (user_email) return res.status(400).json({ msg: "This email already exists!" })

//             if (password.length < 6)
//                 return res.status(400).json({ msg: "Password must be at least 6 characters!" })

//             const passwordHash = await bcrypt.hash(password, 12)

//             const newUser = new User({
//                 email, password: passwordHash
//             })

//             const access_token = createAccessToken({ id: newUser._id })
//             const refresh_token = createRefreshToken({ id: newUser._id })

//             res.cookie('refreshtoken', refresh_token, {
//                 httpOnly: true,
//                 path: '/api/refresh_Token',
//                 maxAge: 30 * 7 * 24 * 60 * 60 * 1000
//             })

//             // console.log(newUser)

//             await newUser.save()

//             res.json({
//                 msg: 'Registration Success!',
//                 access_token,
//                 user: {
//                     ...newUser._doc,
//                     password: ''
//                 }
//             })
//         }
//         catch (err) {
//             return res.status(500).json({msg: err.message})
//         }
//     });

//     app.post("/login", async (req, res) => {
//         try {
//             const { email, password } = req.body

//             const user = await User.findOne({ email })
//                 .populate("followers following", "-password")

//             if (!user) return res.status(400).json({ msg: "This email does not exist!" })

//             const isMatch = await bcrypt.compare(password, user.password)
//             if (!isMatch) return res.status(400).json({ msg: "Password is incorrect!" })

//             const access_token = createAccessToken({ id: user._id })
//             const refresh_token = createRefreshToken({ id: user._id })

//             res.cookie('refreshtoken', refresh_token, {
//                 httpOnly: true,
//                 path: '/api/refresh_token',
//                 maxAge: 30 * 7 * 24 * 60 * 60 * 1000
//             })

//             res.json({
//                 msg: 'Login Success!',
//                 access_token,
//                 user: {
//                     ...user._doc,
//                     password: ''
//                 }
//             })
//         }
//         catch (err) {
//             return res.status(500).json({msg: err.message})
//         }
//     });

//     app.post("/post", async(req, res) => {
//         try {
//             const { title, message, hashtag } = req.body;

//             if(!title || !message || !hashtag) 
//             return res.status(400).json({msg: "One or more fields are empty"})

//             const newPost = new Post({
//                 title, message, hashtag
//             })

//             await newPost.save()

//             res.json({
//                 msg: "Post saved"
//             })
//         }
//         catch (err) {
//             return res.status(500).json({msg: err.message})
//         }
//     });


//     app.post("/logout", (req, res) => {
//         try {
//             res.clearCookie('refreshtoken', { path: '/refresh_token' })
//             return res.json({ msg: "Logged out!" })
//         }
//         catch (err) {
//             return res.status(500).json({msg: err.message})
//         }
//     });

//     const createAccessToken = (payload) => {
//         return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
//     }

//     const createRefreshToken = (payload) => {
//         return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' })
//     }
// }
// module.exports = routes;