// const Users = require('../../models/Use');
// const app = require('../routeindex');
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

// const routes = function (app) {

//   //update user details
//   app.put("/:id", async (req, res) => {
//     if (req.body.userId === req.params.id) {
//       if (req.body.password) {
//         try {
//           const salt = await bcrypt.genSalt(10);
//           req.body.password = await bcrypt.hash(req.body.password, salt);
//         } catch (err) {
//           return res.status(500).json(err);
//         }
//       }
//       try {
//         const user = await Users.findByIdAndUpdate(req.params.id, {
//           $set: req.body,
//         });
//         res.status(200).json("Account has been updated");
//       } catch (err) {
//         return res.status(500).json(err);
//       }
//     } else {
//       return res.status(403).json("You can update only your account!");
//     }
//   });
  

//   //delete user
//   app.delete("/:id", async (req, res) => {
//     if (req.body.userId === req.params.id || req.body.isAdmin) {
//       try {
//         await Users.findByIdAndDelete(req.params.id);
//         res.status(200).json("Account has been deleted");
//       } catch (err) {
//         return res.status(500).json(err);
//       }
//     } else {
//       return res.status(403).json("You can delete only your account!");
//     }
//   });
  


//   //get a user
//   app.get("/:id", async (req, res) => {
//     try {
//       const user = await Users.findById(req.params.id);
//       const { password, updatedAt, ...other } = user._doc;
//       res.status(200).json(other);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// }
// module.exports = routes;



//     // app.get("/users", (req, res) => {
//     //         Users.find()
//     //         .then(user => res.json(user))
//     // });

//     // app.post("/user", async (req, res) => {
//     //     try {
//             // const { firstname, lastname, email, phonenumber, password } = req.body;
//     //             const users = new Users({
//     //                 email, password,username
//     //             });
    
//     //             users.save()
           
//     //         res.send(`Welcome ${username}`)
//     //         }
        
//     //     catch (err) {
//     //         return res.status(500).json({msg: err.message})
//     //     }
//     // })

//     // app.delete('/deleteuser/:id' ,async(req,res)=>{
//     //     try{
//     //         let {id} = req.params
//     //         let users = await Users.findById(id)
    
//     //         if(!users) return res.json({error:true, msg:"Post does not exist"})
    
//     //         await Users.findOneAndDelete(id)
    
//     //         res.status(200).json({
//     //           msg:"Delete Successful"
//     //         })
           
//     //     }catch(err){
//     //         console.log(err)
//     //         res.status(404).send({ err: "Users delete Server error"});
//     //     }
//     // })

//         // const { firstname, lastname, email, phonenumber, password } = req.body;

//     // let result = Users.filter((user) => user.email === email || user.phonenumber === phonenumber);

//     // if (result.length === 0) {
//     //     const newUser = { id: generateID(), firstname, lastname, email, phonenumber, password};
//     //     Users.push(newUser);
//     //     return res.json({
//     //         message: "Account created successfully!",
//     //     });
//     // }
//     // res.json({
//     //     error_message: "Users already exists",
//     // });
