
// const fs = require('fs');
// const mongoose  = require('mongoose');
// const express = require('express');
// const router = express.Router();
// const Flutterwave = require('flutterwave-node-v3');
// const Flutter = require('../../models/flutterpayment');
// const flw = new Flutterwave('/server/process.env.FLW_PUBLIC_KEY', '/server/process.env.FLW_SECRET_KEY');


// const URL = "mongodb://127.0.0.1:27017/showbux";

// mongoose.connect(URL,{ 
//   useNewUrlParser:true,
//   useUnifiedTopology:true 
// })
// mongoose.connection.on('open',()=>console.log("Mongodb Connected"))
// mongoose.connection.on('error',(e)=> console.log(e))


// router.post('/flutterpayment', async (req, res) => {
//   const response = req.body;
//   const UserId = store.get('user');

//       console.log(`Server ${JSON.stringify(response)}`);
  
//       res.send('Received payment response successfully');
  
//       if(response.status == "successful"){

//         const newFlutter = new Flutter({
//           transaction_id: response.transaction_id,
//           tx_ref:response.tx_ref,
//           amount: response.amount,
//           created_at: response.created_at,
//             customer: {
//                     email: response.customer.email,
//                     name: response.customer.name,
//                     phone_number: response.customer.phone_number,
//                   },
//                   created_at: response.created_at,
//                   UserId: UserId,
//                 });
  
//           newFlutter.save((error) => {
//             if (error) {
//               console.error('Error saving payment data:', error);
//             } else {
//               console.log('Payment data saved successfully' + newFlutter);
//             }

//           })

//         }
  
//         else {
//         console.error('Error saving payment response to MongoDB:');
//         }

//     });


//     router.get('/flutterpayment/:userId', async (req, res) => {
//       try {

//         const {UserId} = req.params;
    
//         const paymentData = await Flutter.find({ UserId: UserId });
    
//         res.json(paymentData);
//       } catch (error) {
//         console.error('Error fetching payments:', error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }
//     });


//     router.get('/flutterpayment', (req, res) => {
//       Flutter.find({}, (error, paymentData) => {
//         if (error) {
//           console.error('Error retrieving paymentData:', error);
//           res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//           res.json(paymentData);
//         }
//       });
//     });

//  module.exports = router;

