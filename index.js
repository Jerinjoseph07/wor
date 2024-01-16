const express=require("express")
const app=new express();
const cors=require("cors")
const Workermodel=require('./WorkerReg')

const multer = require('multer');
// const Clientmodel = require("./ClientReg");
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
    console.log(data)
    response.send(data)
})

    // app.get('/cview', async (request, response) => {
    //     var data = await Clientmodel.find();
    //     console.log(data)
    //     response.send(data)
    // })

// app.put('/edit/:id',async(request,response)=>{
//     let id=request.params.id
//     await studentmodel.findByIdAndUpdate(id.request.body)
//     response.send("Data updated")
// })

app.put('/edit/:id',async (request, response) => {
    let id = request.params.id;
    await Workertmodel.findByIdAndUpdate(id,request.body)
    response.send("Data updated")
})

// app.post('/new',(request,response)=>{
//     console.log(request.body)
//     new studentmodel(request.body).save();
//     response.send("records saved")

// })

app.post('/new',upload.single('image1'),async (request,response) => {
    try {
        const { name, phone, job, experience, location } = request.body
        const newdata = new Workermodel({
            name, phone, job, experience, location,
            image1: {
                data:request.file.buffer,
                contentType: request.file.mimetype,}
        })
        console.log(newdata);
        await newdata.save();
        response.status(300).json({ message: 'Record saved' });

    }
    catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });

    }

    

})

// app.post('/cnew',upload.single('image1'),async (request,response) => {
//     try {
//         const { name, phone, location } = request.body
//         const newdata = new Clientmodel({
//             name, phone, location,
//             image1: {
//                 data:request.file.buffer,
//                 contentType: request.file.mimetype,}
//         })
//         console.log(newdata);
//         await newdata.save();
//         response.status(300).json({ message: 'Record saved' });

//     }
//     catch (error) {
//         response.status(500).json({ error: 'Internal Server Error' });

//     }

    

// })





app.listen(3005, (request, response) => {
    console.log("port is running 3005")
})