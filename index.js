const express=require("express")
const app=new express();
const cors=require("cors")
const Workermodel=require('./WorkerReg')

const multer = require('multer');
const Clientmodel = require("./ClientReg");
const data2model=require("./adminlog");

const storage = multer.memoryStorage(); // Store images in memory
const upload = multer({ storage: storage })
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());




app.get('/', (request,response) => {
    response.send("hai")
})
app.get('/view', async (request, response) => {
    var data = await Workermodel.find();
    // console.log(data)
    response.send(data)
})

    app.get('/cview', async (request, response) => {
        var data = await Clientmodel.find();
        // console.log(data)
        response.send(data)
    })



app.put('/edit/:id',async (request, response) => {
    let id = request.params.id;
    await Workermodel.findByIdAndUpdate(id,request.body)
    response.send("Data updated")

})

app.delete('/removeworker/:id',async(request,response)=>{
    let id = request.params.id
    await Workermodel.findByIdAndDelete(id)
    response.send("Record deleted")
    })
    



app.post('/new',upload.single('image1'),async (request,response) => {
    try {
        const { name, phone, job, experience, location } = request.body
        const newdata = new Workermodel({
            name, phone, job, experience, location,
            image1: {
                data:request.file.buffer,
                contentType: request.file.mimetype,}
        })
        // console.log(newdata);
        await newdata.save();
        response.status(200).json({ message: 'Record saved' });

    }
    catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });

    }

    

})

app.post('/cnew',upload.single('image1'),async (request,response) => {
    try {
        const { name, phone, location } = request.body
        const newdata = new Clientmodel({
            name, phone, location,
            image1: {
                data:request.file.buffer,
                contentType: request.file.mimetype,}
        })
        console.log(newdata);
        await newdata.save();
        response.status(200).json({ message: 'Record saved' });

    }
    catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });

    }

    

})

app.post('/Loginsearch',async(request,response)=>{
    const {username,password}=request.body;
    try{ const user=await data2model.findOne({username,password});
    if(user)
    {response.json({success: true,message:'Login Successfully'});}
    else
    {response.json({success: false,message:'Invalid Username and email'});}
    }
    catch(error)
    {
    response.status(500).json({sucess: false,message:'Error'})
    }
    })
    // app.listen(3005,(request,response)=>{
    // console.log("Port ok")
    // })
    





app.listen(3005, (request, response) => {
    console.log("port is running 3005")
})