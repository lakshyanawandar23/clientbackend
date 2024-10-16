const mongoose=require('mongoose');


const LoginSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"cannot be empty"]
    },
    password:{
        type:String,
        required:[true,"cannot be empty"]
    }
})

const Login=mongoose.model("Logins",LoginSchema);
module.exports=Login;