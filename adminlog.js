const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://jerin:jerin@cluster0.vlqctt0.mongodb.net/worker-client?retryWrites=true&w=majority")
.then(()=>{console.log("DB Connected")})
.catch(err=>console.log(err));
const logschema=new mongoose.Schema({
username:String,
password:String,
}
);
var data2model=mongoose.model("Adminlog",logschema)
module.exports=data2model