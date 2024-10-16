const mongoose=require('mongoose');
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../config/server.config')
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
    role:{
        type:String,
        enum: ['User', 'Admin'],
        default:"User",
    },
    password:{
        type:String,
        required:[true,"cannot be empty"]
    }
})
SignupSchema.pre('save', function (next) {
    if (this.email === 'manishnehra352@gmail.com') {  // Replace with your admin email or condition
        this.role = 'Admin';
    }
    next();
});
SignupSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
      { userId: this._id,  email: this.email },
      JWT_SECRET,
      { expiresIn: '60d' }
    );
    return token;
  };

const Signup=mongoose.model('Login',SignupSchema);

module.exports=Signup;