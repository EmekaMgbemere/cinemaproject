const post = require('../../models/post')
const app = require('../../routes/routeindex');
const PORT = 6969;


const routes = function (app) {

    // app.get("/posts", (req, res) => {
    //     post.find()
    //     .then(theseposts => res.json(theseposts))
    // });


    app.post("/post", (req, res) => {
        // console.log('Body: ', req.body);
            const posts = new post({
            content:req.body.content,
            topic:req.body.topic,
            message:req.body.message
        });
            posts.save((error) => {
                if(error){
                    res.status(500).json({msg:'Sorry The internal Error Exists'})
                    return;
                }
                return res.json({msg:'Data Saved'})
                });
    });


    
	app.get("/posts/:id",async(req,res)=>{
        try{
            let id = req.params.id;
            let posts = await post.findById(id)

            if(!posts) return res.json({msg:"E no deh",code:404})

            res.json(post)
        }catch(err){
            console.log(err)
            res.send("ID Server error")
        }
})


app.get("/getposts",async(req,res)=>{
        try{
            let posts = await post.find({deleted:false})
            res.json(posts)
        }catch(err){
            console.log(err)
            res.send("First Server error")
        }
})

app.post("/createposts",async(req,res)=>{
    try{
            let posts = new post(req.body)
            await post.save()
            res.send({msg:"post created",code:200})
    }catch(err){
        console.log(err)
        res.send(err = 'Net Server error')
    }
})


// app.post("/updateposts/:id",async(req,res)=>{
//     try{
//         let {id} = req.params
//         let posts = await post.findById(id)
//         let {body} = req;

//         if(!posts) return res.json({msg:"E no deh",code:404})
//         // post.comment = body.comment
//         // post.text = body.text

//         // storing the data in the database in the data variable
//         let data  = posts._doc;


//         post.overwrite({...data,...body})
//         await post.save()
//         res.send({msg:"post updated",code:200})
//     }catch(err){
//         console.log(err)
//         res.send("New ID Server error")
//     }
// })

app.put("/post/:id",async(req,res)=>{
        const id = req.body.id;
        const content = req.body.content;
        const topic = req.body.topic;
        const message = req.body.message;

        post.findByIdAndUpdate(id, {$set:{content:content,topic:topic,message:message}},{new:true},(err,doc)=>{
        if(err) {
            res.status(422).json({status : false, error : "Item not updated"}); 
        }else {
            res.status(200).json({ doc }); 
        }
     });
    })


app.delete('/deleteposts/:id' ,async(req,res)=>{
    try{
        let {id} = req.params
        let posts = await post.findById(id)

        if(!posts) return res.json({error:true, msg:"Post does not exist"})

        await post.findOneAndDelete(id)

        res.status(200).json({
          msg:"Delete Successful"
        })
       
    }catch(err){
        console.log(err)
        res.status(404).send({ err: "DELETE Server error"});
    }
})


// app.delete('/deleteposts/:id' ,async(req,res)=>{
//     try{
//             const deletedPost = await post.deleteOne({_id:req.params.id});
//             return res.status(200).json(deletedPost);
//         } catch (error) {
//             res.status(400).json({message: error.message});
//         }
// })


app.delete("/posts/:id/actual",async(req,res)=>{
    try{
        let {_id} = req.params
        let post = await post.findById(_id)

        if(!post) return res.json({msg:"E no deh",code:404})
        
        post.remove();

        res.send({msg:"post deleted",code:200})
    }catch(err){
        console.log(err)
        res.send(" DELETE ACTUAL Server error")
    }
})
}

module.exports = routes


    // app.post("/post", async (req, res) => {
    //     try {
    //         console.log(req.body)
    //         const { title, message, hashtag } = req.body;

    //         if(!title || !message || !hashtag) 
    //         return res.status(400).json({msg: "One or more fields are empty"})

    //         // const newPost = new post({
    //         //     title, message, hashtag
    //         // })

    //         // await newPost.save()

    //         const pst = new post({
    //                     // id:req.body.id,
    //                     title: req.body.title,
    //                     message: req.body.message,
    //                     hashtag: req.body.hashtag
    //                 });
            
    //                 await pst.save();

    //         res.json({
    //             msg: "post saved"
    //         })
    //     }
    //     catch (err) {
    //         return res.status(500).json({"msg":"couldn't get here"})
    //     }

    // })

    // app.post("/post", async (req, res) => {
    //     console.log("inside post function")
    //     const pst = new post({
    //         // id:req.body.id,
    //         title: req.body.title,
    //         message: req.body.message,
    //         hashtag: req.body.hashtag
    //     });

    //     await pst.save();
    //     res.send("posted")
    // });


    // app.get('/post/:id', function(req,res){
    //     fetchid=req.params.id;
    //     database.find(({id:fetchid}), function(err,val){
    //         if(err){
    //             res.send("Internal Error")
    //         }
    //         if(val.length===0){
    //             res.send("Data does not exist")
    //         }
    //         else{
    //             res.send(val)
    //         }
    //     })
    // });


    // app.put('/post/:id', async(req,res)=>{
    //     // let upid=req.params.id;
    //     let uptitle=req.body.title; 
    //     let uptext=req.body.text; 
    //     let uphashtag=req.body.hashtag; 

    //     //find the id data and update the data

    //     database.findOneAndUpdate({id:upid},{$set:{title:uptitle,text:uptext,hashtag:uphashtag}},{new:true},(err,data)=>{
    //         if(err){
    //             if(data==null){
    //                 res.send("data not avalable on this platform")
    //             }else{
    //                 res.send(data)
    //                 console.log("data update successful")
    //             }
    //         }
    //     })
    // });

