const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://jerin:jerin@cluster0.vlqctt0.mongodb.net/worker-client?retryWrites=true&w=majority")
.then(()=>{console.log("client vannu")})
.catch(err=>console.log(err));
const Clientschema=new mongoose.Schema(
    {
    name:String,
    phone:Number,
    
    location:String,
    image1:{
        data : Buffer,
        contentType:String,
    
    }
    

});
var Clientmodel=mongoose.model("ClientReg",Clientschema)
module.exports=Clientmodel;
