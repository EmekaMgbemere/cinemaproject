const movies = require('../../models/movies')
const app = require('../../routes/routeindex');
const PORT = 5000;


const routes = function (app) {

    app.post('/uploadmovies', async (req, res) => {
        try{
            // const { movieselection, price, quantity, subtotal } = req.body;

            // const Newmovie = new movies({ movieselection, time, price, quantity, subtotal })
            // await Newmovie.save()
            //     res.status(200).send({msg:"Movie created"});      
                  
           const newmovie = new movies({ 
                movieselection:req.body.movieselection, 
                price:req.body.price, 
                quantity:req.body.quantity, 
                subtotal:req.body.subtotal,
            })    
            await newmovie.save()
            res.status(201).json({ message: 'Post Added Successfully'})
        }
        catch (err) {
          console.log(err)
          return res.status(500).json({msg: err.message})
        }
        });

        // app.post('/signup', (req, res) => {
        //   const firstname = req.body.firstname;
        //   const lastname = req.body.lastname;
        //   const phonenumber = req.body.phonenumber;
        //   const email = req.body.email;
        //   const password = req.body.password;

        //   const newUser = new Users({
        //     firstname, lastname, phonenumber, email, password
        //   })
        //   newUser.save();

        // })
    
	app.get("/movies/:id",async(req,res)=>{
        try{
            let id = req.params.id;
            let newmovies = await movies.findById(id)

            if(!newmovies) return res.json({msg:"E no deh",code:404})

            res.json(movies)
        }catch(err){
            console.log(err)
            res.send("ID Server error")
        }
})


app.get("/getmovies",async(req,res)=>{
        try{
            let getmovies = await movies.find({deleted:false})
            res.json(getmovies)
        }catch(err){
            console.log(err)
            res.send("Data Query Server error")
        }
})


app.post("/createmovies",async(req,res)=>{
    try{
            let createmovies = new movies(req.body)
            await createmovies.save()
            res.send({msg:"movie created",code:200})
    }catch(err){
        console.log(err)
        res.send(err = 'Net Server error')
    }
})

app.put("/movies/:id",async(req,res)=>{
        const id = req.body.id;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const description = req.body.description;
        const trailerlink = req.body.trailerlink;
        const pg = req.body.pg;
        const duration = req.body.duration;
        const thumbnail = req.body.thumbnail;
        const banner = req.body.banner;
        const companyID = req.body.companyID;
        const goldseat4d = req.body.goldseat4d;
        const goldseat = req.body.goldseat;
        const regular = req.body.regular;
        const subtotal = req.body.subtotal;

        movies.findByIdAndUpdate(id, {$set:{firstname:firstname,lastname:lastname,description:description,trailerlink:trailerlink,pg:pg,duration:duration,thumbnail:thumbnail,banner:banner,companyID:companyID,goldseat4d:goldseat4d,goldseat:goldseat,regular:regular,subtotal:subtotal }},{new:true},(err,doc)=>{
        if(err) {
            res.status(422).json({status : false, error : "Item not updated"}); 
        }else {
            res.status(200).json({ doc }); 
        }
     });
    })


app.delete('/deletemovies/:id' ,async(req,res)=>{
    try{
        let {id} = req.params
        let delmovies = await movies.findById(id)

        if(!delmovies) return res.json({error:true, msg:"Post does not exist"})

        await movies.findOneAndDelete(id)

        res.status(200).json({
          msg:"Delete Successful"
        })
       
    }catch(err){
        console.log(err)
        res.status(404).send({ err: "DELETE Server error"});
    }
})

// app.get("/uploadmovies", (req, res) => {
//     const newmovies = new movies({
//         goldseat4d:req.body.goldseat4d,
//         goldseat:req.body.goldseat,
//         regular:req.body.regular,
// });

// newmovies.save((error) => {
//         if(error){
//             res.status(500).json({msg:'Sorry The internal Error 500'})
//             return;
//         }
//         return res.json({msg:'Data Saved'})
//         });
// });


// app.delete("/movies/:id/actual",async(req,res)=>{
//     try{
//         let {_id} = req.params
//         let movie = await movie.findById(_id)

//         if(!movie) return res.json({msg:"E no deh",code:404})
        
//         movie.remove();

//         res.send({msg:"movie deleted",code:200})
//     }catch(err){
//         console.log(err)
//         res.send(" DELETE ACTUAL Server error")
//     }
// })
}

module.exports = routes
