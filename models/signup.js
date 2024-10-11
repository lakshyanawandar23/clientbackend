const mongoose=require('mongoose');

const SignupSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"cannot be empty"]
    },
    phone:{
        type:String,
        required:[true,"cannot be empty"]
    },
    email:{
        type:String,
        index:true,
        unique:true,
        required:[true,"cannot be empty"]
    },
    address:{
        type:String,
        required:[true,"cannot be empty"]
    },
    adhaar:{
        type:String,
        required:[true,"cannot be empty"]
    },
    role:{
        type:String,
        default:"User",
        required:[true,"cannot be empty"]
    }
})

const Signup=mongoose.model('Login',SignupSchema);

module.exports=Signup;